import { connectDB } from "../config/db";
import { UniversalOrder, UniversalOrderDocument } from "../models/universalOrder.model";
import { User } from "../models/user.model";
import { transactionService } from "../services/transaction.service";

import OpenAI from "openai";
import { ENV } from "../config/env";
import mongoose from "mongoose";
import { mailService } from "../services/mail.service";
import {
    getServiceByCategory,
    type ServiceDefinition,
    type ServicePlan,
} from "@/resources/services";

const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });

/* =============================================================================
 * Business-plan generation prompt kit (senior-analyst voice).
 * Storage/render contract is unchanged:
 *   - main plan → response: string  (Markdown)
 *   - each extra → extrasData[name]: string  (Markdown)
 * Markdown vocabulary is LOCKED to what PdfCreator.parseBlocks supports:
 *   headings: #, ##, ###
 *   bullets:  -
 *   ordered:  1.
 *   inline:   **bold**
 * (no tables, no code fences, no ---, no images, no links)
 * ==========================================================================*/

const BP_MARKDOWN_RULES = `
OUTPUT FORMAT (STRICT):
- Reply with Markdown only. No preamble, no closing remarks, no meta-comments.
- Allowed Markdown: "# H1", "## H2", "### H3", "- bullet", "1. numbered", "**bold**".
- Do NOT use: tables, code fences, horizontal rules (---), block quotes, images, links, HTML, emoji, or any other syntax.
- Every section starts with a "## <Section Name>" heading. Use "###" for sub-sections. Do not use "#".
- Prose paragraphs are short (2–5 sentences). Use bullet lists where enumerating.
- Never emit placeholders like "TBD", "N/A", "[insert]"; either produce a concrete answer grounded in the inputs, or omit that line.
`.trim();

function buildBpAnalystSystemPrompt(languageNote: string): string {
    return [
        "You are a senior business analyst and strategy advisor with 15+ years of experience preparing investor-ready business plans for founders, VCs, and small-business owners.",
        "You write in an analytical, precise, and confident voice — the way a partner at a boutique consulting firm would write for a paying client.",
        "You reason from the inputs provided rather than inventing facts: numbers, ranges, and comparisons must be plausibly grounded in the client's stated business, industry, budget, team, and market. When you make an assumption to fill a gap, name it as an assumption in-line.",
        "Every generated section must directly reference the client's specifics (business name, niche, product, target customer, budget, team, goal) — never generic placeholder content.",
        "Depth over length: prefer specific, decision-useful analysis over verbose filler. Quantify wherever you can. If a number is uncertain, give a defensible range with the reasoning behind it.",
        "",
        languageNote,
        "",
        BP_MARKDOWN_RULES,
    ].join("\n");
}

function summariseFieldsForPrompt(fields: Record<string, unknown>): string {
    const pick = (k: string) => {
        const v = (fields as Record<string, unknown>)[k];
        return v == null || v === "" ? "(not provided)" : String(v);
    };
    return [
        `- businessName: ${pick("businessName")}`,
        `- niche: ${pick("niche")}`,
        `- businessType: ${pick("businessType")}`,
        `- teamSize: ${pick("teamSize")}`,
        `- budget: ${pick("budget")}`,
        `- marketDescription: ${pick("marketDescription")}`,
        `- productDescription: ${pick("productDescription")}`,
        `- uniqueValue: ${pick("uniqueValue")}`,
        `- customerPain: ${pick("customerPain")}`,
        `- goal: ${pick("goal")}`,
        `- language: ${pick("language")}`,
        `- specialization (expert path only): ${pick("specialization")}`,
    ].join("\n");
}

