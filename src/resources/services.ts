// Central service registry — single source of truth for the fixed-price
// service catalog. Consumed by:
//   - the generic order form (src/components/widgets/service-order)
//   - the order route (src/app/order/[slug])
//   - the backend (src/backend/services/universal.service.ts) for the
//     SERVER-AUTHORITATIVE price and the AI generation prompt.
//
// Prices are in TOKENS (1 token = €0.01, see resources/pricing.ts).
// A service may support the "ai" plan (instant AI draft), the "reviewed"
// plan (expert-written), or both. The price is fixed per service per plan.

export type ServiceFieldType = "text" | "textarea" | "number" | "select";

export interface ServiceField {
    name: string;
    label: string;
    type: ServiceFieldType;
    required?: boolean;
    options?: string[];
    placeholder?: string;
}

export type ServicePlan = "ai" | "reviewed";

export interface ServiceDefinition {
    slug: string;
    /** stored verbatim as UniversalOrder.category */
    category: string;
    title: string;
    group: "academic" | "professional";
    icon: string;
    shortDesc: string;
    longDesc: string;
    /** fixed price per plan, in tokens. Missing plan = not offered. */
    prices: Partial<Record<ServicePlan, number>>;
    fields: ServiceField[];
    /** persona used to build the AI system prompt */
    promptRole: string;
    /** required output sections used to build the AI user prompt */
    deliverables: string[];
}

// ---------------------------------------------------------------------------
// Shared field presets
// ---------------------------------------------------------------------------

const ACADEMIC_FIELDS: ServiceField[] = [
    { name: "topic", label: "Topic / Title", type: "text", required: true, placeholder: "e.g. The impact of remote work on team productivity" },
    { name: "subject", label: "Subject / Discipline", type: "text", required: true, placeholder: "e.g. Organizational Psychology" },
    { name: "academicLevel", label: "Academic Level", type: "select", required: true, options: ["High School", "Undergraduate", "Master's", "PhD"] },
    { name: "pages", label: "Length (pages)", type: "number", required: true, placeholder: "e.g. 10" },
    { name: "citationStyle", label: "Citation Style", type: "select", options: ["APA", "MLA", "Chicago", "Harvard", "IEEE", "Other / None"] },
    { name: "sources", label: "Number of sources", type: "number", placeholder: "e.g. 8" },
    { name: "deadline", label: "Deadline", type: "text", placeholder: "e.g. 7 days" },
    { name: "instructions", label: "Additional instructions", type: "textarea", placeholder: "Anything specific we should follow…" },
];

const PROFESSIONAL_FIELDS: ServiceField[] = [
    { name: "topic", label: "Topic / Working title", type: "text", required: true, placeholder: "e.g. Cloud migration whitepaper" },
    { name: "audience", label: "Target audience", type: "text", required: true, placeholder: "e.g. CTOs at mid-market SaaS companies" },
    { name: "lengthWords", label: "Length (words)", type: "number", required: true, placeholder: "e.g. 1500" },
    { name: "tone", label: "Tone / Style", type: "select", options: ["Formal", "Persuasive", "Technical", "Conversational", "Authoritative"] },
    { name: "keywords", label: "Focus keywords (optional)", type: "text", placeholder: "comma-separated" },
    { name: "deadline", label: "Deadline", type: "text", placeholder: "e.g. 5 days" },
    { name: "instructions", label: "Additional instructions", type: "textarea", placeholder: "Anything specific we should follow…" },
];

// ---------------------------------------------------------------------------
// Service catalog
// ---------------------------------------------------------------------------

