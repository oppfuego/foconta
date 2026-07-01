"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import styles from "./TiltCard.module.scss";

type Props = {
    children: React.ReactNode;
    className?: string;
    max?: number;
    glare?: boolean;
};

export default function TiltCard({
    children,
    className,
    max = 6,
    glare = true,
}: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    const reduce = useReducedMotion();

    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);
    const sx = useSpring(px, { stiffness: 220, damping: 22, mass: 0.4 });
    const sy = useSpring(py, { stiffness: 220, damping: 22, mass: 0.4 });

    const rotY = useTransform(sx, [0, 1], [-max, max]);
    const rotX = useTransform(sy, [0, 1], [max, -max]);

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
        if (ref.current) {
            ref.current.style.setProperty("--gx", `50%`);
            ref.current.style.setProperty("--gy", `50%`);
        }
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={`${styles.tilt} ${className || ""}`}
            style={{
                rotateY: reduce ? 0 : rotY,
                rotateX: reduce ? 0 : rotX,
                transformStyle: "preserve-3d",
            }}
        >
            <div className={styles.inner}>{children}</div>
            {glare && !reduce && <div className={styles.glare} aria-hidden />}
            <span className={styles.border} aria-hidden />
        </motion.div>
    );
}
