"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./MissionBanner.module.scss";

interface MissionBannerProps {
    title: string;
    description: string;
    image?: string | StaticImageData;
}

const MissionBanner: React.FC<MissionBannerProps> = ({ title, description, image }) => {
    const reduce = useReducedMotion();

    return (
        <section className={styles.banner}>
            <div className={styles.aurora} aria-hidden>
                <span className={styles.blob1} />
                <span className={styles.blob2} />
                <span className={styles.grid} />
            </div>

            <div className={styles.inner}>
                <motion.div
                    className={styles.content}
                    initial={reduce ? undefined : { opacity: 0, y: 32 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.eyebrow}>
                        <span className={styles.eyebrowDot} />
                        Your plan is one click away
                    </span>

                    <h2 className={styles.title}>
                        <span className={styles.titleText}>{title}</span>
                    </h2>

                    <p className={styles.desc}>{description}</p>
                </motion.div>

                {image && (
                    <motion.div
                        className={styles.mediaWrap}
                        initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    >
                        <div className={styles.mediaGlow} aria-hidden />
                        <div className={styles.mediaFrame}>
                            <Image
                                src={image as StaticImageData}
                                alt=""
                                fill
                                sizes="(max-width: 900px) 100vw, 40vw"
                                className={styles.image}
                                style={{ objectFit: "cover" }}
                            />
                            <span className={styles.mediaBorder} aria-hidden />
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default MissionBanner;
