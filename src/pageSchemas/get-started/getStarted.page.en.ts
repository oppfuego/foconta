import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `Get Started — ${COMPANY_NAME}`,
        description: `Start your professional business plan with ${COMPANY_NAME}. Our experts craft custom, investor-ready business plans within 24 hours — supported by AI precision for faster results.`,
        keywords: [
            "expert business plan",
            "24-hour business plan",
            "AI + human planning",
            "startup consulting service",
            "professional business plan help",
        ],
        canonical: "/get-started",
        ogImage: {
            title: `Start with ${COMPANY_NAME}`,
            description: "Real experts. Real business plans. Delivered in 24 hours.",
            bg: "#0a2540",
            color: "#ffffff",
        },
    },

    blocks: [
        // 🏁 HERO — Human-first intro
        {
            type: "custom",
            component: "HeroSection",
            title: `Get Your Business Plan in 24 Hours`,
            highlight: `${COMPANY_NAME}`,
            description: `${COMPANY_NAME} connects you directly with verified business planning specialists who build your complete, investor-ready plan — in just 24 hours.  
Our experts use AI only to accelerate research and structure, while the strategy, tone, and insights are crafted by real professionals.`,
            image: "image16",
            align: "right",
            showTrustBadge: true,
            primaryCta: { text: "Request My Plan", link: "/sign-up" },
            secondaryCta: { text: "See How It Works", link: "#process" },
        },

        // ⚡ HIGHLIGHT STRIP
        {
            type: "custom",
            component: "HighlightStrip",
            items: [
                { icon: "👩‍💼", text: "Real Experts, Not Templates" },
                { icon: "⏱️", text: "Delivery Within 24 Hours" },
                { icon: "📊", text: "Investor-Ready Formatting" },
                { icon: "🤝", text: "Personal Support & Consultation" },
                { icon: "🤖", text: "AI Tools for Efficiency, Not Replacement" },
            ],
        },

        // 🧭 INFOBLOCK — WHY HUMAN FIRST
        {
            type: "section",
            title: "Why Work With a Real Expert?",
            description: `Our business analysts combine data-driven insights with years of market experience.  
While AI helps speed up calculations, it’s the **human touch** that turns numbers into a convincing story investors trust.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                image: "expertDiscussion",
                title: "We Understand Context",
                description:
                    "Every business is different. Our experts listen, analyze, and adapt your plan to fit your goals, industry, and audience. No generic output — only real strategy.",
                bullets: [
                    "Consultation before plan creation",
                    "Tailored tone and structure",
                    "Real market references and competitor insights",
                ],
            },
            right: {
                type: "custom",
                component: "InfoBlock",
                image: "aiAssistance",
                title: "AI as a Co-Pilot",
                description:
                    "We use AI to automate research and formatting — but the decision-making and writing always come from a specialist.",
                bullets: [
                    "Smart data structuring",
                    "Faster report generation",
                    "100% human-verified content",
                ],
            },
        },

        // 🪜 TIMELINE — PROCESS
        {
            type: "custom",
            component: "Timeline",
            title: "How It Works — Your Path to a Complete Business Plan",
            steps: [
                {
                    title: "Submit Your Request",
                    description:
                        "Fill out a short form describing your idea, target audience, and goals. It only takes 5 minutes to get started.",
                },
                {
                    title: "Get Matched with a Specialist",
                    description:
                        "Within 1 hour, we assign your project to an expert with experience in your industry (tech, e-commerce, manufacturing, etc.).",
                },
                {
                    title: "Consultation & Clarification",
                    description:
                        "Your assigned specialist may reach out to clarify details or suggest improvements before writing begins.",
                },
                {
                    title: "AI Research Support",
                    description:
                        "We use AI tools to collect relevant market data, competitor benchmarks, and forecast models — saving hours of manual research.",
                },
                {
                    title: "Expert Writing Process",
                    description:
                        "Our analyst structures your plan with clear logic, tailored tone, and proper financial projections.",
                },
                {
                    title: "Quality Review",
                    description:
                        "Before delivery, a senior editor reviews the plan for coherence, consistency, and investor alignment.",
                },
                {
                    title: "Receive Your Plan Within 24 Hours",
                    description:
                        "You’ll receive your full document via email and dashboard — formatted, styled, and ready to share.",
                },
                {
                    title: "Post-Delivery Support",
                    description:
                        "Need adjustments or presentation help? Our team offers revisions and pitch-deck adaptation upon request.",
                },
            ],
        },

        // 💎 VALUES
        {
            type: "custom",
            component: "ValuesIcons",
            title: "What Makes Us Different",
            description:
                `${COMPANY_NAME} is built on trust, professionalism, and the belief that business planning should be personal — not automated.`,
            values: [
                {
                    icon: "🕓",
                    title: "Speed with Substance",
                    text: "24-hour delivery without sacrificing quality or research depth.",
                },
                {
                    icon: "👥",
                    title: "Dedicated Specialists",
                    text: "Each client is matched with an expert who truly understands their business model.",
                },
                {
                    icon: "📈",
                    title: "Real Market Intelligence",
                    text: "We include verified sources, trends, and financial projections in every plan.",
                },
                {
                    icon: "💬",
                    title: "Direct Communication",
                    text: "You can chat with your expert any time — we value transparency and collaboration.",
                },
            ],
        },

        // 🎥 VIDEO
        {
            type: "custom",
            component: "VideoDemo",
            title: "See the 24-Hour Process in Action",
            description:
                "Watch how our experts combine AI insights and professional writing to create structured, impactful business plans.",
            video: "planDemo",
        },

        // 👩‍💼 TEAM
        {
            type: "custom",
            component: "TeamGrid",
            title: "Meet the Experts Behind the Plans",
            description:
                "Our core team includes business analysts, market researchers, and editors — each bringing years of consulting experience and startup knowledge.",
            members: [
                {
                    name: "Sophie Turner",
                    role: "Senior Business Analyst",
                    bio: "10+ years in strategy consulting. Specializes in startup scalability and investor communications.",
                    image: "team1",
                },
                {
                    name: "Luca Moretti",
                    role: "Financial Model Specialist",
                    bio: "Former Deloitte analyst building financial forecasts and performance simulations.",
                    image: "team2",
                },
                {
                    name: "Isabelle Dubois",
                    role: "Market Research Lead",
                    bio: "Expert in global trends and competitor benchmarking across 20+ industries.",
                    image: "team3",
                },
            ],
        },

        // 🧩 SECTION — YOUR ADVANTAGE
        {
            type: "section",
            title: "Why Choose a Human-Centered Approach?",
            description:
                "Our approach blends speed, accuracy, and genuine understanding — because investors trust real people, not just data.",
            left: {
                type: "custom",
                component: "InfoBlock",
                image: "humanApproach",
                title: "We Focus on Your Story",
                description:
                    "A great business plan is more than numbers — it’s a narrative. Our experts make sure your idea sounds convincing and fundable.",
                bullets: [
                    "Tailored story and tone",
                    "Professional formatting",
                    "Investor-focused presentation",
                ],
            },
            right: {
                type: "custom",
                component: "InfoBlock",
                image: "trust",
                title: "Trusted by Entrepreneurs",
                description:
                    "Thousands of founders have launched with ${COMPANY_NAME}. They stay because of the human attention behind every plan.",
                bullets: [
                    "High satisfaction rate",
                    "Ongoing support options",
                    "Personal business mentoring",
                ],
            },
        },

        // 🎯 CTA — MISSION BANNER
        {
            type: "custom",
            component: "MissionBanner",
            title: "Your Idea Deserves a Professional Plan",
            description: `Let our experts build your investor-ready plan in 24 hours — supported by AI for speed, perfected by people for quality.`,
            image: "ctaBusiness",
        },

        // ❓ FAQ
        {
            type: "faq",
            items: [
                {
                    question: "Who writes my business plan?",
                    answer:
                        "A certified business analyst from our team. Every project is handled by a real specialist — no automated text.",
                },
                {
                    question: "What if I need changes?",
                    answer:
                        "We offer one free revision and optional ongoing support for updates, pitch-deck creation, or funding materials.",
                },
                {
                    question: "How do you use AI in the process?",
                    answer:
                        "AI assists with research, structure, and formatting — but the writing and analysis are always done by experts.",
                },
                {
                    question: "Can I talk to the person writing my plan?",
                    answer:
                        "Yes. You’ll have direct communication via email or chat to ensure full clarity during the process.",
                },
                {
                    question: "What makes your service different?",
                    answer:
                        "Speed, personalization, and real human insight. We don’t generate — we craft each plan with care and data precision.",
                },
            ],
        },
    ],
};

export default schema;
