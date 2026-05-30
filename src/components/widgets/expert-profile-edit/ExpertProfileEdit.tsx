"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useAlert } from "@/context/AlertContext";
import { EXPERT_SPECIALIZATIONS } from "@/resources/specializations";
import ButtonUI from "@/components/ui/button/ButtonUI";
import styles from "./ExpertProfileEdit.module.scss";

export default function ExpertProfileEdit() {
    const user = useUser();
    const { showAlert } = useAlert();

    const [bio, setBio] = useState(user?.expertBio || "");
    const [specializations, setSpecializations] = useState<string[]>(user?.specializations || []);
    const [paymentDetails, setPaymentDetails] = useState(user?.paymentDetails || "");
    const [loading, setLoading] = useState(false);

    const toggleSpec = (spec: string) => {
        if (specializations.includes(spec)) {
            setSpecializations(specializations.filter((s) => s !== spec));
        } else {
            setSpecializations([...specializations, spec]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (specializations.length === 0) {
            showAlert("Select at least one specialization", "", "error");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/expert/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    expertBio: bio,
                    specializations,
                    paymentDetails,
                }),
            });
            const data = await res.json();

            if (res.ok) {
                showAlert("Profile updated!", "", "success");
            } else {
                showAlert(data.message || "Update failed", "", "error");
            }
        } catch {
            showAlert("Network error", "", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.infoSection}>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Name</span>
                        <span className={styles.value}>{user?.firstName} {user?.lastName}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Email</span>
                        <span className={styles.value}>{user?.email}</span>
                    </div>
                </div>

                <div className={styles.field}>
                    <label>Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell clients about your expertise..."
                        className={styles.textarea}
                        rows={4}
                    />
                </div>

                <div className={styles.field}>
                    <label>Specializations *</label>
                    <div className={styles.specGrid}>
                        {EXPERT_SPECIALIZATIONS.map((spec) => (
                            <label key={spec} className={styles.specItem}>
                                <input
                                    type="checkbox"
                                    checked={specializations.includes(spec)}
                                    onChange={() => toggleSpec(spec)}
                                />
                                <span>{spec}</span>
                            </label>
                        ))}
                    </div>
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
                    <span className={styles.hint}>Used for withdrawal payouts</span>
                </div>

                <ButtonUI type="submit" color="primary" loading={loading} fullWidth>
                    Save Changes
                </ButtonUI>
            </form>
        </div>
    );
}
