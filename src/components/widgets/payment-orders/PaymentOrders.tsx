"use client";

import React, { useEffect, useState } from "react";
import styles from "./PaymentOrders.module.scss";

interface PaymentOrder {
    _id: string;
    referenceId: string;
    state: string;
    tokens: number;
    amount: number;
    currency: string;
    providerCurrency: string;
    providerAmount: number;
    createdAt: string;
}

const STATE_BADGES: Record<string, { label: string; className: string }> = {
    COMPLETED: { label: "Completed", className: "completed" },
    PENDING: { label: "Pending", className: "pending" },
    INITIATED: { label: "Initiated", className: "pending" },
    FAILED: { label: "Failed", className: "failed" },
    CANCELLED: { label: "Cancelled", className: "failed" },
    EXPIRED: { label: "Expired", className: "failed" },
    REFUNDED: { label: "Refunded", className: "refunded" },
};

export default function PaymentOrders() {
    const [orders, setOrders] = useState<PaymentOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/payments/orders", { credentials: "include" })
            .then((r) => r.json())
            .then((data) => setOrders(data.orders || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className={styles.loading}>Loading payments...</p>;
    if (!orders.length) return <p className={styles.empty}>No payment orders yet.</p>;

    return (
        <div className={styles.table}>
            <div className={styles.header}>
                <span>Date</span>
                <span>Tokens</span>
                <span>Amount</span>
                <span>Status</span>
            </div>
            {orders.map((order) => {
                const badge = STATE_BADGES[order.state] || STATE_BADGES.PENDING;
                return (
                    <div key={order._id} className={styles.row}>
                        <span>{new Date(order.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                        <span className={styles.tokens}>{order.tokens}</span>
                        <span>{order.providerAmount.toFixed(2)} {order.providerCurrency}</span>
                        <span className={`${styles.badge} ${styles[badge.className]}`}>{badge.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

