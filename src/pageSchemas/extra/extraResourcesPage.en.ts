import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const resourcesSchema: PageSchema = {
    meta: {
        title: `Resources & Guides — ${COMPANY_NAME}`,
        description: `Learn how to build investor-ready business plans, analyze markets, and present your startup like a pro. Free guides, templates, and expert tips from ${COMPANY_NAME}.`,
        keywords: [
            "business plan templates",
            "startup funding guide",
            "market research tips",
            "investor presentation help",
            "entrepreneur resources",
        ],
        canonical: "/resources",
        ogImage: {
            title: `${COMPANY_NAME} Business Academy`,
            description: "Free guides and expert advice for entrepreneurs.",
            bg: "#0a2540",
            color: "#ffffff",
        },
    },

    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "Learn. Build. Grow.",
            highlight: `${COMPANY_NAME} Business Academy`,
            description: `We believe every entrepreneur deserves access to high-quality knowledge.  
Explore expert insights, ready-to-use templates, and case-based lessons that help you plan smarter.`,
            image: "image2",
            align: "right",
            showTrustBadge: true,
            eyebrowRotator: ["Business Academy", "Updated weekly"],
            panel: {
                docName: "academy.pdf",
                section1: {
                    label: "In This Issue",
                    rows: [92, 78, 86],
                },
                section2: {
                    label: "Topics",
                    bars: [70, 88, 62, 96, 74],
                },
                section3: {
                    label: "Reader Engagement",
                    points: [25, 38, 50, 62, 70, 80, 88, 96],
                },
                stats: [
                    { value: "3", label: "In-depth guides" },
                    { value: "Weekly", label: "Fresh insights" },
                ],
                chip: "New issue live",
            },
        },

        // 📚 FEATURED ARTICLES
        {
            type: "grid",
            columns: 3,
            gap: "2rem",
            cards: [
                {
                    image: "image19",
                    title: "How to Write a Winning Executive Summary",
                    description:
                        "Learn what investors actually read first — and how to capture their attention in 5 sentences.",
                    buttonText: "Read Article",
                    buttonLink: "/resources/executive-summary",
                },
                {
                    image: "image20",
                    title: "Market Analysis Made Simple",
                    description:
                        "A step-by-step framework for researching your competitors and defining your target audience.",
                    buttonText: "View Guide",
                    buttonLink: "/resources/market-analysis",
                },
                {
                    image: "image21",
                    title: "Financial Forecasting Without an MBA",
                    description:
                        "Our experts explain how to project revenue, costs, and profits — even if you’re not a finance expert.",
                    buttonText: "Read Tutorial",
                    buttonLink: "/resources/financial-forecast",
                },
            ],
        },

        // 🎯 INFOBLOCK — WHY LEARN WITH US
        {
            type: "section",
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Created by Real Business Analysts",
                description: `${COMPANY_NAME} Academy combines the experience of consultants, investors, and educators to bring you practical tools that actually work.`,
                bullets: [
                    "Step-by-step frameworks from experts",
                    "Ready-to-use templates",
                    "AI tools for faster insights",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image13",
                alt: "Expert teaching entrepreneurs",
            },
        },

        // 📥 CTA
        {
            type: "custom",
            component: "MissionBanner",
            title: "Access Exclusive Templates & Insights",
            description: `Join our newsletter and receive free resources, case studies, and early access to new AI tools for business planning.`,
            image: "image11",
        },
    ],
};

export default resourcesSchema;
