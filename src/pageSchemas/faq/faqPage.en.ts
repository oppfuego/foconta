import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/resources/constants";

const faqSchema: PageSchema = {
    meta: {
        title: `FAQ — ${COMPANY_NAME}`,
        description: `Frequently asked questions about ${COMPANY_NAME}: how expert business plans work, AI assistance, delivery time, and confidentiality.`,
        keywords: [
            `${COMPANY_NAME} FAQ`,
            "business plan help",
            "expert 24h service",
            "AI business plan",
            "investor pitch deck",
            "custom business plan",
            "how it works",
        ],
        canonical: "/faq",
        ogImage: {
            title: `${COMPANY_NAME} FAQ`,
            description: `Answers to the most common questions about creating and receiving your business plan with ${COMPANY_NAME}.`,
            bg: "#0a2540",
            color: "#ffffff",
        },
    },

    blocks: [
        {
            type: "custom",
            component: "HeroSection",
            title: "Answers to Every Question",
            highlight: "Everything About Working With Us",
            description: `Everything you need to know about creating and receiving your business plan with ${COMPANY_NAME} — how our experts work, how the AI plan compares, delivery times, and how we keep your idea private.`,
            primaryCta: { text: "Jump to Questions", link: "#faq" },
            secondaryCta: { text: "Contact Support", link: "/contact-us" },
            align: "right",
            showTrustBadge: true,
            eyebrowRotator: ["Help center", "10+ common questions"],
            panel: {
                docName: "answers.pdf",
                section1: {
                    label: "Popular Questions",
                    rows: [88, 74, 92, 68, 80],
                },
                section2: {
                    label: "Topics Covered",
                    bars: [72, 60, 90, 55, 78, 66],
                },
                section3: {
                    label: "Answer Match",
                    points: [30, 45, 60, 72, 82, 88, 92, 95],
                },
                stats: [
                    { value: "10+", label: "Verified answers" },
                    { value: "< 12h", label: "Support reply" },
                ],
                chip: "Answer found",
            },
        },
        {
            type: "faq",
            items: [
                {
                    question: `What is ${COMPANY_NAME}?`,
                    answer: `${COMPANY_NAME} is a business planning platform where experts create professional, investor-ready business plans within 24 hours — supported by AI tools for faster research and data accuracy.`,
                },
                {
                    question: "Who writes my business plan?",
                    answer:
                        "Every plan is written by a certified business analyst with real-world consulting experience. Our team combines strategic insight, market research, and financial modeling to deliver credible business documents.",
                },
                {
                    question: "How long does it take to receive my plan?",
                    answer:
                        "Most expert plans are delivered within 24 hours after you submit your project brief. Larger or custom requests (for example, multi-market analysis or pitch decks) may take up to 48 hours.",
                },
                {
                    question: "What’s the difference between the AI Plan and Expert Plan?",
                    answer:
                        "The AI Plan generates an instant draft — great for quick ideas or testing. The Expert Plan includes full human writing, market validation, and financial forecasting — ideal for investors or grants.",
                },
                {
                    question: "Can I edit my business plan after delivery?",
                    answer:
                        "Yes. All plans come in editable PDF and DOCX formats. You can easily update text, figures, or add new sections at any time.",
                },
                {
                    question: "Is my information kept confidential?",
                    answer: `${COMPANY_NAME} follows strict data protection policies (GDPR compliant). All submitted ideas and documents remain private and are never shared with third parties.`,
                },
                {
                    question: "Can you create a plan in my language or local market?",
                    answer:
                        "Absolutely. We support multiple languages and tailor your plan for your specific country’s market structure, legal norms, and investor expectations.",
                },
                {
                    question: "Do you provide investor pitch decks?",
                    answer:
                        "Yes. The Investor Pack includes a full PowerPoint or PDF presentation designed to summarize your business plan visually — perfect for meetings or fundraising.",
                },
                {
                    question: "Can I request changes or revisions?",
                    answer:
                        "Yes. We provide one free revision with every order, and additional adjustments are available through our continuous support service.",
                },
                {
                    question: "How can I contact support?",
                    answer: `You can reach our support team any time at ${COMPANY_EMAIL} or through the contact form on our website. We reply within 12 hours on business days.`,
                },
            ],
        },
    ],
};

export default faqSchema;
