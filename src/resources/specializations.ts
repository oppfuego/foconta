export const EXPERT_SPECIALIZATIONS = [
    "Startup Business Plan",
    "Restaurant & Food Business Plan",
    "E-commerce Business Plan",
    "SaaS & Tech Business Plan",
    "Real Estate Business Plan",
    "Marketing Strategy Plan",
    "Financial & Investment Plan",
    "Franchise Business Plan",
    "Non-Profit Organization Plan",
    "Import/Export Business Plan",
    "Retail Business Plan",
    "Healthcare Business Plan",
] as const;

export type ExpertSpecialization = (typeof EXPERT_SPECIALIZATIONS)[number];
