import React from "react";
import Link from "next/link";
import { SERVICES, getServicePlans, type ServiceDefinition } from "@/resources/services";
import { COMPANY_NAME } from "@/resources/constants";
import styles from "./ServicesCatalog.module.scss";

function minPrice(service: ServiceDefinition): number {
    const values = getServicePlans(service).map((p) => service.prices[p] ?? Infinity);
    return Math.min(...values);
}

function ServiceCard({ service }: { service: ServiceDefinition }) {
    return (
        <Link href={`/services/${service.slug}`} className={styles.card}>
            <span className={styles.icon} aria-hidden>{service.icon}</span>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.cardDesc}>{service.shortDesc}</p>
            <span className={styles.cardPrice}>
                from {minPrice(service)} tokens
            </span>
        </Link>
    );
}

export default function ServicesCatalog() {
    const academic = SERVICES.filter((s) => s.group === "academic");
    const professional = SERVICES.filter((s) => s.group === "professional");

    return (
        <section className={styles.wrapper}>
            <header className={styles.head}>
                <p className={styles.eyebrow}>Our Services</p>
                <h1 className={styles.title}>Professional writing, done right</h1>
                <p className={styles.lead}>
                    {COMPANY_NAME} delivers fixed-price academic and professional writing —
                    generated instantly by AI or prepared by a human expert. Choose a service,
                    tell us what you need, and get a polished result.
                </p>
            </header>

            <div className={styles.group}>
                <h2 className={styles.groupTitle}>Academic</h2>
                <div className={styles.grid}>
                    {academic.map((s) => <ServiceCard key={s.slug} service={s} />)}
                </div>
            </div>

            <div className={styles.group}>
                <h2 className={styles.groupTitle}>Professional & Business</h2>
                <div className={styles.grid}>
                    {professional.map((s) => <ServiceCard key={s.slug} service={s} />)}
                </div>
            </div>
        </section>
    );
}
