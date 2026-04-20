"use client";

import React, { useState } from "react";
import AllOrders from "@/components/widgets/all-orders/AllOrders";
import TransactionHistory from "@/components/widgets/all-transactions/AllTransactions";
import PaymentOrders from "@/components/widgets/payment-orders/PaymentOrders";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<"orders" | "transactions" | "payments">("orders");

    return (
        <div className={styles.dashboard}>
            {/* 🔹 Панель перемикача */}
            <div className={styles.toggleBar}>
                <button
                    className={`${styles.toggleButton} ${
                        activeTab === "orders" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("orders")}
                >
                    Orders
                </button>
                <button
                    className={`${styles.toggleButton} ${
                        activeTab === "transactions" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("transactions")}
                >
                    Transactions
                </button>
                <button
                    className={`${styles.toggleButton} ${
                        activeTab === "payments" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("payments")}
                >
                    Payments
                </button>
            </div>

            {/* 🔹 Контент */}
            <div className={styles.content}>
                {activeTab === "orders" ? (
                    <div key="orders" className={styles.fadeIn}>
                        <AllOrders />
                    </div>
                ) : activeTab === "transactions" ? (
                    <div key="transactions" className={styles.fadeIn}>
                        <TransactionHistory />
                    </div>
                ) : (
                    <div key="payments" className={styles.fadeIn}>
                        <PaymentOrders />
                    </div>
                )}
            </div>
        </div>
    );
}
