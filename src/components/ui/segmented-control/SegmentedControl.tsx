"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./SegmentedControl.module.scss";

type Option = { value: string; label: string };

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  ariaLabel?: string;
  tone?: "light" | "dark";
};

export default function SegmentedControl({
  value,
  onChange,
  options,
  ariaLabel,
  tone = "light",
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [thumb, setThumb] = useState<{ x: number; w: number }>({ x: 0, w: 0 });

  useLayoutEffect(() => {
    const i = options.findIndex((o) => o.value === value);
    const el = btnRefs.current[i];
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    const wrect = wrap.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setThumb({ x: r.left - wrect.left, w: r.width });
  }, [value, options]);

  return (
    <div
      ref={wrapRef}
      role="tablist"
      aria-label={ariaLabel}
      className={`${styles.wrap} ${tone === "dark" ? styles.dark : ""}`}
    >
      <motion.span
        className={styles.thumb}
        animate={{ x: thumb.x, width: thumb.w }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
      />
      {options.map((o, i) => (
        <button
          key={o.value}
          ref={(el) => {
            btnRefs.current[i] = el;
          }}
          role="tab"
          aria-selected={value === o.value}
          onClick={() => onChange(o.value)}
          className={`${styles.opt} ${value === o.value ? styles.active : ""}`}
          type="button"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
