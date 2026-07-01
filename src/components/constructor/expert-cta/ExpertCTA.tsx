"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./ExpertCTA.module.scss";
import MagneticButton from "@/components/ui/magnetic-button/MagneticButton";

interface ExpertCTAProps {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
}

const ExpertCTA: React.FC<ExpertCTAProps> = ({
    title = "Are You a Business Expert?",
    description = "Join our platform, help entrepreneurs build their business plans, and earn money for your expertise.",
    buttonText = "Become an Expert",
    buttonLink = "/sign-up?role=expert",
}) => {
    const reduce = useReducedMotion();

    return (
        <section className={styles.band}>
            <div className={styles.aurora} aria-hidden>
                <span className={styles.blob1} />
                <span className={styles.blob2} />
                <span className={styles.grid} />
            </div>

            <motion.div
                className={styles.inner}
                initial={reduce ? undefined : { opacity: 0, y: 28 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <span className={styles.eyebrow}>
                    <span className={styles.eyebrowDot} />
                    For business experts
                </span>

                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>

                <MagneticButton as="a" href={buttonLink} className={styles.magnetic}>
                    <Link href={buttonLink} className={styles.cta}>
                        <span>{buttonText}</span>
                        <span className={styles.arrow} aria-hidden>→</span>
                    </Link>
                </MagneticButton>
            </motion.div>

            <div className={styles.hairlineTop} aria-hidden />
            <div className={styles.hairlineBottom} aria-hidden />
        </section>
    );
};

export default ExpertCTA;
