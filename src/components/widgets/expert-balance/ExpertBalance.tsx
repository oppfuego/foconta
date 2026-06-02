"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@/context/UserContext";
import { useCurrency } from "@/context/CurrencyContext";
import { GiTwoCoins } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import WithdrawalForm from "@/components/widgets/withdrawal-form/WithdrawalForm";
import styles from "./ExpertBalance.module.scss";

interface Withdrawal {
    _id: string;
    amount: number;
    commission: number;
    netAmount: number;
    status: string;
    createdAt: string;
}

const EUR_TO_GBP = 1 / 1.17;

export default function ExpertBalance() {
    const user = useUser();
    const { sign, currency, convertFromGBP } = useCurrency();
    const isEur = currency === "EUR";
    const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    const fmtConverted = useCallback((eur: number) => {
        return `${sign}${convertFromGBP(eur * EUR_TO_GBP).toFixed(2)}`;
    }, [sign, convertFromGBP]);

    const fmtEur = (eur: number) => `€${eur.toFixed(2)}`;

    const fetchWithdrawals = async () => {
        try {
            const res = await fetch("/api/expert/withdrawals", {
                credentials: "include",
            });
            if (res.ok) {
                const data = await res.json();
                setWithdrawals(data.withdrawals || []);
            }
        } catch (err) {
            console.error("Failed to fetch withdrawals:", err);
        } finally {
            setLoadingHistory(false);
        }
    };

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const balance = user?.expertBalance ?? 0;

    const totalEarned = withdrawals.reduce((sum, w) => {
        if (w.status !== "rejected") return sum + w.amount;
        return sum;
    }, 0) + balance;

    return (
        <div className={styles.container}>
            <div className={styles.balanceCards}>
                <div className={styles.balanceCard}>
                    <div className={styles.balanceHeader}>
                        <GiTwoCoins className={styles.icon} />
                        <div>
                            <h3>Current Balance</h3>
                            <p className={styles.amount}>{fmtEur(balance)}</p>
                            {!isEur && (
                                <p className={styles.converted}>≈ {fmtConverted(balance)}</p>
                            )}
                        </div>
                    </div>
                    <button
                        className={styles.withdrawBtn}
                        onClick={() => setShowWithdrawalForm(true)}
                        disabled={balance <= 0}
                    >
                        Request Withdrawal
                    </button>
                </div>

                <div className={styles.statCard}>
                    <h4>Total Earned</h4>
                    <p className={styles.statAmount}>{fmtEur(totalEarned)}</p>
                    {!isEur && (
                        <p className={styles.converted}>≈ {fmtConverted(totalEarned)}</p>
                    )}
                    <span className={styles.statNote}>Commission: 20% per withdrawal</span>
                </div>
            </div>

            {showWithdrawalForm && (
                <WithdrawalForm
                    maxAmount={balance}
                    onClose={() => setShowWithdrawalForm(false)}
                    onSuccess={() => {
                        setShowWithdrawalForm(false);
                        fetchWithdrawals();
                    }}
                />
            )}

            <div className={styles.historySection}>
                <h3><FaHistory style={{ marginRight: 8 }} />Withdrawal History</h3>
                {loadingHistory ? (
                    <p className={styles.loadingText}>Loading...</p>
                ) : withdrawals.length === 0 ? (
                    <p className={styles.emptyText}>No withdrawal requests yet.</p>
                ) : (
                    <div className={styles.historyList}>
                        {withdrawals.map((w) => (
                            <div key={w._id} className={styles.historyItem}>
                                <div className={styles.historyMain}>
                                    <span className={styles.historyAmount}>
                                        {fmtEur(w.amount)}
                                        {!isEur && <span className={styles.convertedInline}> (≈ {fmtConverted(w.amount)})</span>}
                                    </span>
                                    <span className={styles.historyNet}>
                                        Net: {fmtEur(w.netAmount)}
                                        {!isEur && <span className={styles.convertedInline}> (≈ {fmtConverted(w.netAmount)})</span>}
                                    </span>
                                </div>
                                <div className={styles.historyMeta}>
                                    <span className={styles.historyDate}>{formatDate(w.createdAt)}</span>
                                    <span className={`${styles.historyStatus} ${styles[`status_${w.status}`]}`}>
                                        {w.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
