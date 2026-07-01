"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { media as mediaMap } from "@/resources/media";
import type { StaticImageData } from "next/image";
import styles from "./VideoDemo.module.scss";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";
import { COMPANY_NAME } from "@/resources/constants";

interface Props {
    title?: string;
    description?: string;
    video: string;
}

const VideoDemo: React.FC<Props> = ({ title, description, video }) => {
    const resolvedVideo = (mediaMap as Record<string, string | StaticImageData>)[video];
    const src =
        typeof resolvedVideo === "string"
            ? resolvedVideo
            : (resolvedVideo as StaticImageData)?.src || "";

    const wrapRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const inView = useInView(wrapRef, { once: true, amount: 0.3 });
    const reduce = useReducedMotion();
    const [playing, setPlaying] = useState(false);

    const onPlay = () => {
        if (!videoRef.current) return;
        videoRef.current.play();
        setPlaying(true);
    };

    return (
        <section className={styles.section}>
            <SectionHeading
                eyebrow="Watch the flow"
                title={title}
                description={description}
                align="center"
            />

            <motion.div
                ref={wrapRef}
                className={styles.frameWrap}
                initial={reduce ? undefined : { opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={styles.glow} aria-hidden />

                <div className={styles.device}>
                    <div className={styles.chrome}>
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                        <span className={styles.chromeLabel}>{(COMPANY_NAME || "site").toLowerCase()} demo</span>
                    </div>

                    <div className={styles.videoWrap}>
                        <video
                            ref={videoRef}
                            className={styles.video}
                            src={src}
                            playsInline
                            loop
                            muted
                            preload="metadata"
                            controls={playing}
                        />

                        {!playing && (
                            <button
                                type="button"
                                className={styles.playBtn}
                                onClick={onPlay}
                                aria-label="Play demo"
                            >
                                <span className={styles.playPulse} aria-hidden />
                                <span className={styles.playCore}>
                                    <FaPlay />
                                </span>
                                <span className={styles.playLabel}>Play demo</span>
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.reflection} aria-hidden />
            </motion.div>
        </section>
    );
};

export default VideoDemo;
