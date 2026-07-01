"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import styles from "./SelfBuildingPlan.module.scss";

/**
 * Signature hero centerpiece — a stylized document that assembles
 * itself in view. Content is fully prop-driven so the same visual
 * treatment can render page-specific data. Chart line self-draws
 * via SVG stroke-dashoffset. Animation is opacity/transform only.
 */

type PanelSection1 = { label: string; rows: number[] };            // widths in percent
type PanelSection2 = { label: string; bars: number[] };            // heights in percent (0-100)
type PanelSection3 = { label: string; points: number[] };          // Y values (0-100), rendered as a chart
type PanelStat = { value: string; label: string };

export type PanelData = {
    docName?: string;
    section1?: PanelSection1;
    section2?: PanelSection2;
    section3?: PanelSection3;
    stats?: PanelStat[];   // first 2 used
    chip?: string;
};

const DEFAULT_PANEL: Required<Omit<PanelData, "stats">> & { stats: PanelStat[] } = {
    docName: "business-plan.pdf",
    section1: { label: "Executive Summary", rows: [92, 78, 64, 84] },
    section2: { label: "Market", bars: [60, 82, 45, 92, 70] },
    section3: { label: "Financial Forecast", points: [30, 42, 38, 56, 50, 70, 66, 90] },
    stats: [
        { value: "+38%", label: "YoY revenue" },
        { value: "£2.4M", label: "Year-3 projection" },
    ],
    chip: "Plan assembled",
};

interface Props {
    panel?: PanelData;
}

export default function SelfBuildingPlan({ panel }: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });
    const reduce = useReducedMotion();
    const [drawn, setDrawn] = useState(false);

    const merged = useMemo(() => ({
        docName: panel?.docName ?? DEFAULT_PANEL.docName,
        section1: panel?.section1 ?? DEFAULT_PANEL.section1,
        section2: panel?.section2 ?? DEFAULT_PANEL.section2,
        section3: panel?.section3 ?? DEFAULT_PANEL.section3,
        stats: panel?.stats && panel.stats.length >= 1 ? panel.stats : DEFAULT_PANEL.stats,
        chip: panel?.chip ?? DEFAULT_PANEL.chip,
    }), [panel]);

    useEffect(() => {
        if (inView) setDrawn(true);
    }, [inView]);

    const enter = (delay: number) =>
        reduce
            ? { opacity: 1, y: 0 }
            : inView
            ? { opacity: 1, y: 0, transition: { delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
            : { opacity: 0, y: 18 };

    // Build the chart SVG path from the points array.
    // Points are Y values in 0..100 (0 = top / high). We render on a 300x90 viewBox
    // where visual Y goes from 10 (top / high value) to 80 (bottom / low value).
    const { linePath, areaPath, dots } = useMemo(() => {
        const pts = merged.section3.points.length >= 2
            ? merged.section3.points
            : [30, 60, 40, 80];
        const w = 300;
        const yTop = 10;
        const yBot = 80;
        const step = w / (pts.length - 1);
        const coords = pts.map((p, i) => {
            const clamped = Math.max(0, Math.min(100, p));
            // Higher input value = higher on chart (smaller Y).
            const y = yBot - ((clamped / 100) * (yBot - yTop));
            return { x: Math.round(i * step), y: Math.round(y) };
        });
        const line = coords.map((c, i) => (i === 0 ? `M${c.x},${c.y}` : `L${c.x},${c.y}`)).join(" ");
        const area = `${line} L${coords[coords.length - 1].x},90 L${coords[0].x},90 Z`;
        // Highlight up to 4 dots evenly along the path.
        const dotIdx = coords.length > 4
            ? [1, Math.floor(coords.length / 2) - 1, coords.length - 2, coords.length - 1].filter((v, i, a) => a.indexOf(v) === i)
            : coords.map((_, i) => i);
        return {
            linePath: line,
            areaPath: area,
            dots: dotIdx.map((i) => coords[i]).filter(Boolean),
        };
    }, [merged.section3.points]);

    const stat1 = merged.stats[0];
    const stat2 = merged.stats[1] ?? merged.stats[0];

    return (
        <div ref={ref} className={styles.wrap} aria-hidden="true">
            <div className={styles.glow} />
            <motion.div
                className={styles.doc}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div className={styles.docHead} animate={enter(0.05)} initial={{ opacity: 0, y: 18 }}>
                    <div className={styles.dots}>
                        <span /><span /><span />
                    </div>
                    <div className={styles.filename}>{merged.docName}</div>
                </motion.div>

                <div className={styles.body}>
                    <motion.div className={styles.sectionLabel} animate={enter(0.15)} initial={{ opacity: 0, y: 12 }}>
                        {merged.section1.label}
                    </motion.div>
                    <div className={styles.lines}>
                        {merged.section1.rows.map((w, i) => (
                            <motion.div
                                key={i}
                                className={styles.line}
                                style={{ width: `${Math.max(0, Math.min(100, w))}%` }}
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                                transition={{ delay: 0.22 + i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            />
                        ))}
                    </div>

                    <motion.div className={styles.sectionLabel} animate={enter(0.55)} initial={{ opacity: 0, y: 12 }}>
                        {merged.section2.label}
                    </motion.div>
                    <div className={styles.bars}>
                        {merged.section2.bars.map((h, i) => (
                            <motion.div
                                key={i}
                                className={styles.bar}
                                initial={{ height: 0 }}
                                animate={inView ? { height: `${Math.max(0, Math.min(100, h))}%` } : {}}
                                transition={{ delay: 0.65 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            />
                        ))}
                    </div>

                    <motion.div className={styles.sectionLabel} animate={enter(1.0)} initial={{ opacity: 0, y: 12 }}>
                        {merged.section3.label}
                    </motion.div>
                    <div className={styles.chart}>
                        <svg viewBox="0 0 300 90" preserveAspectRatio="none" width="100%" height="100%">
                            <defs>
                                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#60A5FA" />
                                    <stop offset="100%" stopColor="#2563EB" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                d={areaPath}
                                fill="url(#areaGrad)"
                                initial={{ opacity: 0 }}
                                animate={drawn ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 1.3, duration: 0.6 }}
                            />
                            <motion.path
                                d={linePath}
                                fill="none"
                                stroke="url(#lineGrad)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeDasharray="500"
                                initial={{ strokeDashoffset: 500 }}
                                animate={drawn ? { strokeDashoffset: 0 } : { strokeDashoffset: 500 }}
                                transition={{ delay: 1.1, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            />
                            {dots.map((p, i) => (
                                <motion.circle
                                    key={i}
                                    cx={p.x}
                                    cy={p.y}
                                    r="3"
                                    fill="#2563EB"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={drawn ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 1.5 + i * 0.1, duration: 0.3 }}
                                />
                            ))}
                        </svg>
                    </div>

                    <motion.div
                        className={styles.forecastPanel}
                        initial={{ opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 2.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div>
                            <div className={styles.stat}>{stat1.value}</div>
                            <div className={styles.statLabel}>{stat1.label}</div>
                        </div>
                        <div>
                            <div className={styles.stat}>{stat2.value}</div>
                            <div className={styles.statLabel}>{stat2.label}</div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* floating chip */}
            <motion.div
                className={styles.chip}
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <span className={styles.dot} /> {merged.chip}
            </motion.div>
        </div>
    );
}
