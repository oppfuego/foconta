"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import styles from "./FAQ.module.scss";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
    image?: string;
}

const FAQ: React.FC<FAQProps> = ({ items, image }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);
    const reduce = useReducedMotion();

    return (
        <section className={styles.section}>
            <SectionHeading
                eyebrow="Answers"
                title="Frequently Asked Questions"
                description="Everything you need to know before getting started."
                align="center"
            />

            <div className={image ? styles.gridWithImage : styles.grid}>
                <div className={styles.list}>
                    {items.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <motion.div
                                key={idx}
                                className={`${styles.item} ${isOpen ? styles.active : ""}`}
                                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, amount: 0.25 }}
                            >
                                <button
                                    className={styles.question}
                                    onClick={() => toggle(idx)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-panel-${idx}`}
                                    id={`faq-trigger-${idx}`}
                                    type="button"
                                >
                                    <span className={styles.qLabel}>
                                        <span className={styles.qNumber}>
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <span>{item.question}</span>
                                    </span>
                                    <span className={styles.plus} aria-hidden>
                                        <span className={`${styles.bar} ${styles.barH}`} />
                                        <span
                                            className={`${styles.bar} ${styles.barV} ${isOpen ? styles.barVOpen : ""}`}
                                        />
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="answer"
                                            id={`faq-panel-${idx}`}
                                            role="region"
                                            aria-labelledby={`faq-trigger-${idx}`}
                                            className={styles.answerWrap}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className={styles.answer}>{item.answer}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {image && (
                    <div className={styles.side}>
                        <div className={styles.imageFrame}>
                            <Image
                                src={image}
                                alt="FAQ Illustration"
                                width={500}
                                height={600}
                                className={styles.image}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FAQ;
