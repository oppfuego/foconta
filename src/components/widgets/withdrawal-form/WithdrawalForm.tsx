"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useUser } from "@/context/UserContext";
import { useAlert } from "@/context/AlertContext";
import ButtonUI from "@/components/ui/button/ButtonUI";
import styles from "./WithdrawalForm.module.scss";

interface WithdrawalFormProps {
    maxAmount: number;
    onClose: () => void;
    onSuccess: () => void;
}

export default function WithdrawalForm({ maxAmount, onClose, onSuccess }: WithdrawalFormProps) {
    const user = useUser();
    const { showAlert } = useAlert();
    const [amount, setAmount] = useState("");
    const [paymentDetails, setPaymentDetails] = useState(user?.paymentDetails || "");
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const numAmount = parseFloat(amount) || 0;
    const commission = numAmount * 0.2;
    const netAmount = numAmount * 0.8;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (numAmount <= 0 || numAmount > maxAmount) {
            showAlert("Invalid amount", "", "error");
            return;
        }
        if (!paymentDetails.trim()) {
            showAlert("Payment details are required", "", "error");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/expert/withdrawals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    amount: numAmount,
                    paymentDetails: paymentDetails.trim(),
                }),
            });
            const data = await res.json();

            if (res.ok) {
                showAlert("Withdrawal request submitted!", "", "success");
                onSuccess();
            } else {
                showAlert(data.message || "Withdrawal failed", "", "error");
            }
        } catch {
            showAlert("Network error", "", "error");
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3>Request Withdrawal</h3>
                <p className={styles.eurNote}>Withdrawals are processed in EUR</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label>Amount (max: €{maxAmount.toFixed(2)})</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            max={maxAmount}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Payment Details (IBAN / Card Number)</label>
                        <input
                            type="text"
                            value={paymentDetails}
                            onChange={(e) => setPaymentDetails(e.target.value)}
                            placeholder="e.g. DE89 3704 0044 0532 0130 00"
                            className={styles.input}
                        />
                    </div>

                    {numAmount > 0 && (
                        <div className={styles.summary}>
                            <div className={styles.summaryRow}>
                                <span>Amount:</span>
                                <span>€{numAmount.toFixed(2)}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Commission (20%):</span>
                                <span className={styles.commission}>-€{commission.toFixed(2)}</span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                                <span>You receive:</span>
                                <span>€{netAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    )}

                    <div className={styles.actions}>
                        <ButtonUI type="button" variant="outlined" color="secondary" onClick={onClose}>
                            Cancel
                        </ButtonUI>
                        <ButtonUI type="submit" color="primary" loading={loading}>
                            Submit Request
                        </ButtonUI>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
