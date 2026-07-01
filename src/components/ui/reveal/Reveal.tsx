"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { revealVariants, staggerParent, staggerChild } from "@/design/motion";

type RevealProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  variant?: "single" | "stagger" | "child";
  once?: boolean;
  amount?: number;
};

export default function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  variant = "single",
  once = true,
  amount = 0.2,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion(as as React.ElementType);

  const pick: Variants =
    variant === "stagger"
      ? staggerParent
      : variant === "child"
      ? staggerChild
      : revealVariants;

  if (reduce) {
    const Plain = as as React.ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={pick}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}
