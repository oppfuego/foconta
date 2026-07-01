"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./ValuesIcons.module.scss";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";

interface ValueItem {
    icon: string;
    title: string;
    description?: string;
    text?: string;
}

interface Props {
    title?: string;
    description?: string;
    values: ValueItem[];
}

const cardV = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
};

const ValuesIcons: React.FC<Props> = ({ title, description, values }) => {
    const reduce = useReducedMotion();

    return (
        <section className={styles.section}>
            <SectionHeading
                eyebrow="Why teams love it"
                title={title}
                description={description}
                align="center"
            />

            <div className={styles.grid}>
                {values.map((v, i) => (
                    <motion.article
                        key={v.title}
                        className={styles.card}
                        initial={reduce ? undefined : "hidden"}
                        whileInView={reduce ? undefined : "visible"}
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardV}
                        transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className={styles.border} aria-hidden />
                        <div className={styles.iconChip}>
                            <span className={styles.iconGlow} aria-hidden />
                            <span className={styles.iconEmoji} aria-hidden>{v.icon}</span>
                        </div>
                        <h3 className={styles.title}>{v.title}</h3>
                        <p className={styles.desc}>{v.description ?? v.text}</p>
                        <span className={styles.corner} aria-hidden />
                    </motion.article>
                ))}
            </div>
        </section>
    );
};

export default ValuesIcons;