function buildBpMainUserPrompt(fields: Record<string, unknown>): string {
    return `
You are producing a full **AI-generated business plan** for the following client. Use every input below. If any field is "(not provided)", say so explicitly in the relevant section and continue with a well-reasoned assumption.

## CLIENT INPUTS
${summariseFieldsForPrompt(fields)}

## PER-FIELD USAGE (how each input MUST inform the plan)
- **businessName**: use it verbatim in the Executive Summary, headings where natural, and closing "asks".
- **niche** & **businessType**: shape the Market Overview, Competition, and Business Model sections; anchor comparables and unit economics against typical numbers for this niche.
- **productDescription** & **uniqueValue**: drive the Product and Differentiation sections; the differentiation must be crisp and defensible.
- **customerPain**: open the Problem section with this; every downstream section must trace back to it.
- **marketDescription**: seed the Market Overview (TAM / SAM / SOM sizing) and the Ideal Customer Profile.
- **teamSize**: shape Team & Operations, hiring priorities in the Roadmap.
- **budget**: constrain the Go-To-Market plan and the 24-month Financial Overview; compare CAC and burn against it.
- **goal**: framed as the plan's central thesis in the Executive Summary and the final "Asks / Next Steps".
- **language**: entire plan in this language.

## REQUIRED SECTIONS (produce all, in this exact order, using "## <Name>" headings)
1. Executive Summary
2. Problem
3. Solution
4. Product / Service
5. Market Overview (include TAM / SAM / SOM as short sub-sections under "###", with defensible sizing anchored on marketDescription and budget)
6. Ideal Customer Profile (ICP)
7. Competitive Landscape & Differentiation
8. Business Model & Unit Economics (name at least: revenue streams, pricing tier hypothesis, gross-margin estimate, CAC vs LTV directional take)
9. Go-To-Market Plan (first 90 days, then 12 months; tie channels to the budget)
10. Team & Operations
11. 24-Month Roadmap & Milestones (as bullet list, one bullet per quarter)
12. Risks & Mitigations (rank top 5 risks; each risk paired with a mitigation)
13. Financial Overview (Year-1 and Year-3 revenue estimate, cost buckets, path to breakeven; use ranges with stated assumptions rather than fake precision)
14. Asks & Next Steps (concrete, prioritised)

## QUALITY BAR
- No section may be one sentence; each section must be genuinely useful to a founder pitching this business.
- Do not repeat the same idea in multiple sections.
- Do not invent unrelated competitors — name plausible ones or describe archetypes ("mid-market SaaS incumbents like X-class tools").
- Do not use tables. Use headings and bullets only.
- Do not close with meta-commentary like "I hope this helps".

Begin the plan now.
`.trim();
}

const BP_EXTRA_SPEC: Record<string, { title: string; brief: string }> = {
    marketingStrategy: {
        title: "Marketing Strategy",
        brief:
            "Produce a full Marketing Strategy: ICP restated, positioning statement, 3 channel bets ranked by fit-to-budget, messaging framework (problem → promise → proof), content plan for first 90 days, and 4–6 KPIs with target ranges.",
    },
    financialProjection: {
        title: "3-Year Financial Projection",
        brief:
            "Produce a 3-year financial projection narrative: revenue drivers, pricing/volume assumptions, gross-margin range, OpEx buckets (people, marketing, ops, tools), EBITDA path, breakeven month range. Use only headings and bullets — no tables. State every assumption inline.",
    },
    riskAnalysis: {
        title: "Risk & Mitigation Plan",
        brief:
            "Enumerate the top 8 risks across Market, Product, Team, Finance, Legal/Regulatory. For each: 'Impact' (high/med/low), 'Likelihood' (high/med/low), and a concrete mitigation. Rank by combined severity.",
    },
    growthRoadmap: {
        title: "Growth Roadmap (12–24 months)",
        brief:
            "Quarter-by-quarter roadmap for 24 months. Each quarter: one headline goal, 3 concrete milestones, the metric that proves it, the owner archetype (Founder / Head of X / hire).",
    },
    competitorReview: {
        title: "Competitor Analysis",
        brief:
            "Identify 3–5 plausible competitors (or archetypes if names are not defensible). For each: positioning, pricing model, strengths, weaknesses, and our defensible edge. Then a short 'where we win' summary.",
    },
    pitchDeck: {
        title: "Investor Pitch Deck Outline",
        brief:
            "12–15 slide outline. For each slide give a heading, one-sentence purpose, and 3–5 bullet points a founder would say on stage. Slides should tell the fundraising story end-to-end.",
    },
    brandingGuide: {
        title: "Branding & Visual Identity Brief",
        brief:
            "Deliver a lightweight brand brief: brand promise, voice & tone (3 adjectives + do/don't), 3 value pillars, colour direction (moods, not hex codes), typography direction (mood + pairing type), logo usage principles, and 3 example taglines.",
    },
    teamStructure: {
        title: "Organizational Structure",
        brief:
            "Propose current-day org chart, RACI hints for the top 5 processes, and the next 3 priority hires with rationale, seniority range, and expected cost band.",
    },
    customerJourney: {
        title: "Customer Journey Map",
        brief:
            "Map Awareness → Consideration → Purchase → Onboarding → Retention → Advocacy. For each stage: user goal, our touchpoint, the friction to remove, the metric to watch.",
    },
    salesForecast: {
        title: "Sales Forecast",
        brief:
            "Build a quarterly sales forecast narrative for the next 8 quarters: lead volume assumptions, conversion rate ranges, ACV/ARPU hypothesis, resulting bookings/revenue range. State every assumption and how the budget constrains it.",
    },
    fundingPlan: {
        title: "Funding Strategy",
        brief:
            "Recommend the right first funding round (bootstrap / grant / angel / pre-seed / seed) with rationale. State target amount as a range, use-of-proceeds by bucket, the 12-month milestones this round should unlock, and the investor profile to target.",
    },
    // Generic/back-compat keys — kept so the older extras still generate.
    progressTracking: {
        title: "Weekly Progress Tracking",
        brief:
            "Design a weekly progress tracking system: which 5–7 metrics to watch, how to instrument them, a lightweight weekly-review agenda, and warning-sign thresholds.",
    },
    motivationTips: {
        title: "Founder Motivation Notes",
        brief:
            "Write 10 short, specific motivational notes tuned to a founder working on this business — grounded in customerPain, niche, and goal. No generic platitudes.",
    },
    summaryReport: {
        title: "Executive Summary Report",
        brief:
            "Write a one-page executive summary that would let a busy investor decide in 60 seconds whether to take a meeting.",
    },
};

