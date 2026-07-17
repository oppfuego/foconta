import React from "react";
import Link from "next/link";
import {
    getServiceBySlug,
    getServicePlans,
    type ServicePlan,
} from "@/resources/services";
import { TOKENS_TO_CURRENCY_RATE } from "@/resources/pricing";
import styles from "./ServiceLanding.module.scss";

const PLAN_META: Record<ServicePlan, { label: string; note: string }> = {
    ai: { label: "AI Draft", note: "Generated instantly by AI" },
    reviewed: { label: "Expert-Written", note: "Prepared by a human expert" },
};

function euro(tokens: number): string {
    return `€${(tokens * TOKENS_TO_CURRENCY_RATE).toFixed(2)}`;
}

export default function ServiceLanding({ slug }: { slug: string }) {
    const service = getServiceBySlug(slug);
    if (!service) return null;

    const plans = getServicePlans(service);

    return (
        <article className={styles.wrapper}>
            <nav className={styles.crumbs}>
                <Link href="/services">Services</Link>
                <span aria-hidden> / </span>
                <span>{service.title}</span>
            </nav>

            <header className={styles.hero}>
                <span className={styles.icon} aria-hidden>{service.icon}</span>
                <h1 className={styles.title}>{service.title}</h1>
                <p className={styles.lead}>{service.longDesc}</p>
                <Link href={`/order/${service.slug}`} className={styles.cta}>
                    Order now
                </Link>
            </header>

            <section className={styles.plans}>
                {plans.map((p) => (
                    <div key={p} className={styles.plan}>
                        <span className={styles.planLabel}>{PLAN_META[p].label}</span>
                        <span className={styles.planNote}>{PLAN_META[p].note}</span>
                        <span className={styles.planPrice}>
                            {service.prices[p]} tokens
                            <small>{euro(service.prices[p] ?? 0)}</small>
                        </span>
                    </div>
                ))}
            </section>

            <div className={styles.columns}>
                <section className={styles.block}>
                    <h2 className={styles.blockTitle}>What you get</h2>
                    <ul className={styles.list}>
                        {service.deliverables.map((d) => (
                            <li key={d}>{d}</li>
                        ))}
                    </ul>
                </section>

                <section className={styles.block}>
                    <h2 className={styles.blockTitle}>What we need from you</h2>
                    <ul className={styles.list}>
                        {service.fields
                            .filter((f) => f.name !== "instructions")
                            .map((f) => (
                                <li key={f.name}>{f.label}</li>
                            ))}
                    </ul>
                </section>
            </div>

            <div className={styles.footerCta}>
                <Link href={`/order/${service.slug}`} className={styles.cta}>
                    Start your {service.title.toLowerCase()}
                </Link>
            </div>
        </article>
    );
}
