"use client";
import React from "react";
import styles from "./StoryTimeline.module.scss";

interface TimelineStep {
    year?: string;
    title?: string;
    description: string;
}

const StoryTimeline: React.FC<{ steps: TimelineStep[] }> = ({ steps }) => {
    return (
        <div className={styles.timeline}>
            {steps.map((s, i) => {
                const side = i % 2 === 0 ? styles.left : styles.right;
                return (
                    <div key={i} className={`${styles.step} ${side}`}>
                        <span className={styles.dot} />
                        {s.title && <div className={styles.title}>{s.title}</div>}
                        <div className={styles.text}>{s.description}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default StoryTimeline;
