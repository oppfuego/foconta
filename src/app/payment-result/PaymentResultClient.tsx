"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./PaymentResult.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";

type PaymentState = "INITIATED" | "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED" | "EXPIRED" | "REFUNDED";

interface OrderData {
    referenceId: string;
    state: PaymentState;
    tokens: number;
    amount: number;
    currency: string;
    providerCurrency: string;
    providerAmount: number;
    createdAt: string;
}

const STATE_CONFIG: Record<PaymentState, { icon: string; title: string; message: string }> = {
    INITIATED: { icon: "⏳", title: "Initiating Payment", message: "Your payment is being set up..." },
    PENDING: { icon: "⏳", title: "Processing Payment", message: "Your payment is being processed. This page will update automatically." },
    COMPLETED: { icon: "✅", title: "Payment Successful!", message: "Your tokens have been added to your account." },
    FAILED: { icon: "❌", title: "Payment Failed", message: "The payment could not be completed. Please try again." },
    CANCELLED: { icon: "❌", title: "Payment Cancelled", message: "The payment was cancelled." },
    EXPIRED: { icon: "⏰", title: "Payment Expired", message: "The payment session has expired. Please try again." },
    REFUNDED: { icon: "↩️", title: "Payment Refunded", message: "This payment has been refunded." },
};

const TERMINAL_STATES: PaymentState[] = ["COMPLETED", "FAILED", "CANCELLED", "EXPIRED", "REFUNDED"];

export default function PaymentResultClient() {
    const searchParams = useSearchParams();
    const ref = searchParams.get("ref");

    const [order, setOrder] = useState<OrderData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchStatus = useCallback(async () => {
        if (!ref) return;
        try {
            const res = await fetch(`/api/payments/status?ref=${encodeURIComponent(ref)}`, {
                credentials: "include",
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || "Failed to fetch status");
            }
            const data = await res.json();
            setOrder(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [ref]);

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    // Poll every 5s while in non-terminal state
    useEffect(() => {
        if (!order || TERMINAL_STATES.includes(order.state)) return;
        const interval = setInterval(fetchStatus, 5000);
        return () => clearInterval(interval);
    }, [order, fetchStatus]);

    if (!ref) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.icon}>❓</div>
                    <h2 className={styles.title}>No Payment Reference</h2>
                    <p className={styles.message}>No payment reference was provided.</p>
                    <div className={styles.actions}>
                        <ButtonUI onClick={() => (window.location.href = "/pricing")}>Go to Pricing</ButtonUI>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.spinner} />
                    <h2 className={styles.title}>Loading...</h2>
                    <p className={styles.message}>Checking your payment status...</p>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.icon}>⚠️</div>
                    <h2 className={styles.title}>Error</h2>
                    <p className={styles.message}>{error || "Could not load payment information."}</p>
                    <div className={styles.actions}>
                        <ButtonUI onClick={fetchStatus}>Retry</ButtonUI>
                        <ButtonUI onClick={() => (window.location.href = "/pricing")}>Go to Pricing</ButtonUI>
                    </div>
                </div>
            </div>
        );
    }

    const config = STATE_CONFIG[order.state] || STATE_CONFIG.PENDING;
    const isTerminal = TERMINAL_STATES.includes(order.state);
    const stateClass = styles[`state${order.state.charAt(0) + order.state.slice(1).toLowerCase()}`] || "";

    return (
        <div className={styles.container}>
            <div className={`${styles.card} ${stateClass}`}>
                {!isTerminal ? (
                    <div className={styles.spinner} />
                ) : (
                    <div className={styles.icon}>{config.icon}</div>
                )}

                <h2 className={styles.title}>{config.title}</h2>
                <p className={styles.message}>{config.message}</p>

                <div className={styles.details}>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Tokens</span>
                        <span className={styles.detailValue}>{order.tokens}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Amount</span>
                        <span className={styles.detailValue}>
                            {order.providerAmount.toFixed(2)} {order.providerCurrency}
                        </span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Status</span>
                        <span className={styles.detailValue}>{order.state}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Reference</span>
                        <span className={styles.detailValue} style={{ fontSize: 11, wordBreak: "break-all" }}>
                            {order.referenceId}
                        </span>
                    </div>
                </div>

                <div className={styles.actions}>
                    {order.state === "COMPLETED" && (
                        <ButtonUI onClick={() => (window.location.href = "/dashboard")}>Go to Dashboard</ButtonUI>
                    )}
                    {(order.state === "FAILED" || order.state === "CANCELLED" || order.state === "EXPIRED") && (
                        <ButtonUI onClick={() => (window.location.href = "/pricing")}>Try Again</ButtonUI>
                    )}
                    <ButtonUI onClick={() => (window.location.href = "/")}>Home</ButtonUI>
                </div>
            </div>
        </div>
    );
}

