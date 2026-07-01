"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import styles from "./InfoBlock.module.scss";
import { StaticImageData } from "next/image";

interface InfoBlockProps {
    title?: string;
    description?: string;
    icon?: string;
    image?: string | StaticImageData;
    bullets?: string[];
    align?: "left" | "center" | "right";
}

function inferVariant(title?: string): "paper" | "dark" {
    if (!title) return "paper";
    return /\bAI\b|instant/i.test(title) ? "dark" : "paper";
}

const InfoBlock: React.FC<InfoBlockProps> = ({
    title,
    description,
    icon,
    image,
    bullets,
    align = "left",
}) => {
    const variant = inferVariant(title);
    const isDark = variant === "dark";
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { once: true, amount: 0.25 });
    const reduce = useReducedMotion();

    return (
        <motion.div
            ref={ref}
            className={`${styles.card} ${styles[variant]} ${styles[align]}`}
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={styles.tag}>
                <span className={styles.tagDot} />
                {isDark ? "AI Speed" : "Human Expertise"}
            </div>

            {icon && <div className={styles.icon}>{icon}</div>}

            {image && (
                <div className={styles.imageFrame}>
                    <motion.div
                        className={styles.imageMask}
                        initial={reduce ? undefined : { clipPath: "inset(0 100% 0 0)" }}
                        animate={
                            reduce
                                ? undefined
                                : inView
                                ? { clipPath: "inset(0 0% 0 0)" }
                                : {}
                        }
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <Image
                            src={image}
                            alt={title || "Info"}
                            fill
                            sizes="(max-width: 900px) 100vw, 45vw"
                            className={styles.image}
                            style={{ objectFit: "cover" }}
                        />
                    </motion.div>
                    <div className={styles.imageOverlay} aria-hidden />
                </div>
            )}

            {title && <h3 className={styles.title}>{title}</h3>}
            {description && <p className={styles.desc}>{description}</p>}

            {bullets && bullets.length > 0 && (
                <ul className={styles.bullets}>
                    {bullets.map((b, i) => (
                        <motion.li
                            key={b}
                            className={styles.bullet}
                            initial={reduce ? undefined : { opacity: 0, x: -12 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                                duration: 0.4,
                                delay: 0.35 + i * 0.08,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <span className={styles.bulletIcon} aria-hidden>
                                <svg viewBox="0 0 20 20" width="14" height="14" fill="none">
                                    <path
                                        d="M4 10.5L8 14.5L16 6"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <span>{b}</span>
                        </motion.li>
                    ))}
                </ul>
            )}
        </motion.div>
    );
};

export default InfoBlock;
