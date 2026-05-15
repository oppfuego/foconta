import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const marketAnalysisSchema: PageSchema = {
    meta: {
        title: `Market Analysis Made Simple — ${COMPANY_NAME}`,
        description: `A clear framework to understand your market, find competitors, and define your target audience for your business plan.`,
        keywords: [
            "market analysis",
            "competitive research",
            "target audience business plan",
            "business plan market data",
        ],
        canonical: "/resources/market-analysis",
    },

    blocks: [
        {
            type: "custom",
            component: "HeroSection",
            title: "Market Analysis Made Simple",
            highlight: "Understand. Measure. Strategize.",
            description: `A strong business plan starts with data.  
Learn how to find, analyze, and present your market in a way that investors understand.`,
            image: "image9",
            align: "left",
        },

        {
            type: "custom",
            component: "InfoBlock",
            title: "Why Market Analysis Matters",
            description: `Investors look for clarity — not just numbers. Market analysis proves you know your audience, your competition, and your growth potential.`,
            bullets: [
                "Clarifies your opportunity size",
                "Validates your product-market fit",
                "Shows awareness of competition",
            ],
        },

        {
            type: "custom",
            component: "Timeline",
            title: "Your 5-Step Research Framework",
            steps: [
                { title: "1. Define Your Market", description: "Describe who your customers are and what problem you solve." },
                { title: "2. Segment the Audience", description: "Split your audience into clear groups by demographics or needs." },
                { title: "3. Analyze Competitors", description: "Identify top 3–5 competitors, compare pricing, and unique value." },
                { title: "4. Gather Market Data", description: "Use public sources, surveys, and reports for reliable insights." },
                { title: "5. Summarize with Visuals", description: "Charts and graphs make data more digestible for investors." },
            ],
        },

        {
            type: "custom",
            component: "ValuesIcons",
            title: "Tools We Recommend",
            description: "Simplify your research with these free or affordable tools.",
            values: [
                { icon: "📈", title: "Google Trends", text: "Spot growth trends and seasonal demand." },
                { icon: "🔍", title: "SimilarWeb", text: "Analyze competitors’ traffic and audience sources." },
                { icon: "📊", title: "Statista", text: "Find market size data and industry insights." },
            ],
        },

    ],
};

export default marketAnalysisSchema;
