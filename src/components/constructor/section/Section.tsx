"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Section.module.scss";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";

interface SectionProps {
    title?: string;
    description?: string;
    left?: React.ReactNode;
    right?: React.ReactNode;
    reverse?: boolean;
    gap?: string;
    align?: "center" | "start" | "end";
    justify?: "center" | "space-between" | "start" | "end";
}

const Section: React.FC<SectionProps> = ({
    title,
    description,
    left,
    right,
    reverse = false,
    gap = "2.5rem",
    align = "stretch" as never,
    justify = "center",
}) => {
    const isSingle = !left || !right;
    const reduce = useReducedMotion();

    const enter = reduce
        ? {}
        : { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 } };

    return (
        <section className={styles.wrapper}>
            {(title || description) && (
                <SectionHeading title={title} description={description} align="center" />
            )}

            <motion.div
                className={`${styles.section} ${isSingle ? styles.single : ""}`}
                style={{
                    flexDirection: reverse ? "row-reverse" : "row",
                    gap,
                    alignItems: align,
                    justifyContent: isSingle ? "center" : justify,
                }}
                {...enter}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                {left && (
                    <motion.div
                        className={styles.left}
                        data-diptych="left"
                        initial={reduce ? undefined : { opacity: 0, x: reverse ? 40 : -40 }}
                        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {left}
                    </motion.div>
                )}
                {right && (
                    <motion.div
                        className={styles.right}
                        data-diptych="right"
                        initial={reduce ? undefined : { opacity: 0, x: reverse ? -40 : 40 }}
                        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {right}
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
};

export default Section;
