import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const financialForecastSchema: PageSchema = {
    meta: {
        title: `Financial Forecasting Without an MBA — ${COMPANY_NAME}`,
        description: `Learn how to create realistic financial projections even without financial background — with templates and examples.`,
        keywords: [
            "financial forecast",
            "business plan finance",
            "revenue projection",
            "startup cashflow",
        ],
        canonical: "/resources/financial-forecast",
    },

    blocks: [
        {
            type: "custom",
            component: "HeroSection",
            title: "Financial Forecasting Without an MBA",
            highlight: "Simple. Accurate. Actionable.",
            description: `Finance doesn’t have to be scary.  
${COMPANY_NAME} experts break down forecasting into easy, data-backed steps — even for beginners.`,
            image: "image12",
            align: "right",
        },

        {
            type: "custom",
            component: "Timeline",
            title: "Forecast in 5 Simple Steps",
            steps: [
                { title: "1. Define Revenue Streams", description: "List all possible sources of income for your business." },
                { title: "2. Estimate Costs", description: "Include both fixed and variable costs — from salaries to marketing." },
                { title: "3. Calculate Gross Margin", description: "Subtract costs from revenue to find your true profitability." },
                { title: "4. Project Cash Flow", description: "Track monthly inflows/outflows to predict liquidity needs." },
                { title: "5. Add Realism", description: "Use modest growth assumptions — investors prefer realistic plans." },
            ],
        },

        {
            type: "custom",
            component: "ValuesIcons",
            title: "Our Key Forecasting Principles",
            values: [
                { icon: "📊", title: "Clarity Over Complexity", text: "Use 3–5 years of projections, not 10." },
                { icon: "📉", title: "Data-Based Assumptions", text: "Back every figure with logic, not hope." },
                { icon: "📈", title: "Visual Forecasting", text: "Graphs communicate faster than tables." },
            ],
        },

    ],
};

export default financialForecastSchema;
