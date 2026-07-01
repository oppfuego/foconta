import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";

const executiveSummarySchema: PageSchema = {
    meta: {
        title: `How to Write a Winning Executive Summary — ${COMPANY_NAME}`,
        description: `Learn how to write a compelling executive summary that attracts investors and partners in minutes.`,
        keywords: [
            "executive summary tips",
            "business plan introduction",
            "investor pitch guide",
            "how to write summary",
        ],
        canonical: "/resources/executive-summary",
    },

    blocks: [
        {
            type: "custom",
            component: "HeroSection",
            title: "How to Write a Winning Executive Summary",
            highlight: "Capture Attention in 5 Sentences",
            description: `The executive summary is the first — and often the only — section investors read.  
${COMPANY_NAME} experts share how to structure it to instantly communicate value.`,
            image: "image8",
            align: "right",
            showTrustBadge: true,
            eyebrowRotator: ["Guide · 8 min read", `${COMPANY_NAME} Academy`],
            panel: {
                docName: "executive-summary.pdf",
                section1: {
                    label: "Structure",
                    rows: [82, 88, 76, 90, 68],
                },
                section2: {
                    label: "Impact by Section",
                    bars: [55, 70, 85, 96, 74],
                },
                section3: {
                    label: "Investor Attention",
                    points: [95, 82, 72, 65, 60, 58, 55, 50],
                },
                stats: [
                    { value: "5", label: "Essential steps" },
                    { value: "8 min", label: "Read time" },
                ],
                chip: "Concise & clear",
            },
        },

        {
            type: "custom",
            component: "InfoBlock",
            title: "What Is an Executive Summary?",
            description: `It’s a concise overview of your business plan — summarizing your goals, mission, market, and expected results in one page.`,
            bullets: [
                "Appears first but written last",
                "Summarizes your entire plan",
                "Should be short, clear, and confident",
            ],
        },

        {
            type: "custom",
            component: "Timeline",
            title: "Step-by-Step Structure",
            steps: [
                {
                    title: "1. Start With the Problem",
                    description: "Describe the pain your target audience faces — keep it real and relatable.",
                },
                {
                    title: "2. Present the Solution",
                    description: "Explain how your business solves that problem uniquely and efficiently.",
                },
                {
                    title: "3. Show Market Potential",
                    description: "Include short data or metrics that highlight real market demand.",
                },
                {
                    title: "4. Define the Business Model",
                    description: "How does your company make money? Summarize in one or two lines.",
                },
                {
                    title: "5. End With a Call to Action",
                    description: "Mention what you seek — investment, partnership, or collaboration.",
                },
            ],
        },

        {
            type: "custom",
            component: "ValuesIcons",
            title: "Pro Tips from Our Experts",
            values: [
                {icon: "🧠", title: "Clarity Wins", text: "Avoid buzzwords. Write as if explaining to a smart friend."},
                {icon: "📊", title: "Use Numbers", text: "Even one key figure (ROI, growth %) adds credibility."},
                {icon: "💬", title: "Be Personal", text: "Your passion should show — investors fund people first."},
            ],
        },

    ],
};

export default executiveSummarySchema;
