"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import styles from "./HighlightStrip.module.scss";
import { media as mediaMap } from "@/resources/media";

interface HighlightItem {
    image?: string;
    icon?: string;
    text?: string;
    subtext?: string;
}

interface HighlightStripProps {
    items: HighlightItem[];
    speedPxPerSec?: number; // marquee speed
    pauseOnHover?: boolean;
}

const HighlightStrip: React.FC<HighlightStripProps> = ({
                                                           items,
                                                           speedPxPerSec = 100,
                                                           pauseOnHover = true,
                                                       }) => {
    const resolveMedia = (key?: string): string | undefined => {
        if (!key) return undefined;

        const v = (mediaMap as Record<string, any>)[key];
        if (!v && process.env.NODE_ENV !== "production") {
            console.warn(`media asset not found: ${key}`);
        }

        if (typeof v === "object" && v?.src) return v.src;
        if (typeof v === "string") return v;
        return undefined;
    };

    const renderItem = (item: HighlightItem, key: string) => {
        const resolvedImage = resolveMedia(item.image);
        const hasIcon = !!(resolvedImage || item.icon);

        return (
            <div key={key} className={styles.item}>
                {/* ВАЖЛИВО: iconBox завжди рендеримо, щоб spacing був 1:1 */}
                <div className={`${styles.iconBox} ${!hasIcon ? styles.iconBoxEmpty : ""}`}>
                    {resolvedImage ? (
                        <img
                            src={resolvedImage}
                            alt={item.text || "logo"}
                            className={styles.logo}
                            width={40}
                            height={40}
                            loading="lazy"
                            draggable={false}
                        />
                    ) : item.icon ? (
                        <span className={styles.emoji} aria-hidden>
              {item.icon}
            </span>
                    ) : null}
                </div>

                {(item.text || item.subtext) && (
                    <div className={styles.textBlock}>
                        {item.text && <p className={styles.text}>{item.text}</p>}
                        {item.subtext && <p className={styles.subtext}>{item.subtext}</p>}
                    </div>
                )}
            </div>
        );
    };

    return (
        <section className={styles.strip}>
            <div className={styles.marquee}>
                <Marquee
                    speed={speedPxPerSec}          // px/sec
                    pauseOnHover={pauseOnHover}
                    gradient={false}              // ми вже маємо fadeLeft/fadeRight
                    autoFill                      // ключ: автоматично дублює контент, щоб НЕ було пустот
                >
                    <div className={styles.row}>
                        {items.map((item, i) => renderItem(item, `item-${i}`))}
                    </div>
                </Marquee>
            </div>

            <div className={styles.fadeLeft} />
            <div className={styles.fadeRight} />
        </section>
    );
};

export default HighlightStrip;