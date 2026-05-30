"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { FaUserCircle } from "react-icons/fa";
import { LogoutButton } from "@/components/ui/logout-button/LogoutButton";
import ExpertOrdersList from "@/components/widgets/expert-orders-list/ExpertOrdersList";
import ExpertBalance from "@/components/widgets/expert-balance/ExpertBalance";
import ExpertProfileEdit from "@/components/widgets/expert-profile-edit/ExpertProfileEdit";
import styles from "./ExpertProfile.module.scss";

type Tab = "orders" | "balance" | "profile";

export default function ExpertProfile() {
    const user = useUser();
    const [activeTab, setActiveTab] = useState<Tab>("orders");

    if (!user) return null;

    return (
        <div className={styles.page}>
            <div className={styles.headerRow}>
                <div className={styles.hero}>
                    <FaUserCircle className={styles.avatar} />
                    <div className={styles.text}>
                        <h1>{user.firstName} {user.lastName}</h1>
                        <p>{user.specializations?.join(", ") || "Expert"}</p>
                        {!user.isExpertVerified && (
                            <span className={styles.unverified}>Pending Verification</span>
                        )}
                    </div>
                </div>
                <div className={styles.actions}>
                    <LogoutButton />
                </div>
            </div>

            <div className={styles.toggleBar}>
                <button
                    className={`${styles.toggleButton} ${activeTab === "orders" ? styles.active : ""}`}
                    onClick={() => setActiveTab("orders")}
                >
                    Orders
                </button>
                <button
                    className={`${styles.toggleButton} ${activeTab === "balance" ? styles.active : ""}`}
                    onClick={() => setActiveTab("balance")}
                >
                    Balance
                </button>
                <button
                    className={`${styles.toggleButton} ${activeTab === "profile" ? styles.active : ""}`}
                    onClick={() => setActiveTab("profile")}
                >
                    Profile
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === "orders" && (
                    <div key="orders" className={styles.fadeIn}>
                        <ExpertOrdersList />
                    </div>
                )}
                {activeTab === "balance" && (
                    <div key="balance" className={styles.fadeIn}>
                        <ExpertBalance />
                    </div>
                )}
                {activeTab === "profile" && (
                    <div key="profile" className={styles.fadeIn}>
                        <ExpertProfileEdit />
                    </div>
                )}
            </div>
        </div>
    );
}
