import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `Plans & Pricing — ${COMPANY_NAME}`,
        description: `Explore our flexible pricing options — from instant AI business plan generation to full expert-written plans with investor-ready presentation.`,
        keywords: [
            "business plan pricing",
            "AI business plan generator",
            "expert-written business plan",
            "investor deck cost",
            "24-hour business plan",
        ],
        canonical: "/pricing",
        ogImage: {
            title: `${COMPANY_NAME} Pricing`,
            description: "Choose your perfect business plan package.",
            bg: "#0a2540",
            color: "#ffffff",
        },
    },

    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "Choose Your Business Plan Package",
            highlight: "Professional Results — Fast Delivery",
            description: `${COMPANY_NAME} offers flexible options for every entrepreneur.  
Whether you need a quick AI draft or a full expert-written plan with investor deck, we make business planning simple, transparent, and professional.`,
            image: "image19",
            align: "right",
        },

        // 💡 INTRO
        {
            type: "custom",
            component: "InfoBlock",
            icon: "💼",
            title: "Designed for Every Stage of Business",
            description: `From first ideas to investment rounds, ${COMPANY_NAME} has a plan that fits your journey.  
All plans include editing rights, access to our dashboard, and optional expert consultation.`,
            align: "center",
        },

        // 💰 PRICING GRID
        {
            type: "grid",
            columns: 3,
            gap: "2rem",
            cards: [
                {
                    type: "pricing",
                    variant: "starter",
                    title: "AI Instant Plan",
                    price: "€9",
                    tokens: 900,
                    badgeTop: "Instant",
                    description:
                        "Generate your business plan in seconds with our AI-powered generator. Perfect for quick ideas or early drafts.",
                    features: [
                        "Instant generation",
                        "Editable format",
                        "Multiple languages",
                        "Unlimited revisions",
                    ],
                    buttonText: "Start with AI",
                    buttonLink: "/checkout?plan=ai",
                },
                {
                    type: "pricing",
                    variant: "pro",
                    title: "Expert 24h Plan",
                    price: "€20",
                    tokens: 2000,
                    badgeTop: "24-Hour Delivery",
                    description:
                        "Get a complete, investor-ready business plan written and reviewed by professionals within 24 hours.",
                    features: [
                        "Market & competitor analysis",
                        "3-year financial forecast",
                        "Editable PDF & DOCX",
                        "Personal revision support",
                    ],
                    buttonText: "Order Expert Plan",
                    buttonLink: "/checkout?plan=expert",
                },
                {
                    type: "pricing",
                    variant: "premium",
                    title: "Investor Pack",
                    price: "€50",
                    tokens: 5000,
                    badgeTop: "Complete Package",
                    description:
                        "All-in-one: full business plan + investor pitch deck + design layout. Ideal for fundraising and presentations.",
                    features: [
                        "Business plan + Pitch deck",
                        "Branded design templates",
                        "Investor-ready presentation",
                        "Expert revisions included",
                    ],
                    buttonText: "Get Full Pack",
                    buttonLink: "/checkout?plan=premium",
                },
            ],
        },

        // 🧩 Custom Plan section
        {
            type: "section",
            title: "Need something custom?",
            description: "We can tailor a package for your exact goals.",
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Custom Plan for You",
                description:
                    "Mix and match AI writing, expert review, and design assistance for a bespoke experience.",
                bullets: ["Flexible scope", "Personal contact", "Dynamic pricing"],
            },
            right: {
                type: "pricing",
                variant: "custom",
                title: "Custom Plan",
                price: "dynamic",
                tokens: 0,
                badgeTop: "Flexible",
                description: "Enter your budget, and we’ll match the right solution.",
                features: ["Flexible pricing", "Mix AI & Expert", "Fast setup"],
                buttonText: "Create Your Plan",
                buttonLink: "/checkout?plan=custom",
            },
        },

        // 💎 WHY UPGRADE (human-first)
        {
            type: "section",
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Why Choose Expert Assistance?",
                description: `AI can create structure — but only human specialists can turn your idea into a credible, investor-ready document.  
Our experts review data, validate numbers, and make sure your plan truly stands out.`,
                bullets: [
                    "Human insight and storytelling",
                    "Tailored financial logic",
                    "Clear structure for investors",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image14",
                alt: "Expert analyzing data",
            },
        },

        // 🧠 AI ASSISTANCE BANNER
        {
            type: "custom",
            component: "MissionBanner",
            title: "AI-Powered Speed, Human-Driven Quality",
            description: `Our AI assists with structure and research — but every expert plan is written, checked, and approved by professionals.  
This combination saves time without losing credibility.`,
            image: "image1",
        },

        // ❓ FAQ
        {
            type: "faq",
            items: [
                {
                    question: "What’s the difference between AI and Expert Plans?",
                    answer:
                        "AI generates your plan instantly, ideal for drafts. Expert Plans are written manually by professionals who analyze your idea, add market insights, and deliver in 24 hours.",
                },
                {
                    question: "Do you provide investor pitch decks?",
                    answer:
                        "Yes. The Investor Pack includes a full pitch deck designed for fundraising presentations.",
                },
                {
                    question: "Can I edit my plan after delivery?",
                    answer:
                        "Absolutely. All plans are fully editable and come in PDF and DOCX formats for your convenience.",
                },
                {
                    question: "What if I need ongoing updates?",
                    answer:
                        "We offer monthly business review packages and consulting support. Contact us for subscription options.",
                },
                {
                    question: "Is my information confidential?",
                    answer:
                        "Yes. All client data is encrypted and handled under strict confidentiality policies.",
                },
            ],
        },

        // 🚀 FINAL CTA
        {
            type: "custom",
            component: "MissionBanner",
            title: "Start Your Plan Today",
            description: `Let our experts craft your professional business plan within 24 hours — or generate a draft instantly with AI.  
Whichever path you choose, ${COMPANY_NAME} ensures real results.`,
            image: "ctaPricing",
        },
    ],
};

export default schema;
