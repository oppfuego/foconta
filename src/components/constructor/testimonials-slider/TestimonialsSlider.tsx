"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MdStar, MdChevronLeft, MdChevronRight } from "react-icons/md";
import styles from "./TestimonialsSlider.module.scss";
import { media as mediaMap } from "@/resources/media";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";

interface Testimonial {
    name: string;
    role?: string;
    image?: string;
    text: string;
    rating?: number;
}

interface Props {
    title?: string;
    description?: string;
    testimonials: Testimonial[];
}

export default function TestimonialsSlider({ title, description, testimonials }: Props) {
    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState(1);
    const reduce = useReducedMotion();
    const pausedRef = useRef(false);
    const count = testimonials.length;

    const go = (n: number) => {
        setDir(n > index || (index === count - 1 && n === 0) ? 1 : -1);
        setIndex((n + count) % count);
    };

    useEffect(() => {
        if (reduce || count <= 1) return;
        const id = setInterval(() => {
            if (pausedRef.current) return;
            setDir(1);
            setIndex((i) => (i + 1) % count);
        }, 6500);
        return () => clearInterval(id);
    }, [count, reduce]);

    const current = testimonials[index];

    let srcValue: string | undefined;
    if (current?.image) {
        const key = current.image as keyof typeof mediaMap;
        const m = mediaMap[key];
        if (typeof m === "string") srcValue = m;
        else srcValue = (m as { src?: string })?.src;
    }

    const rating = current?.rating ?? 5;

    return (
        <section
            className={styles.section}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
        >
            <SectionHeading
                eyebrow="Loved by founders"
                title={title}
                description={description}
                align="center"
            />

            <div className={styles.stage}>
                <div className={styles.stageGlow} aria-hidden />

                <button
                    className={`${styles.navButton} ${styles.left}`}
                    onClick={() => go(index - 1)}
                    aria-label="Previous testimonial"
                    type="button"
                >
                    <MdChevronLeft size={24} />
                </button>

                <div className={styles.slider}>
                    <AnimatePresence mode="wait" custom={dir}>
                        <motion.article
                            key={index}
                            className={styles.card}
                            drag={reduce || count <= 1 ? false : "x"}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(_, info) => {
                                if (Math.abs(info.offset.x) < 60) return;
                                if (info.offset.x < 0) go(index + 1);
                                else go(index - 1);
                            }}
                            custom={dir}
                            initial={reduce ? undefined : (d) => ({ opacity: 0, x: (d as number) * 40, scale: 0.98 })}
                            animate={reduce ? undefined : { opacity: 1, x: 0, scale: 1 }}
                            exit={reduce ? undefined : (d) => ({ opacity: 0, x: -(d as number) * 40, scale: 0.98 })}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className={styles.quoteMark} aria-hidden>“</span>

                            <p className={styles.text}>{current.text}</p>

                            <div className={styles.foot}>
                                <div className={styles.who}>
                                    {srcValue && (
                                        <span className={styles.avatarRing}>
                                            <Image
                                                src={srcValue}
                                                alt={current.name}
                                                width={56}
                                                height={56}
                                                className={styles.avatar}
                                            />
                                        </span>
                                    )}
                                    <div>
                                        <div className={styles.name}>{current.name}</div>
                                        {current.role && <div className={styles.role}>{current.role}</div>}
                                    </div>
                                </div>

                                <div className={styles.stars} aria-label={`${rating} out of 5`}>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <MdStar
                                            key={i}
                                            className={i < rating ? styles.starOn : styles.starOff}
                                        />
                                    ))}
                                </div>
                            </div>

                            <span className={styles.cardBorder} aria-hidden />
                        </motion.article>
                    </AnimatePresence>
                </div>

                <button
                    className={`${styles.navButton} ${styles.right}`}
                    onClick={() => go(index + 1)}
                    aria-label="Next testimonial"
                    type="button"
                >
                    <MdChevronRight size={24} />
                </button>
            </div>

            <div className={styles.dots} role="tablist" aria-label="Testimonials">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => go(i)}
                        className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                        aria-label={`Testimonial ${i + 1}`}
                        aria-selected={i === index}
                        role="tab"
                        type="button"
                    />
                ))}
            </div>
        </section>
    );
}
