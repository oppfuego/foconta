"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./SectionHeading.module.scss";

type Props = {
    eyebrow?: string;
    title?: string;
    description?: string;
    align?: "left" | "center";
    tone?: "light" | "dark";
    accent?: React.ReactNode;
    className?: string;
};

export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = "center",
    tone = "light",
    accent,
    className,
}: Props) {
    const reduce = useReducedMotion();

    if (!title && !description && !eyebrow) return null;

    return (
        <motion.div
            className={`${styles.wrap} ${styles[align]} ${styles[tone]} ${className || ""}`}
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            {(eyebrow || accent) && (
                <div className={styles.eyebrowRow}>
                    {accent}
                    {eyebrow && (
                        <span className={styles.eyebrow}>
                            <span className={styles.eyebrowDot} />
                            {eyebrow}
                        </span>
                    )}
                </div>
            )}
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.desc}>{description}</p>}
        </motion.div>
    );
}
