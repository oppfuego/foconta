import type { Metadata } from "next";
import ServicesCatalog from "@/components/features/services-catalog/ServicesCatalog";
import { COMPANY_NAME } from "@/resources/constants";

export const metadata: Metadata = {
    title: `Our Services — ${COMPANY_NAME}`,
    description: `Fixed-price academic and professional writing services from ${COMPANY_NAME}: research papers, dissertations, case studies, white papers, SEO content and more — AI-generated or expert-written.`,
    alternates: { canonical: "/services" },
};

export default function Page() {
    return <ServicesCatalog />;
}
