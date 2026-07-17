import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLanding from "@/components/features/service-landing/ServiceLanding";
import { SERVICES, getServiceBySlug } from "@/resources/services";
import { COMPANY_NAME } from "@/resources/constants";

export function generateStaticParams() {
    return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceBySlug(slug);
    if (!service) return { title: `Services — ${COMPANY_NAME}` };
    return {
        title: `${service.title} — ${COMPANY_NAME}`,
        description: service.shortDesc,
        alternates: { canonical: `/services/${service.slug}` },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!getServiceBySlug(slug)) notFound();
    return <ServiceLanding slug={slug} />;
}
