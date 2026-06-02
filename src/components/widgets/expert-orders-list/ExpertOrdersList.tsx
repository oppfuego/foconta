"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaRegClock, FaUpload, FaPlay, FaCheck } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import ButtonUI from "@/components/ui/button/ButtonUI";
import styles from "./ExpertOrdersList.module.scss";

interface ExpertOrder {
    _id: string;
    email: string;
    category: string;
    fields: Record<string, any>;
    totalTokens: number;
    planType: string;
    language?: string;
    status: string;
    expertId?: string | null;
    pdfUrl?: string | null;
    createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
    pending: { label: "Pending", className: "statusPending" },
    in_progress: { label: "In Progress", className: "statusInProgress" },
    done: { label: "Completed", className: "statusDone" },
};

export default function ExpertOrdersList() {
    const user = useUser();
    const [orders, setOrders] = useState<ExpertOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploadingId, setUploadingId] = useState<string | null>(null);
    const [takingId, setTakingId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/expert/orders", {
                credentials: "include",
            });
            if (res.ok) {
                const data = await res.json();
                setOrders(data.orders || []);
            }
        } catch (err) {
            console.error("Failed to fetch expert orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleTakeOrder = async (orderId: string) => {
        setTakingId(orderId);
        try {
            const res = await fetch(`/api/expert/orders/${orderId}/take`, {
                method: "PATCH",
                credentials: "include",
            });
            if (res.ok) {
                await fetchOrders();
            }
        } catch (err) {
            console.error("Failed to take order:", err);
        } finally {
            setTakingId(null);
        }
    };

    const handleUploadClick = (orderId: string) => {
        setActiveOrderId(orderId);
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !activeOrderId) return;

        setUploadingId(activeOrderId);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch(`/api/expert/orders/${activeOrderId}/complete`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });
            if (res.ok) {
                await fetchOrders();
            } else {
                const data = await res.json().catch(() => ({}));
                console.error("Upload failed:", res.status, data.message);
            }
        } catch (err) {
            console.error("Failed to complete order:", err);
        } finally {
            setUploadingId(null);
            setActiveOrderId(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const formatId = (id: string) => id.slice(-6);

    if (loading) return <p className={styles.loading}>Loading orders...</p>;

    const expertId = user?._id ? String(user._id) : null;
    const availableOrders = orders.filter((o) => !o.expertId && o.status === "pending");
    const myOrders = orders.filter((o) => o.expertId && String(o.expertId) === expertId);

    if (orders.length === 0) {
        return (
            <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📋</span>
                <p>No orders available yet.</p>
                <p className={styles.emptySubtext}>New orders will appear here when clients request expert-written plans.</p>
            </div>
        );
    }

    const renderOrderCard = (order: ExpertOrder) => {
        const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
        const isAvailable = !order.expertId && order.status === "pending";

        return (
            <div key={order._id} className={`${styles.card} ${isAvailable ? styles.cardAvailable : ""}`}>
                <div className={styles.cardHeader}>
                    <div className={styles.idWrapper}>
                        <span className={styles.orderId}>#{formatId(order._id)}</span>
                        <span className={`${styles.badge} ${styles[statusCfg.className]}`}>
                            {isAvailable ? "Available" : statusCfg.label}
                        </span>
                    </div>
                </div>

                <div className={styles.cardBody}>
                    <p className={styles.clientEmail}>{order.email}</p>
                    <p className={styles.category}>
                        Category: <strong>{order.category}</strong>
                    </p>
                    {order.language && order.language !== "English" && (
                        <p className={styles.language}>Language: {order.language}</p>
                    )}
                    <div className={styles.meta}>
                        <span className={styles.date}>
                            <FaRegClock /> {formatDate(order.createdAt)}
                        </span>
                        <span className={styles.tokens}>{order.totalTokens} tokens</span>
                    </div>

                    {order.fields && (
                        <div className={styles.fieldsPreview}>
                            {order.fields.businessName && (
                                <p><strong>Business:</strong> {order.fields.businessName}</p>
                            )}
                            {order.fields.niche && (
                                <p><strong>Niche:</strong> {order.fields.niche}</p>
                            )}
                            {order.fields.goal && (
                                <p><strong>Goal:</strong> {order.fields.goal}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.cardActions}>
                    {isAvailable && (
                        <ButtonUI
                            onClick={() => handleTakeOrder(order._id)}
                            color="primary"
                            size="sm"
                            loading={takingId === order._id}
                        >
                            <FaPlay style={{ marginRight: 6 }} />
                            Take Order
                        </ButtonUI>
                    )}
                    {order.status === "in_progress" && (
                        <ButtonUI
                            onClick={() => handleUploadClick(order._id)}
                            color="success"
                            size="sm"
                            loading={uploadingId === order._id}
                        >
                            <FaUpload style={{ marginRight: 6 }} />
                            Upload PDF & Complete
                        </ButtonUI>
                    )}
                    {order.status === "done" && (
                        <div className={styles.completedBadge}>
                            <FaCheck /> Completed
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <section className={styles.ordersSection}>
            <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />

            <div className={styles.header}>
                <h3>Orders</h3>
                <p>Take available orders or manage your current work</p>
                <ButtonUI onClick={fetchOrders} color="primary" size="sm">
                    Refresh
                </ButtonUI>
            </div>

            {availableOrders.length > 0 && (
                <>
                    <h4 className={styles.sectionTitle}>Available Orders</h4>
                    <div className={styles.ordersGrid}>
                        {availableOrders.map(renderOrderCard)}
                    </div>
                </>
            )}

            {myOrders.length > 0 && (
                <>
                    <h4 className={styles.sectionTitle}>My Orders</h4>
                    <div className={styles.ordersGrid}>
                        {myOrders.map(renderOrderCard)}
                    </div>
                </>
            )}
        </section>
    );
}
