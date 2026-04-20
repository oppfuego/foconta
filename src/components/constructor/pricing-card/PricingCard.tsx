"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./PricingCard.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";
import Input from "@mui/joy/Input";
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

const PricingCard: React.FC<PricingCardProps> = ({
                                                     variant = "starter",
                                                     title,
                                                     price,
                                                     tokens,
                                                     description,
                                                     features,
                                                     buttonText,
                                                     badgeTop,
                                                     badgeBottom,
                                                     index = 0,
                                                 }) => {
    const { showAlert } = useAlert();
    const user = useUser();
    const { currency, sign, convertFromGBP, convertToGBP } = useCurrency();

    const [customAmount, setCustomAmount] = useState<number>(0.01);
    const [loading, setLoading] = useState(false);
    const isCustom = price === "dynamic";

    // 💷 Базова ціна у GBP
    const basePriceGBP = useMemo(() => {
        if (isCustom) return 0;
        const num = parseFloat(price.replace(/[^0-9.]/g, ""));
        return isNaN(num) ? 0 : num;
    }, [price, isCustom]);

    // 💰 Конвертація у поточну валюту
    const convertedPrice = useMemo(() => {
        if (isCustom) return 0;
        return convertFromGBP(basePriceGBP);
    }, [basePriceGBP, convertFromGBP, isCustom]);

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
        } catch (err: any) {
            showAlert("Error", err.message || "Something went wrong", "error");
            setLoading(false);
        }
    };

    // 🔢 Реальний розрахунок токенів
    const tokensCalculated = useMemo(() => {
        const gbpEquivalent = convertToGBP(customAmount);
        return Math.floor(gbpEquivalent * TOKENS_PER_GBP);
    }, [customAmount, convertToGBP]);

    return (
        <motion.div
            className={`${styles.card} ${styles[variant]}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
        >
            {badgeTop && <span className={styles.badgeTop}>{badgeTop}</span>}
            <h3 className={styles.title}>{title}</h3>

            {isCustom ? (
                <>
                    <div className={styles.inputWrapper}>
                        <Input
                            type="number"
                            value={customAmount}
                            min={0.01}
                            step={0.01}
                            onChange={(e) =>
                                setCustomAmount(
                                    e.target.value === "" ? 0.01 : Math.max(0.01, Number(e.target.value))
                                )
                            }
                            placeholder="Enter amount"
                            size="md"
                            startDecorator={sign}
                        />
                    </div>
                    <p className={styles.dynamicPrice}>
                        {sign}
                        {customAmount.toFixed(2)} {currency} ≈ {tokensCalculated} tokens
                    </p>
                </>
            ) : (
                <p className={styles.price}>
                    {sign}
                    {convertedPrice.toFixed(2)}{" "}
                    <span className={styles.tokens}>/ {tokens} tokens</span>
                </p>
            )}

            <p className={styles.description}>{description}</p>
            <ul className={styles.features}>
                {features.map((f, i) => (
                    <li key={i}>{f}</li>
                ))}
            </ul>

            <ButtonUI fullWidth onClick={handleBuy} disabled={loading}>
                {loading ? "Redirecting..." : user ? buttonText : "Sign Up to Buy"}
            </ButtonUI>

            {badgeBottom && <span className={styles.badgeBottom}>{badgeBottom}</span>}
        </motion.div>
    );
};

export default PricingCard;
