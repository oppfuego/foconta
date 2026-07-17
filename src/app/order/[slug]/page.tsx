import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceOrder from "@/components/widgets/service-order/ServiceOrder";
import { getServiceBySlug } from "@/resources/services";
import { COMPANY_NAME } from "@/resources/constants";

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceBySlug(slug);
    if (!service) return { title: `Order — ${COMPANY_NAME}` };
    return {
        title: `Order ${service.title} — ${COMPANY_NAME}`,
        description: service.shortDesc,
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!getServiceBySlug(slug)) notFound();
    return <ServiceOrder slug={slug} />;
}