/**
 * GPT-5 family + o-series reasoning models expose a different Chat Completions
 * parameter surface than GPT-4 / GPT-4o:
 *   - use `max_completion_tokens`, NOT `max_tokens`
 *   - use top-level `reasoning_effort: "medium"`, NOT `reasoning: { effort }`
 *   - `temperature` MUST be omitted (or left at the default 1) — a custom value
 *     is rejected with a 400.
 * GPT-4-family uses the classic surface (`max_tokens`, custom `temperature`,
 * no reasoning knob).
 * This helper produces the right request body for either family.
 */
function isReasoningFamily(model: string): boolean {
    return /^(gpt-5|o[0-9])/i.test(model);
}

function buildChatRequest(opts: {
    model: string;
    maxTokens: number;
    temperature: number;
    messages: { role: "system" | "user" | "assistant"; content: string }[];
}): Record<string, unknown> {
    const reasoning = isReasoningFamily(opts.model);
    const base: Record<string, unknown> = {
        model: opts.model,
        messages: opts.messages,
    };
    if (reasoning) {
        base.max_completion_tokens = opts.maxTokens;
        // "low" keeps quality high for a structured business plan while cutting
        // wall-clock significantly. "medium"/"high" push latency past 90s+ per
        // call which is unacceptable for a user-facing waited generation.
        base.reasoning_effort = "low";
        // temperature deliberately omitted — GPT-5 rejects non-default values.
    } else {
        base.max_tokens = opts.maxTokens;
        base.temperature = opts.temperature;
    }
    return base;
}

function buildBpExtraUserPrompt(extraKey: string, fields: Record<string, unknown>): string {
    const spec = BP_EXTRA_SPEC[extraKey] || {
        title: extraKey,
        brief: `Produce a well-structured section titled "${extraKey}" that a senior analyst would ship to a paying client.`,
    };
    return `
You are producing the **${spec.title}** section of the same business plan for the SAME client. Keep names, numbers, positioning, and assumptions consistent with the main plan above (which you can see in the prior message).

## CLIENT INPUTS (restated for grounding)
${summariseFieldsForPrompt(fields)}

## SECTION BRIEF
${spec.brief}

## RULES
- Begin with "## ${spec.title}".
- No preamble like "Here is..." — go straight into the section.
- Cite specific values from the client inputs at least three times.
- Do not restate the whole plan; extend it with new, actionable depth.
- Follow the strict Markdown format rules from the system prompt (# / ## / ### / - / 1. / **bold** only).
`.trim();
}


