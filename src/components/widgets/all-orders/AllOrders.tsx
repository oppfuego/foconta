"use client";

import React from "react";
import {useAllOrders} from "@/context/AllOrdersContext";
import styles from "./AllOrders.module.scss";
import {FaFileDownload, FaRegClock, FaCoins, FaHourglassHalf, FaCheckCircle, FaSpinner} from "react-icons/fa";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Link from "next/link";
import {downloadUniversalPDF} from "@/pdf-creator/PdfCreator";
import {UniversalOrderType} from "@/backend/types/universal.types";

const EXPERT_STATUS_CONFIG: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
    pending: { label: "Pending", className: "expertPending", icon: <FaHourglassHalf /> },
    in_progress: { label: "In Progress", className: "expertInProgress", icon: <FaSpinner /> },
    done: { label: "Completed", className: "expertDone", icon: <FaCheckCircle /> },
};

const AllOrders: React.FC = () => {
    const {aiOrders, loading, refreshOrders} = useAllOrders();

    const universalOrders = aiOrders as unknown as UniversalOrderType[];

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"});
    };

    const formatId = (id: string) => String(id).slice(-6);

    const handleDownloadUniversal = async (order: UniversalOrderType) => {
        try {
            if (order.extrasData && Object.keys(order.extrasData).length > 0) {
                await downloadUniversalPDF(order);
                return;
            }

            const res = await fetch(`/api/universal/get-order?id=${order._id}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
            const data = await res.json();

            if (data?.order) await downloadUniversalPDF(data.order);
        } catch (err: any) {
            console.error("Download error:", err.message);
        }
    };

    if (loading) return <p className={styles.loading}>Loading orders...</p>;

    if (universalOrders.length === 0)
        return (
            <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📭</span>
                <p>No orders yet.</p>
                <Link href="/dashboard">
                    <ButtonUI color="primary" size="md" shape="rounded" hoverEffect="shadow">
                        Create your first order
                    </ButtonUI>
                </Link>
            </div>
        );

    const aiGeneratedOrders = universalOrders.filter((o) => o.planType !== "reviewed");
    const expertOrders = universalOrders.filter((o) => o.planType === "reviewed");

    return (
        <section className={styles.ordersSection}>
            <div className={styles.header}>
                <h3>Your Orders</h3>
                <p>View and download your generated content</p>
                <ButtonUI onClick={refreshOrders} color="primary" size="sm">
                    Refresh
                </ButtonUI>
            </div>

            {/* ============ EXPERT ORDERS ============ */}
            {expertOrders.length > 0 && (
                <>
                    <h4 className={styles.sectionTitle}>Expert-Written Plans</h4>
                    <div className={styles.ordersGrid}>
                        {expertOrders.map((order) => {
                            const statusKey = order.status || "pending";
                            const statusCfg = EXPERT_STATUS_CONFIG[statusKey] || EXPERT_STATUS_CONFIG.pending;
                            const isDone = statusKey === "done";
                            const pdfUrl = (order as any).pdfUrl;

                            return (
                                <div key={String(order._id)} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.idWrapper}>
                                            <span className={styles.orderId}>#{formatId(String(order._id))}</span>
                                            <span className={`${styles.badge} ${styles[statusCfg.className]}`}>
                                                {statusCfg.icon}
                                                <span style={{ marginLeft: 4 }}>{statusCfg.label}</span>
                                            </span>
                                        </div>
                                        {isDone && pdfUrl && (
                                            <a
                                                href={`/api/expert/orders/${String(order._id)}/pdf`}
                                                download
                                                className={styles.downloadBtn}
                                                aria-label="Download PDF"
                                            >
                                                <FaFileDownload/>
                                            </a>
                                        )}
                                    </div>

                                    <div className={styles.cardBody}>
                                        <div className={styles.meta}>
                                            <span className={styles.date}>
                                                <FaRegClock/> {formatDate(order.createdAt as any)} at {formatTime(order.createdAt as any)}
                                            </span>
                                            <span className={styles.tokens}>
                                                <FaCoins/> -{order.totalTokens} tokens
                                            </span>
                                        </div>
                                        <p className={styles.extraInfo}>
                                            Category: <strong>{order.category}</strong> | Language:{" "}
                                            {order.language || "English"}
                                        </p>
                                        {!isDone && (
                                            <p className={styles.expertMessage}>
                                                Your plan is being prepared by an expert. You'll be notified when it's ready.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* ============ AI ORDERS ============ */}
            {aiGeneratedOrders.length > 0 && (
                <>
                    <h4 className={styles.sectionTitle}>AI-Generated Plans</h4>
                    <div className={styles.ordersGrid}>
                        {aiGeneratedOrders.map((order) => (
                            <div key={String(order._id)} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.idWrapper}>
                                        <span className={styles.orderId}>#{formatId(String(order._id))}</span>
                                        <span className={`${styles.badge} ${styles.instant}`}>
                                            Instant
                                        </span>
                                    </div>
                                    <button
                                        className={styles.downloadBtn}
                                        onClick={() => handleDownloadUniversal(order)}
                                        aria-label="Download"
                                    >
                                        <FaFileDownload/>
                                    </button>
                                </div>

                                <div className={styles.cardBody}>
                                    <p className={styles.email}>{order.email}</p>
                                    <div className={styles.meta}>
                                        <span className={styles.date}>
                                            <FaRegClock/> {formatDate(order.createdAt as any)} at {formatTime(order.createdAt as any)}
                                        </span>
                                        <span className={styles.tokens}>
                                            <FaCoins/> -{order.totalTokens} tokens
                                        </span>
                                    </div>
                                    <p className={styles.extraInfo}>
                                        Category: <strong>{order.category}</strong> | Language:{" "}
                                        {order.language || "English"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default AllOrders;
