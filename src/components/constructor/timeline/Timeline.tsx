"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import styles from "./Timeline.module.scss";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";

interface Step {
    title: string;
    description: string;
}

interface TimelineProps {
    title?: string;
    steps: Step[];
}

const Timeline: React.FC<TimelineProps> = ({ title, steps }) => {
    const reduce = useReducedMotion();
    const trackRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start 80%", "end 30%"],
    });

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section className={styles.section}>
            <SectionHeading
                eyebrow="Behind the scenes"
                title={title}
                description="Every step is human-supervised — you focus on the idea, we handle the craft."
                align="center"
            />

            <div ref={trackRef} className={styles.track}>
                {/* base rail */}
                <div className={styles.rail} aria-hidden />
                {/* progress rail */}
                <motion.div
                    className={styles.railProgress}
                    style={{ height: reduce ? "100%" : height }}
                    aria-hidden
                />

                <ol className={styles.list}>
                    {steps.map((step, i) => {
                        const side = i % 2 === 0 ? "left" : "right";
                        return (
                            <li key={i} className={`${styles.step} ${styles[side]}`}>
                                <motion.span
                                    className={styles.node}
                                    initial={reduce ? undefined : { scale: 0, opacity: 0 }}
                                    whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
                                    viewport={{ once: true, amount: 0.6 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    aria-hidden
                                >
                                    <span className={styles.nodePulse} />
                                    <span className={styles.nodeCore}>
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </motion.span>

                                <motion.div
                                    className={styles.card}
                                    initial={reduce ? undefined : { opacity: 0, y: 32, x: side === "left" ? -24 : 24 }}
                                    whileInView={reduce ? undefined : { opacity: 1, y: 0, x: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className={styles.cardBorder} aria-hidden />
                                    <div className={styles.cardHead}>
                                        <span className={styles.cardIndex}>Step {i + 1}</span>
                                        <span className={styles.cardDot} aria-hidden />
                                    </div>
                                    <h3 className={styles.cardTitle}>{step.title}</h3>
                                    <p className={styles.cardDesc}>{step.description}</p>
                                </motion.div>
                            </li>
                        );
                    })}
                </ol>

                <span className={styles.trackTop} aria-hidden />
                <span className={styles.trackBottom} aria-hidden />
            </div>
        </section>
    );
};

export default Timeline;