/* =============================================================================
 * Catalog service generation (academic / professional fixed-price services).
 * Reuses the LOCKED Markdown vocabulary so PdfCreator.parseBlocks can render it.
 * ==========================================================================*/

function buildCatalogSystemPrompt(service: ServiceDefinition, languageNote: string): string {
    return [
        service.promptRole,
        "You produce professional, original, well-structured deliverables for a paying client. Ground every section in the client's provided inputs; never output filler, placeholders, or meta-commentary.",
        "",
        languageNote,
        "",
        BP_MARKDOWN_RULES,
    ].join("\n");
}

function buildCatalogUserPrompt(service: ServiceDefinition, fields: Record<string, unknown>): string {
    const inputs = Object.entries(fields || {})
        .map(([k, v]) => `- ${k}: ${v == null || v === "" ? "(not provided)" : String(v)}`)
        .join("\n");
    const sections = service.deliverables.map((d, i) => `${i + 1}. ${d}`).join("\n");
    return `
You are producing a **${service.title}** for the client below. Use every input. If a field is "(not provided)", make a reasonable, clearly-stated assumption and continue.

## CLIENT INPUTS
${inputs}

## REQUIRED SECTIONS (produce all, in this order, using "## <Name>" headings)
${sections}

## QUALITY BAR
- Every section must reference the client's specific inputs — no generic filler.
- No section may be a single sentence; deliver real, useful depth.
- Do not use tables, links, images, or code fences. Headings and bullets only.

Begin now.
`.trim();
}

function buildPrompt(body: any): string {
    const { category, fields, planType } = body;
    const jsonData = JSON.stringify(fields, null, 2);
    const languageNote = body.language
        ? `Write the entire output in ${body.language}.`
        : "Write in English.";

    switch (category) {
        case "training":
            return planType === "reviewed"
                ? `
You are a certified human performance coach.
Design a **comprehensive and highly detailed ${fields.days || 7}-day training plan**.

## Client Data
${jsonData}

## Instructions:
- Write in clear, structured language, sectioned by day.
- Include warm-ups, exercises, rest, motivation, and explanations.
- Tone: professional and encouraging.
- ${languageNote}
`
                : `
You are a virtual fitness assistant.
Generate a **concise ${fields.days || 7}-day workout plan**.

Client info:
${jsonData}

Focus on: Day, Focus, Exercises, Tip.
Tone: energetic and friendly.
${languageNote}
`;

        case "business":
            return planType === "reviewed"
                ? `
You are a senior business strategist and VC advisor.
Create a **comprehensive, investor-ready business plan** based on the data below.

## Company Data
${jsonData}

## Deliverables
- Executive Summary
- Problem & Solution
- Product/Service
- Market Overview (TAM/SAM/SOM), ICP
- Competitive Landscape & Differentiation
- Go-To-Market & Sales
- Business Model & Unit Economics
- Operations & Team
- 12–36 month Roadmap & Milestones
- Risks & Mitigations
- Financial Overview (high level P&L + key metrics)
- Clear next steps / asks

Style: crisp, structured, with headings, tables where helpful.
${languageNote}
`
                : `
You are a business planning assistant.
Generate a **concise business plan outline** using the inputs below.

Inputs:
${jsonData}

Include: Summary, Problem/Solution, Market, Product, GTM, Business Model, Team, Milestones.
Keep it skimmable with bullet points.
${languageNote}
`;

        case "nutrition":
            return planType === "reviewed"
                ? `
You are a certified nutritionist.
Create a **detailed daily meal plan** with calories, macros, and hydration.

User info:
${jsonData}

Include explanations and adaptation tips.
${languageNote}
`
                : `
You are an AI diet assistant.
Generate a short nutrition overview for:
${jsonData}
Include daily focus, example meals, and hydration note.
${languageNote}
`;

        default:
            return planType === "reviewed"
                ? `
You are a senior content creator.
Produce a **comprehensive, structured response** with expert depth.

Context:
${jsonData}
${languageNote}
`
                : `
You are an AI assistant.
Generate a **concise version** of the requested content:
${jsonData}
${languageNote}
`;
    }
}

