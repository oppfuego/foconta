"use client";
import React, { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import styles from "./Card.module.scss";

interface CardProps {
    image: string | StaticImageData;
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
}

const Card: React.FC<CardProps> = ({ image, title, description, buttonText, buttonLink }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const reduce = useReducedMotion();
    const inView = useInView(ref, { once: true, amount: 0.25 });

    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);
    const sx = useSpring(px, { stiffness: 220, damping: 22, mass: 0.4 });
    const sy = useSpring(py, { stiffness: 220, damping: 22, mass: 0.4 });
    const rotY = useTransform(sx, [0, 1], [-4, 4]);
    const rotX = useTransform(sy, [0, 1], [4, -4]);
    const imgX = useTransform(sx, [0, 1], ["-2%", "2%"]);
    const imgY = useTransform(sy, [0, 1], ["-2%", "2%"]);

    const onMove = (e: React.MouseEvent) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        px.set(nx);
        py.set(ny);
        ref.current.style.setProperty("--gx", `${nx * 100}%`);
        ref.current.style.setProperty("--gy", `${ny * 100}%`);
    };
    const onLeave = () => {
        px.set(0.5);
        py.set(0.5);
    };

    const imgSrc = typeof image === "string" ? image : image;

    return (
        <motion.div
            ref={ref}
            className={styles.card}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
                rotateY: reduce ? 0 : rotY,
                rotateX: reduce ? 0 : rotX,
                transformStyle: "preserve-3d",
            }}
        >
            <span className={styles.border} aria-hidden />
            <div className={styles.imageWrapper}>
                <motion.div
                    className={styles.imageMask}
                    initial={reduce ? undefined : { clipPath: "inset(0 0 100% 0)" }}
                    animate={inView ? { clipPath: "inset(0 0 0% 0)" } : {}}
                    transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                >
                    <motion.div
                        className={styles.imageInner}
                        style={{ x: reduce ? 0 : imgX, y: reduce ? 0 : imgY }}
                    >
                        <Image
                            src={imgSrc as StaticImageData}
                            alt={title}
                            fill
                            sizes="(max-width: 700px) 100vw, 33vw"
                            className={styles.image}
                            style={{ objectFit: "cover" }}
                        />
                    </motion.div>
                </motion.div>
                <div className={styles.imageOverlay} aria-hidden />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                {buttonText && buttonLink && (
                    <Link href={buttonLink} className={styles.cta}>
                        <span>{buttonText}</span>
                        <FaArrowRight />
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

export default Card;
