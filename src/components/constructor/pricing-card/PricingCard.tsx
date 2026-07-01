"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Input from "@mui/joy/Input";
import styles from "./PricingCard.module.scss";
import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";
import { useCurrency } from "@/context/CurrencyContext";

const TOKENS_PER_GBP = 100;

interface PricingCardProps {
    variant?: "starter" | "pro" | "premium" | "custom";
    title: string;
    price: string;
    tokens: number;
    description: string;
    features: string[];
    buttonText: string;
    buttonLink?: string;
    badgeTop?: string;
    badgeBottom?: string;
    index?: number;
}

function useCountUp(target: number, active: boolean, duration = 900) {
    const [value, setValue] = useState(0);
    const reduce = useReducedMotion();

    useEffect(() => {
        if (!active) return;
        if (reduce) {
            setValue(target);
            return;
        }
        let raf = 0;
        const start = performance.now();
        const from = 0;
        const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(from + (target - from) * eased);
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, active, duration, reduce]);

    return value;
}

const PricingCard: React.FC<PricingCardProps> = ({
    variant = "starter",
    title,
    price,
    tokens,
    buttonText,
    index = 0,
}) => {
    const { showAlert } = useAlert();
    const user = useUser();
    const { currency, sign, convertFromGBP, convertToGBP } = useCurrency();
    const [customAmount, setCustomAmount] = useState<number>(0.01);
    const [loading, setLoading] = useState(false);
    const isCustom = price === "dynamic";
    const isFeatured = variant === "pro";
    const cardRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(cardRef, { once: true, amount: 0.3 });
    const reduce = useReducedMotion();

    const basePriceGBP = useMemo(() => {
        if (isCustom) return 0;
        const num = parseFloat(price.replace(/[^0-9.]/g, ""));
        return isNaN(num) ? 0 : num;
    }, [price, isCustom]);

    const convertedPrice = useMemo(() => {
        if (isCustom) return 0;
        return convertFromGBP(basePriceGBP);
    }, [basePriceGBP, convertFromGBP, isCustom]);

    const animatedPrice = useCountUp(convertedPrice, inView && !isCustom);

    const handleBuy = async () => {
        if (!user) {
            showAlert("Please sign up", "You need to be signed in to purchase", "info");
            setTimeout(() => (window.location.href = "/sign-up"), 1200);
            return;
        }

        setLoading(true);
        try {
            let paymentAmount: number;

            if (isCustom) {
                const gbpEquivalent = convertToGBP(customAmount);
                if (gbpEquivalent < 0.01) {
                    showAlert("Minimum is 0.01", "Enter at least 0.01 GBP equivalent", "warning");
                    setLoading(false);
                    return;
                }
                paymentAmount = customAmount;
            } else {
                paymentAmount = convertedPrice;
            }

            const res = await fetch("/api/payments/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ amount: paymentAmount, currency }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Payment failed");
            }

            const data = await res.json();

            if (data.currency_fallback) {
                showAlert(
                    "Currency not available",
                    `${data.requested_currency} is not yet configured. You will be charged in ${data.provider_currency} instead.`,
                    "info"
                );
                await new Promise((r) => setTimeout(r, 2500));
            }

            if (data.redirect_url) {
                window.location.href = data.redirect_url;
            } else {
                throw new Error("No payment URL received");
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Something went wrong";
            showAlert("Error", msg, "error");
            setLoading(false);
        }
    };

    const tokensCalculated = useMemo(() => {
        const gbpEquivalent = convertToGBP(customAmount);
        return Math.floor(gbpEquivalent * TOKENS_PER_GBP);
    }, [customAmount, convertToGBP]);

    return (
        <motion.div
            ref={cardRef}
            className={`${styles.card} ${styles[variant]} ${isFeatured ? styles.featured : ""}`}
            initial={reduce ? undefined : { opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
        >
            {isFeatured && <span className={styles.gradientBorder} aria-hidden />}
            {isFeatured && (
                <motion.span
                    className={styles.floatBadge}
                    initial={{ opacity: 0, y: -6 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                >
                    Most popular
                </motion.span>
            )}

            <h3 className={styles.title}>{title}</h3>

            {isCustom ? (
                <>
                    <div className={styles.inputWrapper}>
                        <Input
                            type="number"
                            value={customAmount}
                            slotProps={{ input: { min: 0.01, step: 0.01 } }}
                            onChange={(e) =>
                                setCustomAmount(
                                    e.target.value === "" ? 0.01 : Math.max(0.01, Number(e.target.value))
                                )
                            }
                            placeholder="Enter amount"
                            size="md"
                            startDecorator={<span className={styles.decorator}>{sign}</span>}
                        />
                    </div>
                    <p className={styles.dynamicPrice}>
                        {sign}
                        {customAmount.toFixed(2)} {currency}{" "}
                        <span className={styles.tokens}>≈ {tokensCalculated} tokens</span>
                    </p>
                </>
            ) : (
                <p className={styles.price}>
                    <span className={styles.sign}>{sign}</span>
                    <span className={styles.priceNumber}>{animatedPrice.toFixed(2)}</span>
                    <span className={styles.tokens}>/ {tokens} tokens</span>
                </p>
            )}


            <button
                className={styles.cta}
                onClick={handleBuy}
                disabled={loading}
                type="button"
            >
                <span className={styles.ctaText}>
                    {loading ? "Redirecting..." : user ? buttonText : "Sign Up to Buy"}
                </span>
                <span className={styles.ctaArrow} aria-hidden>→</span>
            </button>
        </motion.div>
    );
};

export default PricingCard;