/** 🧩 Extra section prompt builder */
function buildExtraPrompt(extra: string, category: string, fields: any, language?: string): string {
    const context = JSON.stringify(fields, null, 2);
    const langNote = language ? `Write in ${language}.` : "";

    // training defaults preserved; add business extras
    switch (extra) {
        // generic keys kept for backward-compatibility
        case "progressTracking":
            return `Create a weekly progress tracking table for ${category}.\n${langNote}\n${context}`;
        case "motivationTips":
            return `Write 10 motivational phrases related to this ${category} context.\n${langNote}\n${context}`;
        case "summaryReport":
            return `Write a short summary report showing how the plan achieves goals.\n${langNote}\n${context}`;

        // business-specific extras
        case "marketingStrategy":
            return `Create a structured Marketing Strategy (ICP, positioning, channels, messaging, KPIs) for this business.\n${langNote}\n${context}`;
        case "financialProjection":
            return `Produce a 3-year financial projection (revenue, COGS, gross margin, OpEx buckets, EBITDA) with key assumptions and unit economics. Use markdown tables.\n${langNote}\n${context}`;
        case "riskAnalysis":
            return `List top risks across Market, Product, Team, Finance, Legal and propose mitigations. Prioritize by impact x probability. Use a table.\n${langNote}\n${context}`;
        case "growthRoadmap":
            return `Draft a 12–24 month growth roadmap with milestones by quarter, owners, and success metrics.\n${langNote}\n${context}`;
        case "competitorReview":
            return `Create a competitor analysis matrix (competitors, features/pricing, strengths/weaknesses, our edge). Use a comparison table.\n${langNote}\n${context}`;
        case "pitchDeck":
            return `Outline a 12–15 slide investor pitch deck with slide titles and bullet points tailored to this business.\n${langNote}\n${context}`;
        case "brandingGuide":
            return `Write a lightweight branding & visual identity brief (voice & tone, value pillars, color/typography suggestions, logo usage ideas) suited to the target audience.\n${langNote}\n${context}`;
        case "teamStructure":
            return `Propose an organizational structure with key roles, responsibilities (RACI hints), and near-term hires with priorities.\n${langNote}\n${context}`;
        case "customerJourney":
            return `Map a customer journey (Awareness → Consideration → Purchase → Onboarding → Retention → Advocacy) with key touchpoints and metrics.\n${langNote}\n${context}`;
        case "salesForecast":
            return `Build a simple sales forecast table (quarters, leads, conversion rates, ACV/ARPU, bookings/revenue) with assumptions.\n${langNote}\n${context}`;
        case "fundingPlan":
            return `Draft a funding strategy (target round size, use of proceeds, milestones to next round, suggested investor profile) tailored to this business.\n${langNote}\n${context}`;

        default:
            return `Generate a useful "${extra}" section for the ${category} context.\n${langNote}\n${context}`;
    }
}