export const SERVICES: ServiceDefinition[] = [
    {
        slug: "research-paper",
        category: "research-paper",
        title: "Research Paper",
        group: "academic",
        icon: "📄",
        shortDesc: "Evidence-based, citation-ready research papers on any topic.",
        longDesc: "Original, well-argued research papers with a clear thesis, structured analysis, and properly formatted citations in the style of your choice.",
        prices: { ai: 2500, reviewed: 6000 },
        fields: ACADEMIC_FIELDS,
        promptRole: "You are a senior academic researcher and writer with a doctorate and 15+ years of publishing peer-reviewed work.",
        deliverables: [
            "Title & Abstract",
            "Introduction (context, problem, thesis statement)",
            "Literature Background",
            "Methodology / Approach",
            "Analysis & Discussion",
            "Conclusion",
            "References (in the requested citation style)",
        ],
    },
    {
        slug: "literature-review",
        category: "literature-review",
        title: "Literature Review",
        group: "academic",
        icon: "📚",
        shortDesc: "Structured synthesis of existing research around your topic.",
        longDesc: "A critical, thematically organized review that maps the current state of research, identifies gaps, and positions your work within the field.",
        prices: { ai: 2000, reviewed: 5000 },
        fields: ACADEMIC_FIELDS,
        promptRole: "You are an academic reviewer who specializes in synthesizing scholarly literature into structured, critical reviews.",
        deliverables: [
            "Introduction & Scope",
            "Thematic Synthesis (grouped by theme, not by source)",
            "Critical Evaluation of Key Works",
            "Identified Gaps & Tensions",
            "Conclusion & Directions for Future Research",
            "References (in the requested citation style)",
        ],
    },
    {
        slug: "case-study",
        category: "case-study",
        title: "Case Study",
        group: "academic",
        icon: "🔍",
        shortDesc: "In-depth analysis of a real or hypothetical case.",
        longDesc: "A rigorous case study that frames the problem, analyzes evidence against relevant theory, and delivers actionable, defensible recommendations.",
        prices: { ai: 2000, reviewed: 4800 },
        fields: ACADEMIC_FIELDS,
        promptRole: "You are a case-study analyst who writes decision-useful, theory-grounded case analyses for graduate programs.",
        deliverables: [
            "Executive Summary",
            "Background & Context",
            "Problem Statement",
            "Analysis (applying relevant frameworks)",
            "Alternatives Considered",
            "Recommendations",
            "Conclusion",
        ],
    },
    {
        slug: "capstone-project",
        category: "capstone-project",
        title: "Capstone Project",
        group: "academic",
        icon: "🎓",
        shortDesc: "Comprehensive final project tying your program together.",
        longDesc: "A full capstone deliverable integrating research, analysis, and applied recommendations to demonstrate mastery of your field.",
        prices: { ai: 3500, reviewed: 8000 },
        fields: ACADEMIC_FIELDS,
        promptRole: "You are a capstone advisor guiding a final-year student through an integrative, applied research project.",
        deliverables: [
            "Project Overview & Objectives",
            "Background & Significance",
            "Literature Foundation",
            "Methodology",
            "Findings / Deliverable",
            "Discussion & Implications",
            "Conclusion & Recommendations",
            "References",
        ],
    },
    {
        slug: "dissertation-support",
        category: "dissertation-support",
        title: "Dissertation Support",
        group: "academic",
        icon: "📕",
        shortDesc: "Doctoral-level structure, argumentation, and chapters.",
        longDesc: "Support across the dissertation lifecycle — from proposal and chapter drafting to argumentation, structure, and citation consistency.",
        prices: { ai: 5000, reviewed: 12000 },
        fields: ACADEMIC_FIELDS,
        promptRole: "You are a doctoral dissertation advisor with deep expertise in research design and scholarly argumentation.",
        deliverables: [
            "Abstract",
            "Introduction & Research Questions",
            "Literature Review",
            "Methodology",
            "Results / Analysis",
            "Discussion",
            "Conclusion & Contribution",
            "References",
        ],
    },
    {
        slug: "thesis-support",
        category: "thesis-support",
        title: "Thesis Support",
        group: "academic",
        icon: "📗",
        shortDesc: "Master's-level thesis structure and drafting.",
        longDesc: "Guidance and drafting for a master's thesis: a defensible argument, coherent structure, and rigorous, well-cited analysis.",
        prices: { ai: 4500, reviewed: 11000 },
        fields: ACADEMIC_FIELDS,
        promptRole: "You are a master's thesis supervisor who helps students build rigorous, well-structured theses.",
        deliverables: [
            "Abstract",
            "Introduction & Thesis Statement",
            "Literature Review",
            "Methodology",
            "Analysis / Findings",
            "Discussion",
            "Conclusion",
            "References",
        ],
    },
    {
        slug: "coursework-guidance",
        category: "coursework-guidance",
        title: "Coursework Guidance",
        group: "academic",
        icon: "✏️",
        shortDesc: "Structured help with essays and assignments.",
        longDesc: "Clear, well-argued coursework that follows the assignment brief, hits the marking criteria, and reads at the right academic level.",
        prices: { ai: 1500, reviewed: 3500 },
        fields: ACADEMIC_FIELDS,
        promptRole: "You are an experienced tutor who produces model coursework answers aligned to marking rubrics.",
        deliverables: [
            "Introduction",
            "Main Argument (structured in clear sections)",
            "Supporting Evidence & Examples",
            "Counter-arguments (where relevant)",
            "Conclusion",
            "References",
        ],
    },
    {
        slug: "lab-report",
        category: "lab-report",
        title: "Lab Report Assistance",
        group: "academic",
        icon: "🧪",
        shortDesc: "Scientific lab reports in standard format.",
        longDesc: "Properly structured lab reports covering aim, method, results, and analysis — written to scientific reporting conventions.",
        prices: { ai: 1500, reviewed: 3200 },
        fields: ACADEMIC_FIELDS,
        promptRole: "You are a science lab demonstrator who writes rigorous, conventionally-structured lab reports.",
        deliverables: [
            "Title & Aim",
            "Introduction & Hypothesis",
            "Materials & Method",
            "Results",
            "Discussion & Analysis",
            "Conclusion",
            "References",
        ],
    },
    {
        slug: "book-report",
        category: "book-report",
        title: "Book Report",
        group: "academic",
        icon: "📖",
        shortDesc: "Insightful summaries and analysis of any book.",
        longDesc: "A structured book report that summarizes the work and delivers thoughtful analysis of its themes, characters, and significance.",
        prices: { ai: 1200, reviewed: 2800 },
        fields: ACADEMIC_FIELDS,
        promptRole: "You are a literature tutor who writes insightful, well-structured book reports.",
        deliverables: [
            "Bibliographic Overview",
            "Summary of the Work",
            "Themes & Analysis",
            "Characters / Key Elements",
            "Critical Evaluation",
            "Conclusion",
        ],
    },
    {
        slug: "article-review",
        category: "article-review",
        title: "Article Review",
        group: "academic",
        icon: "📰",
        shortDesc: "Critical review of a scholarly or popular article.",
        longDesc: "A critical article review that summarizes the source and evaluates its argument, methodology, evidence, and contribution.",
        prices: { ai: 1200, reviewed: 2800 },
        fields: ACADEMIC_FIELDS,
        promptRole: "You are an academic reviewer who writes balanced, critical article reviews.",
        deliverables: [
            "Citation & Overview",
            "Summary of the Article",
            "Critical Evaluation (argument, method, evidence)",
            "Strengths & Weaknesses",
            "Relevance & Contribution",
            "Conclusion",
        ],
    },
    {
        slug: "critical-analysis",
        category: "critical-analysis",
        title: "Critical Analysis",
        group: "academic",
        icon: "🧠",
        shortDesc: "Deep critical analysis of a text, work, or argument.",
        longDesc: "A focused critical analysis that interprets and evaluates its subject with a clear thesis and well-supported reasoning.",
        prices: { ai: 1800, reviewed: 4000 },
        fields: ACADEMIC_FIELDS,
        promptRole: "You are a critical-analysis specialist who writes sharp, thesis-driven analytical essays.",
        deliverables: [
            "Introduction & Thesis",
            "Context / Summary of the Subject",
            "Analytical Argument (structured claims)",
            "Evidence & Interpretation",
            "Evaluation",
            "Conclusion",
        ],
    },
    {
        slug: "seo",
        category: "seo",
        title: "SEO Content",
        group: "professional",
        icon: "🔎",
        shortDesc: "Search-optimized content that ranks and converts.",
        longDesc: "SEO-optimized content built around your target keywords, with a clear structure, natural keyword usage, and conversion-focused copy.",
        prices: { ai: 1800, reviewed: 4000 },
        fields: PROFESSIONAL_FIELDS,
        promptRole: "You are a senior SEO content strategist who writes content that ranks and converts.",
        deliverables: [
            "Suggested Title & Meta Description",
            "Keyword & Search-Intent Notes",
            "Structured Content (H2/H3 outline filled with copy)",
            "Internal & On-page SEO Recommendations",
            "Call-to-Action",
        ],
    },
    {
        slug: "white-paper",
        category: "white-paper",
        title: "White Paper",
        group: "professional",
        icon: "📑",
        shortDesc: "Authoritative white papers that build credibility.",
        longDesc: "A persuasive, research-backed white paper that frames a problem, presents your solution, and supports it with credible reasoning.",
        prices: { ai: 3000, reviewed: 7000 },
        fields: PROFESSIONAL_FIELDS,
        promptRole: "You are a B2B white paper author who writes authoritative, evidence-led thought leadership.",
        deliverables: [
            "Executive Summary",
            "Problem / Market Context",
            "Solution / Approach",
            "Supporting Evidence & Analysis",
            "Implementation Considerations",
            "Conclusion & Next Steps",
        ],
    },
    {
        slug: "business-report",
        category: "business-report",
        title: "Business Report",
        group: "professional",
        icon: "📊",
        shortDesc: "Clear, decision-ready business reports.",
        longDesc: "A structured business report that analyzes the situation, presents findings, and delivers clear, actionable recommendations.",
        prices: { ai: 2500, reviewed: 6000 },
        fields: PROFESSIONAL_FIELDS,
        promptRole: "You are a management consultant who writes concise, decision-ready business reports.",
        deliverables: [
            "Executive Summary",
            "Introduction & Objectives",
            "Findings & Analysis",
            "Discussion",
            "Recommendations",
            "Conclusion",
        ],
    },
    {
        slug: "technical-documentation",
        category: "technical-documentation",
        title: "Technical Documentation",
        group: "professional",
        icon: "⚙️",
        shortDesc: "Clear technical docs, guides, and references.",
        longDesc: "Accurate, well-organized technical documentation — guides, references, or manuals — written for your specified audience.",
        prices: { ai: 2800, reviewed: 6500 },
        fields: PROFESSIONAL_FIELDS,
        promptRole: "You are a senior technical writer who produces precise, well-structured documentation.",
        deliverables: [
            "Overview & Scope",
            "Prerequisites / Assumptions",
            "Step-by-step Content",
            "Reference Details",
            "Troubleshooting / FAQ",
            "Summary",
        ],
    },
    {
        slug: "grant-proposal",
        category: "grant-proposal",
        title: "Grant Proposal Support",
        group: "professional",
        icon: "💰",
        shortDesc: "Compelling, fundable grant proposals.",
        longDesc: "A persuasive grant proposal that articulates need, objectives, methodology, and impact in the structure funders expect.",
        prices: { ai: 3500, reviewed: 8500 },
        fields: PROFESSIONAL_FIELDS,
        promptRole: "You are a grant-writing specialist with a strong track record of funded proposals.",
        deliverables: [
            "Executive Summary",
            "Statement of Need",
            "Goals & Objectives",
            "Methodology / Project Plan",
            "Evaluation & Impact",
            "Budget Narrative",
            "Conclusion",
        ],
    },
    {
        slug: "market-research",
        category: "market-research",
        title: "Market Research Assistance",
        group: "professional",
        icon: "📈",
        shortDesc: "Actionable market research and analysis.",
        longDesc: "A structured market research deliverable covering market sizing, segmentation, competition, and actionable insight.",
        prices: { ai: 3000, reviewed: 7000 },
        fields: PROFESSIONAL_FIELDS,
        promptRole: "You are a market research analyst who turns inputs into structured, actionable market analysis.",
        deliverables: [
            "Executive Summary",
            "Market Overview & Sizing",
            "Customer Segmentation",
            "Competitive Landscape",
            "Trends & Opportunities",
            "Recommendations",
        ],
    },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
    return SERVICES.find((s) => s.slug === slug);
}

export function getServiceByCategory(category: string): ServiceDefinition | undefined {
    return SERVICES.find((s) => s.category === category);
}

export function getServicePlans(service: ServiceDefinition): ServicePlan[] {
    return (Object.keys(service.prices) as ServicePlan[]).filter(
        (p) => service.prices[p] != null
    );
}
