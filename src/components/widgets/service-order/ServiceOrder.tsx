"use client";

import React, { useMemo, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { useAlert } from "@/context/AlertContext";
import { useUser, useUserContext } from "@/context/UserContext";
import {
    getServiceBySlug,
    getServicePlans,
    type ServiceField,
    type ServicePlan,
} from "@/resources/services";
import { TOKENS_TO_CURRENCY_RATE } from "@/resources/pricing";
import styles from "./ServiceOrder.module.scss";

const LANGUAGES = ["English", "Ukrainian", "German", "French", "Spanish"];

const PLAN_META: Record<ServicePlan, { label: string; note: string }> = {
    ai: { label: "AI Draft", note: "Generated instantly by AI" },
    reviewed: { label: "Expert-Written", note: "Prepared by a human expert" },
};

function tokensToEuro(tokens: number): string {
    return `€${(tokens * TOKENS_TO_CURRENCY_RATE).toFixed(2)}`;
}

function buildValidationSchema(fields: ServiceField[]) {
    const shape: Record<string, Yup.AnySchema> = {};
    for (const f of fields) {
        if (!f.required) continue;
        shape[f.name] =
            f.type === "number"
                ? Yup.number().typeError("Must be a number").required("Required")
                : Yup.string().trim().required("Required");
    }
    return Yup.object().shape(shape);
}

export default function ServiceOrder({ slug }: { slug: string }) {
    const service = getServiceBySlug(slug);
    const { showAlert } = useAlert();
    const user = useUser();
    const { refreshUser } = useUserContext();
    const router = useRouter();

    const plans = useMemo(() => (service ? getServicePlans(service) : []), [service]);
    const [plan, setPlan] = useState<ServicePlan>(plans[0] ?? "ai");
    const [loading, setLoading] = useState(false);

    if (!service) {
        return (
            <section className={styles.wrapper}>
                <div className={styles.card}>
                    <h2>Service not found</h2>
                    <p>The service you are looking for does not exist.</p>
                    <ButtonUI onClick={() => router.push("/services")}>Back to services</ButtonUI>
                </div>
            </section>
        );
    }

    const price = service.prices[plan] ?? 0;
    const validationSchema = buildValidationSchema(service.fields);

    const initialValues: Record<string, string> = { language: "English" };
    for (const f of service.fields) initialValues[f.name] = "";

    return (
        <section className={styles.wrapper}>
            <div className={styles.card}>
                <header className={styles.header}>
                    <span className={styles.icon} aria-hidden>{service.icon}</span>
                    <div>
                        <h2 className={styles.title}>{service.title}</h2>
                        <p className={styles.subtitle}>{service.longDesc}</p>
                    </div>
                </header>

                {/* Plan selector */}
                <div className={styles.plans}>
                    {plans.map((p) => {
                        const active = p === plan;
                        return (
                            <button
                                type="button"
                                key={p}
                                className={`${styles.plan} ${active ? styles.planActive : ""}`}
                                onClick={() => setPlan(p)}
                            >
                                <span className={styles.planLabel}>{PLAN_META[p].label}</span>
                                <span className={styles.planNote}>{PLAN_META[p].note}</span>
                                <span className={styles.planPrice}>
                                    {service.prices[p]} tokens
                                    <small>{tokensToEuro(service.prices[p] ?? 0)}</small>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        if (!user) {
                            showAlert("Sign in required", "Please sign in to place an order.", "warning");
                            router.push("/sign-in");
                            return;
                        }
                        setLoading(true);
                        try {
                            const { language, ...fields } = values;
                            const payload = {
                                category: service.category,
                                planType: plan === "reviewed" ? "reviewed" : "default",
                                language,
                                extras: [],
                                totalTokens: price, // display only — server sets the fixed price
                                email: user.email,
                                fields,
                            };
                            const res = await fetch("/api/universal/create-order", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                credentials: "include",
                                body: JSON.stringify(payload),
                            });
                            const data = await res.json();
                            if (res.ok) {
                                showAlert(
                                    "Order Placed!",
                                    plan === "reviewed"
                                        ? "An expert will prepare your order. You'll be notified when it's ready."
                                        : `Your ${service.title} was generated successfully!`,
                                    "success"
                                );
                                refreshUser();
                                setTimeout(() => router.push("/profile"), 1500);
                            } else {
                                showAlert("Error", data.message || "Failed to place order", "error");
                                setLoading(false);
                            }
                        } catch {
                            showAlert("Error", "Network or server issue", "error");
                            setLoading(false);
                        }
                    }}
                >
                    {({ values, errors, touched, setFieldValue }) => (
                        <Form className={styles.form}>
                            {service.fields.map((f) => (
                                <div key={f.name} className={styles.field}>
                                    <label className={styles.label}>
                                        {f.label}
                                        {f.required && <span className={styles.req}> *</span>}
                                    </label>

                                    {f.type === "textarea" ? (
                                        <Textarea
                                            minRows={3}
                                            placeholder={f.placeholder}
                                            value={values[f.name]}
                                            onChange={(e) => setFieldValue(f.name, e.target.value)}
                                        />
                                    ) : f.type === "select" ? (
                                        <Select
                                            value={values[f.name] || null}
                                            onChange={(_, v) => setFieldValue(f.name, v ?? "")}
                                            placeholder={`Select ${f.label.toLowerCase()}`}
                                        >
                                            {(f.options ?? []).map((opt) => (
                                                <Option key={opt} value={opt}>{opt}</Option>
                                            ))}
                                        </Select>
                                    ) : (
                                        <Input
                                            type={f.type === "number" ? "number" : "text"}
                                            placeholder={f.placeholder}
                                            value={values[f.name]}
                                            onChange={(e) => setFieldValue(f.name, e.target.value)}
                                        />
                                    )}

                                    {touched[f.name] && errors[f.name] && (
                                        <span className={styles.error}>{errors[f.name] as string}</span>
                                    )}
                                </div>
                            ))}

                            <div className={styles.field}>
                                <label className={styles.label}>Output language</label>
                                <Select
                                    value={values.language}
                                    onChange={(_, v) => setFieldValue("language", v ?? "English")}
                                >
                                    {LANGUAGES.map((l) => (
                                        <Option key={l} value={l}>{l}</Option>
                                    ))}
                                </Select>
                            </div>

                            <div className={styles.footer}>
                                <div className={styles.total}>
                                    <span>Total</span>
                                    <strong>
                                        {price} tokens <small>{tokensToEuro(price)}</small>
                                    </strong>
                                </div>
                                <motion.div whileTap={{ scale: 0.98 }}>
                                    <ButtonUI type="submit" disabled={loading}>
                                        {loading ? "Processing…" : `Order — ${price} tokens`}
                                    </ButtonUI>
                                </motion.div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}