export const universalService = {
    /** create order */
    async createOrder(userId: string, email: string, body: any) {
        await connectDB();

        if (!body || typeof body !== "object") throw new Error("Invalid request body");
        if (!body.category) throw new Error("Missing category");
        if (!body.fields || typeof body.fields !== "object") throw new Error("Missing fields");
        if (!body.totalTokens || isNaN(body.totalTokens)) throw new Error("Invalid totalTokens value");

        if (body.planType === "instant") body.planType = "default";
        if (!["default", "reviewed"].includes(body.planType))
            throw new Error("Invalid planType (must be 'default' or 'reviewed')");

        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        // Price authority: for catalog services the SERVER sets the fixed price
        // from the registry (the client-supplied totalTokens is never trusted).
        // Legacy categories (business/training/nutrition) keep the old behavior.
        const service = getServiceByCategory(body.category);
        let totalCost: number;
        if (service) {
            const planKey: ServicePlan = body.planType === "reviewed" ? "reviewed" : "ai";
            const fixed = service.prices[planKey];
            if (fixed == null)
                throw new Error(`Service "${service.title}" does not offer the ${planKey} plan`);
            totalCost = fixed;
        } else {
            const languageCost = body.language && body.language !== "English" ? 5 : 0;
            totalCost = Number(body.totalTokens) + languageCost;
        }

        if (user.tokens < totalCost)
            throw new Error(`Insufficient tokens (have ${user.tokens}, need ${totalCost})`);

        // charge
        user.tokens -= totalCost;
        await user.save();
        await transactionService.record(user._id, email, totalCost, "spend", user.tokens);

        const totalTokensCharged = totalCost;

        // ========== EXPERT PATH (reviewed) ==========
        if (body.planType === "reviewed") {
            const orderDoc = {
                userId: new mongoose.Types.ObjectId(userId),
                email,
                category: body.category,
                fields: body.fields,
                planType: body.planType,
                extras: body.extras || [],
                totalTokens: totalTokensCharged,
                language: body.language || "English",
                response: "",
                extrasData: {},
                status: "pending" as const,
                expertId: null,
                pdfUrl: null,
            };

            const order = await UniversalOrder.create(orderDoc);
            console.log("[universalService.createOrder] Expert order created", {
                userId,
                email: user.email,
                orderId: order._id?.toString?.(),
                category: orderDoc.category,
            });

            if (ENV.SMTP_USER) {
                mailService.sendAdminNewExpertOrderEmail(
                    ENV.SMTP_USER,
                    {
                        orderId: order._id.toString(),
                        category: body.category,
                        clientEmail: email,
                    },
                    {
                        expertName: "Unassigned",
                        expertEmail: "—",
                        action: "created",
                    }
                ).catch((e) => console.error("[universal] Admin order email failed:", e));
            }

            mailService.sendOrderConfirmationEmail({
                to: user.email,
                firstName: user.firstName,
                subject: "Expert Order Placed",
                summary: `Your order has been placed! An expert will prepare your ${service?.title ?? "order"}. You'll be notified when it's ready.`,
                transactionDate: order.createdAt || new Date(),
                details: [
                    `Service: ${service?.title ?? body.category}`,
                    `Plan type: Expert-Written`,
                    `Tokens used: ${totalTokensCharged}`,
                ],
            }).catch((e) => console.error("[universal] Order confirmation email failed:", e));

            return order.toObject({ flattenMaps: true });
        }

        // ========== AI PATH (default) ==========
        const languageNote = body.language
            ? `Write the entire output in ${body.language}.`
            : "Write the entire output in English.";
        const isBusiness = body.category === "business";
        const isCatalog = !!service;
        const bpModel = ENV.OPENAI_BP_MODEL;
        // Bounded output caps — enough for real depth, but capped so a runaway
        // generation can't hang the request.
        //
        // IMPORTANT gpt-5 gotcha: `max_completion_tokens` INCLUDES reasoning
        // tokens, not just visible output. At `reasoning_effort: "low"` the
        // model still typically spends 800–2000 tokens on internal reasoning
        // before writing anything. Setting this too tight causes the model to
        // exhaust the budget in reasoning and return EMPTY content with
        // `finish_reason: "length"` — which is exactly the "PDF has only the
        // title" symptom.
        //
        // Budget breakdown (main):  ~2000 reasoning + ~5000 output = 7000, +buffer.
        // Budget breakdown (extra): ~1500 reasoning + ~1500 output = 3000, +buffer.
        const BP_MAIN_MAX_TOKENS = 8000;
        const BP_EXTRA_MAX_TOKENS = 3500;
        const BP_TEMPERATURE = 0.4;
        // Firm per-call timeouts. If OpenAI stalls or takes too long, we abort
        // and surface a real error instead of leaving the user staring at a
        // loader indefinitely.
        const BP_MAIN_TIMEOUT_MS = 150_000;  // 150s ceiling for the main plan
        const BP_EXTRA_TIMEOUT_MS = 90_000;  // 90s ceiling per extra
        // Non-business paths keep the old thin generator on the cheaper model.
        const LEGACY_MODEL = "gpt-4o-mini";

        let mainText = "";
        // Cached across the main + all extra calls in this request so the OpenAI
        // prompt-caching layer sees an identical stable prefix on every call.
        const bpSystemPrompt = isBusiness
            ? buildBpAnalystSystemPrompt(languageNote)
            : isCatalog
                ? buildCatalogSystemPrompt(service!, languageNote)
                : "";

        try {
            if (isBusiness) {
                const req = buildChatRequest({
                    model: bpModel,
                    maxTokens: BP_MAIN_MAX_TOKENS,
                    temperature: BP_TEMPERATURE,
                    messages: [
                        { role: "system", content: bpSystemPrompt },
                        { role: "user", content: buildBpMainUserPrompt(body.fields || {}) },
                    ],
                });
                console.log("[universalService.createOrder] AI main call starting", {
                    userId, model: bpModel, timeoutMs: BP_MAIN_TIMEOUT_MS,
                    maxTokens: BP_MAIN_MAX_TOKENS,
                });
                const t0 = Date.now();
                const mainRes = await openai.chat.completions.create(
                    req as any,
                    { signal: AbortSignal.timeout(BP_MAIN_TIMEOUT_MS) }
                );
                mainText = mainRes.choices?.[0]?.message?.content?.trim() || "";
                const choice0 = (mainRes.choices?.[0] || {}) as {
                    finish_reason?: string;
                    message?: { content?: string };
                };
                const usage = (mainRes as unknown as { usage?: Record<string, number> }).usage;
                console.log("[universalService.createOrder] AI main call finished", {
                    userId,
                    model: bpModel,
                    elapsedMs: Date.now() - t0,
                    finishReason: choice0.finish_reason,
                    contentChars: mainText.length,
                    usage,
                });
                // If the model returned nothing (typically finish_reason === "length"
                // because reasoning ate the whole budget), we must NOT silently
                // save an empty plan — that's exactly the "empty PDF" symptom.
                if (!mainText) {
                    throw new Error(
                        `AI generation produced empty content (finish_reason=${choice0.finish_reason || "unknown"}). ` +
                        `This typically means max_completion_tokens is too small for the model's reasoning + output.`
                    );
                }
            } else if (isCatalog) {
                const req = buildChatRequest({
                    model: bpModel,
                    maxTokens: BP_MAIN_MAX_TOKENS,
                    temperature: BP_TEMPERATURE,
                    messages: [
                        { role: "system", content: bpSystemPrompt },
                        { role: "user", content: buildCatalogUserPrompt(service!, body.fields || {}) },
                    ],
                });
                console.log("[universalService.createOrder] Catalog AI call starting", {
                    userId, category: body.category, model: bpModel,
                    timeoutMs: BP_MAIN_TIMEOUT_MS, maxTokens: BP_MAIN_MAX_TOKENS,
                });
                const t0 = Date.now();
                const mainRes = await openai.chat.completions.create(
                    req as any,
                    { signal: AbortSignal.timeout(BP_MAIN_TIMEOUT_MS) }
                );
                mainText = mainRes.choices?.[0]?.message?.content?.trim() || "";
                const choice0 = (mainRes.choices?.[0] || {}) as { finish_reason?: string };
                const usage = (mainRes as unknown as { usage?: Record<string, number> }).usage;
                console.log("[universalService.createOrder] Catalog AI call finished", {
                    userId, category: body.category, model: bpModel,
                    elapsedMs: Date.now() - t0,
                    finishReason: choice0.finish_reason,
                    contentChars: mainText.length,
                    usage,
                });
                if (!mainText) {
                    throw new Error(
                        `AI generation produced empty content (finish_reason=${choice0.finish_reason || "unknown"}).`
                    );
                }
            } else {
                const mainPrompt = buildPrompt(body);
                const mainRes = await openai.chat.completions.create({
                    model: LEGACY_MODEL,
                    messages: [
                        {
                            role: "system",
                            content: "You are a structured professional generator. Always output final readable content.",
                        },
                        { role: "user", content: mainPrompt },
                    ],
                });
                mainText = mainRes.choices?.[0]?.message?.content?.trim() || "";
            }
        } catch (err: any) {
            // Surface the real OpenAI error message to the server log — the
            // "AI generation failed" string alone hides the actual reason.
            const detail =
                err?.response?.data?.error?.message ||
                err?.error?.message ||
                err?.message ||
                "unknown";
            console.error("[universalService.createOrder] AI main generation failed", {
                userId,
                model: isBusiness || isCatalog ? bpModel : LEGACY_MODEL,
                detail,
            });
            throw new Error("AI generation failed, please retry later");
        }

        const extrasData: Record<string, string> = {};
        if (Array.isArray(body.extras) && body.extras.length > 0) {
            if (isBusiness) {
                // Plan-aware extras: each extra call sees
                //   [ SYSTEM: senior-analyst rules ]
                //   [ ASSISTANT: the just-generated main plan (verbatim) ]
                //   [ USER: the specific extra brief ]
                // — so all extras stay consistent with the main plan, and the big
                // system prompt + main plan act as a stable cacheable prefix that
                // is identical across every extra call in this request.
                const results = await Promise.all(
                    body.extras.map(async (extra: string) => {
                        try {
                            const req = buildChatRequest({
                                model: bpModel,
                                maxTokens: BP_EXTRA_MAX_TOKENS,
                                temperature: BP_TEMPERATURE,
                                messages: [
                                    { role: "system", content: bpSystemPrompt },
                                    { role: "assistant", content: mainText },
                                    { role: "user", content: buildBpExtraUserPrompt(extra, body.fields || {}) },
                                ],
                            });
                            const t0 = Date.now();
                            const res = await openai.chat.completions.create(
                                req as any,
                                { signal: AbortSignal.timeout(BP_EXTRA_TIMEOUT_MS) }
                            );
                            const content = res.choices?.[0]?.message?.content?.trim() || "";
                            const choice0 = (res.choices?.[0] || {}) as { finish_reason?: string };
                            const usage = (res as unknown as { usage?: Record<string, number> }).usage;
                            console.log(
                                "[universalService.createOrder] AI extra call finished",
                                {
                                    userId, model: bpModel, extra,
                                    elapsedMs: Date.now() - t0,
                                    finishReason: choice0.finish_reason,
                                    contentChars: content.length,
                                    usage,
                                }
                            );
                            return [extra, content] as const;
                        } catch (err: any) {
                            const detail =
                                err?.response?.data?.error?.message ||
                                err?.error?.message ||
                                err?.message ||
                                "unknown";
                            console.error(
                                "[universalService.createOrder] AI extra generation failed",
                                { userId, model: bpModel, extra, detail }
                            );
                            return [extra, ""] as const;
                        }
                    })
                );
                for (const [k, v] of results) {
                    if (v) extrasData[k] = v;
                }
            } else {
                for (const extra of body.extras) {
                    try {
                        const extraPrompt = buildExtraPrompt(extra, body.category, body.fields, body.language);
                        const extraRes = await openai.chat.completions.create({
                            model: LEGACY_MODEL,
                            messages: [{ role: "user", content: extraPrompt }],
                        });
                        extrasData[extra] = extraRes.choices?.[0]?.message?.content?.trim() || "";
                    } catch {}
                }
            }
        }

        const orderDoc = {
            userId: new mongoose.Types.ObjectId(userId),
            email,
            category: body.category,
            fields: body.fields,
            planType: body.planType,
            extras: body.extras || [],
            totalTokens: totalTokensCharged,
            language: body.language || "English",
            response: mainText,
            extrasData,
            status: "ready" as const,
            readyAt: new Date(),
        };

        const order = await UniversalOrder.create(orderDoc);
        console.log("[universalService.createOrder] Success path reached", {
            userId,
            email: user.email,
            orderId: order._id?.toString?.(),
            status: order.status,
            tokensUsed: orderDoc.totalTokens,
            category: orderDoc.category,
        });

        mailService.sendOrderConfirmationEmail({
            to: user.email,
            firstName: user.firstName,
            subject: "Order Confirmation",
            summary: "Your order was completed successfully.",
            transactionDate: order.createdAt || new Date(),
            details: [
                `Service: ${service?.title ?? body.category}`,
                `Plan type: ${body.planType}`,
                `Tokens used: ${orderDoc.totalTokens}`,
            ],
        }).catch((e) => console.error("[universal] AI order confirmation email failed:", e));

        return order.toObject({ flattenMaps: true });
    },

    async getOrders(userId: string) {
        await connectDB();
        const docs = await UniversalOrder.find({ userId })
            .select("-pdfData")
            .sort({ createdAt: -1 })
            .lean<UniversalOrderDocument[]>({ virtuals: true });

        return docs.map((d: any) => {
            if (d.extrasData instanceof Map) d.extrasData = Object.fromEntries(d.extrasData);
            return d;
        });
    },

    async getOrderById(userId: string, orderId: string) {
        await connectDB();
        const doc = await UniversalOrder.findOne({ _id: orderId, userId }).lean<UniversalOrderDocument>({ virtuals: true });
        if (!doc) return null;
        if (doc.extrasData instanceof Map) (doc as any).extrasData = Object.fromEntries(doc.extrasData);
        return doc;
    },
};
