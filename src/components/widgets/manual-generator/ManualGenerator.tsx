"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ManualGenerator.module.scss";
import { useAlert } from "@/context/AlertContext";
import { useUser, useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { EXPERT_SPECIALIZATIONS } from "@/resources/specializations";
import { FaCheck, FaRobot, FaUserTie } from "react-icons/fa";

const BASE_COST_BY_PLAN: Record<"ai" | "reviewed", number> = {
    ai: 1500,
    reviewed: 5000,
};

const LANGUAGES = [
    { value: "English", label: "English (default)", cost: 0 },
    { value: "Ukrainian", label: "Українська", cost: 200 },
    { value: "German", label: "Deutsch", cost: 200 },
    { value: "French", label: "Français", cost: 200 },
    { value: "Spanish", label: "Español", cost: 200 },
];

const EXTRAS = [
    { name: "marketingStrategy", label: "Marketing Strategy", cost: 400 },
    { name: "financialProjection", label: "3-Year Financial Forecast", cost: 600 },
    { name: "riskAnalysis", label: "Risk & Mitigation Plan", cost: 300 },
    { name: "growthRoadmap", label: "Growth Roadmap", cost: 400 },
    { name: "competitorReview", label: "Competitor Analysis", cost: 275 },
    { name: "pitchDeck", label: "Investor Pitch Deck", cost: 600 },
    { name: "brandingGuide", label: "Branding & Visual Identity", cost: 450 },
    { name: "teamStructure", label: "Organizational Structure", cost: 300 },
    { name: "customerJourney", label: "Customer Journey Map", cost: 400 },
    { name: "salesForecast", label: "Sales Forecast", cost: 450 },
    { name: "fundingPlan", label: "Funding Strategy", cost: 350 },
];

const STEP_LABELS = [
    "Basic Info",
    "Team & Market",
    "Product",
    "Plan Settings",
    "Extras",
    "Review",
];

const schema = Yup.object().shape({
    businessName: Yup.string().required("Required"),
    niche: Yup.string().required("Required"),
    businessType: Yup.string().required("Required"),
    goal: Yup.string().required("Required"),
});

interface FormValues {
    businessName: string;
    niche: string;
    businessType: string;
    teamSize: string;
    budget: string;
    marketDescription: string;
    productDescription: string;
    uniqueValue: string;
    customerPain: string;
    goal: string;
    planType: "ai" | "reviewed";
    language: string;
    extras: string[];
    specialization: string;
}

const stepVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -60, transition: { duration: 0.3 } },
};

const BusinessGeneratorForm = () => {
    const { showAlert } = useAlert();
    const user = useUser();
    const { refreshUser } = useUserContext();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const totalSteps = STEP_LABELS.length;

    const initialValues: FormValues = {
        businessName: "",
        niche: "",
        businessType: "",
        teamSize: "",
        budget: "",
        marketDescription: "",
        productDescription: "",
        uniqueValue: "",
        customerPain: "",
        goal: "",
        planType: "ai",
        language: "English",
        extras: [],
        specialization: "",
    };

    const handleNext = () => setStep((s) => Math.min(totalSteps, s + 1));
    const handlePrev = () => setStep((s) => Math.max(1, s - 1));

    const calcExtraCost = (extras: string[]) =>
        extras.reduce((sum, name) => {
            const e = EXTRAS.find((o) => o.name === name);
            return sum + (e?.cost || 0);
        }, 0);

    const calcLanguageCost = (language: string) => {
        const l = LANGUAGES.find((x) => x.value === language);
        return l?.cost || 0;
    };

    return (
        <Formik<FormValues>
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (values) => {
                setLoading(true);
                try {
                    const baseTokens = BASE_COST_BY_PLAN[values.planType];
                    const extraCost = calcExtraCost(values.extras);
                    const languageCost = calcLanguageCost(values.language);
                    const totalTokens = baseTokens + extraCost + languageCost;

                    const payload = {
                        category: "business",
                        planType: values.planType === "reviewed" ? "reviewed" : "default",
                        language: values.language,
                        extras: values.extras,
                        totalTokens,
                        email: user?.email,
                        fields: { ...values },
                        specialization: values.specialization || undefined,
                    };

                    const res = await fetch("/api/universal/create-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(payload),
                    });
                    const data = await res.json();

                    if (res.ok) {
                        if (values.planType === "reviewed") {
                            showAlert(
                                "Order Placed!",
                                "An expert will prepare your business plan. You'll be notified when it's ready.",
                                "success"
                            );
                        } else {
                            showAlert("Success", "Business plan generated successfully!", "success");
                        }
                        refreshUser();
                        setTimeout(() => router.push("/profile"), 1500);
                    } else {
                        showAlert("Error", data.message || "Failed to generate", "error");
                        setLoading(false);
                    }
                } catch {
                    showAlert("Error", "Network or server issue", "error");
                    setLoading(false);
                }
            }}
        >
            {({ values, setFieldValue }) => {
                const baseTokens = BASE_COST_BY_PLAN[values.planType];
                const extraCost = calcExtraCost(values.extras);
                const languageCost = calcLanguageCost(values.language);
                const totalTokens = baseTokens + extraCost + languageCost;

                return (
                    <Form className={styles.form}>
                        {/* Header */}
                        <header className={styles.header}>
                            <motion.h2
                                key={step}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                Business Plan Generator
                            </motion.h2>
                            <p className={styles.subtitle}>
                                Create a professional business plan in minutes
                            </p>
                        </header>

                        {/* Step Progress */}
                        <div className={styles.progressBar}>
                            {STEP_LABELS.map((label, idx) => {
                                const stepNum = idx + 1;
                                const isActive = step === stepNum;
                                const isCompleted = step > stepNum;
                                return (
                                    <div
                                        key={label}
                                        className={`${styles.progressStep} ${isActive ? styles.active : ""} ${isCompleted ? styles.completed : ""}`}
                                        onClick={() => setStep(stepNum)}
                                    >
                                        <div className={styles.progressCircle}>
                                            {isCompleted ? <FaCheck size={12} /> : stepNum}
                                        </div>
                                        <span className={styles.progressLabel}>{label}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Steps */}
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className={styles.step}>
                                    <h3>Basic Information</h3>
                                    <p className={styles.stepHint}>Tell us about your business idea</p>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>Business Name *</label>
                                        <Field name="businessName" as={Input} placeholder="e.g. EcoGrow Solutions" size="lg" />
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.fieldGroup}>
                                            <label className={styles.fieldLabel}>Niche / Industry *</label>
                                            <Field name="niche" as={Input} placeholder="e.g. Sustainable Agriculture" size="lg" />
                                        </div>
                                        <div className={styles.fieldGroup}>
                                            <label className={styles.fieldLabel}>Business Type *</label>
                                            <Field name="businessType" as={Input} placeholder="e.g. SaaS, Retail, Services" size="lg" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className={styles.step}>
                                    <h3>Team & Market</h3>
                                    <p className={styles.stepHint}>Describe your team and target market</p>
                                    <div className={styles.row}>
                                        <div className={styles.fieldGroup}>
                                            <label className={styles.fieldLabel}>Team Size</label>
                                            <Field name="teamSize" as={Input} placeholder="e.g. 5" size="lg" />
                                        </div>
                                        <div className={styles.fieldGroup}>
                                            <label className={styles.fieldLabel}>Budget</label>
                                            <Field name="budget" as={Input} placeholder="e.g. $50,000" size="lg" />
                                        </div>
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>Target Market Description</label>
                                        <Field name="marketDescription" as={Textarea} placeholder="Describe your target audience and market opportunity..." minRows={3} size="lg" />
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className={styles.step}>
                                    <h3>Product Details</h3>
                                    <p className={styles.stepHint}>What makes your product or service unique?</p>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>Product / Service Description</label>
                                        <Field name="productDescription" as={Textarea} placeholder="Describe what you offer..." minRows={3} size="lg" />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>Unique Value Proposition</label>
                                        <Field name="uniqueValue" as={Input} placeholder="What sets you apart from competitors?" size="lg" />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>Customer Pain / Problem</label>
                                        <Field name="customerPain" as={Input} placeholder="What problem do you solve?" size="lg" />
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className={styles.step}>
                                    <h3>Goal & Plan Settings</h3>
                                    <p className={styles.stepHint}>Choose how you want your plan created</p>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>Main Goal *</label>
                                        <Field name="goal" as={Input} placeholder="e.g. Attract investors, launch MVP" size="lg" />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>Language</label>
                                        <Select
                                            value={values.language}
                                            onChange={(_, v) => setFieldValue("language", v || "English")}
                                            size="lg"
                                        >
                                            {LANGUAGES.map((lang) => (
                                                <Option key={lang.value} value={lang.value}>
                                                    {lang.label} {lang.cost > 0 && `(+${lang.cost})`}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>

                                    <label className={styles.fieldLabel}>Plan Type</label>
                                    <div className={styles.planTypeGrid}>
                                        <div
                                            className={`${styles.planTypeCard} ${values.planType === "ai" ? styles.planTypeActive : ""}`}
                                            onClick={() => setFieldValue("planType", "ai")}
                                        >
                                            <FaRobot className={styles.planTypeIcon} />
                                            <div className={styles.planTypeContent}>
                                                <h4>AI-Generated Plan</h4>
                                                <p>Instant delivery, powered by AI</p>
                                                <span className={styles.planTypeCost}>{BASE_COST_BY_PLAN.ai} tokens</span>
                                            </div>
                                        </div>
                                        <div
                                            className={`${styles.planTypeCard} ${values.planType === "reviewed" ? styles.planTypeActive : ""}`}
                                            onClick={() => setFieldValue("planType", "reviewed")}
                                        >
                                            <FaUserTie className={styles.planTypeIcon} />
                                            <div className={styles.planTypeContent}>
                                                <h4>Expert-Written Plan</h4>
                                                <p>Crafted by a professional (1-3 days)</p>
                                                <span className={styles.planTypeCost}>{BASE_COST_BY_PLAN.reviewed} tokens</span>
                                            </div>
                                        </div>
                                    </div>

                                    {values.planType === "reviewed" && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className={styles.fieldGroup}
                                        >
                                            <label className={styles.fieldLabel}>Specialization</label>
                                            <p className={styles.stepHint}>Choose the type of expert you'd like</p>
                                            <Select
                                                value={values.specialization}
                                                onChange={(_, v) => setFieldValue("specialization", v || "")}
                                                placeholder="Select a specialization..."
                                                size="lg"
                                            >
                                                {EXPERT_SPECIALIZATIONS.map((spec) => (
                                                    <Option key={spec} value={spec}>{spec}</Option>
                                                ))}
                                            </Select>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div key="step5" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className={styles.step}>
                                    <h3>Additional Modules</h3>
                                    <p className={styles.stepHint}>Enhance your plan with extra sections</p>
                                    <div className={styles.optionsGrid}>
                                        {EXTRAS.map((opt) => (
                                            <motion.label
                                                key={opt.name}
                                                className={`${styles.option} ${
                                                    values.extras.includes(opt.name) ? styles.active : ""
                                                }`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={values.extras.includes(opt.name)}
                                                    onChange={(e) => {
                                                        if (e.target.checked)
                                                            setFieldValue("extras", [...values.extras, opt.name]);
                                                        else
                                                            setFieldValue("extras", values.extras.filter((x) => x !== opt.name));
                                                    }}
                                                />
                                                <span>{opt.label}</span>
                                                <strong>+{opt.cost}</strong>
                                            </motion.label>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 6 && (
                                <motion.div key="step6" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className={styles.step}>
                                    <h3>Review Your Order</h3>
                                    <p className={styles.stepHint}>Make sure everything looks good before submitting</p>
                                    <div className={styles.reviewGrid}>
                                        <div className={styles.reviewItem}>
                                            <span className={styles.reviewLabel}>Business Name</span>
                                            <span className={styles.reviewValue}>{values.businessName || "—"}</span>
                                        </div>
                                        <div className={styles.reviewItem}>
                                            <span className={styles.reviewLabel}>Niche</span>
                                            <span className={styles.reviewValue}>{values.niche || "—"}</span>
                                        </div>
                                        <div className={styles.reviewItem}>
                                            <span className={styles.reviewLabel}>Business Type</span>
                                            <span className={styles.reviewValue}>{values.businessType || "—"}</span>
                                        </div>
                                        <div className={styles.reviewItem}>
                                            <span className={styles.reviewLabel}>Goal</span>
                                            <span className={styles.reviewValue}>{values.goal || "—"}</span>
                                        </div>
                                        <div className={styles.reviewItem}>
                                            <span className={styles.reviewLabel}>Plan Type</span>
                                            <span className={styles.reviewValue}>
                                                {values.planType === "reviewed" ? "Expert-Written" : "AI-Generated"}
                                            </span>
                                        </div>
                                        <div className={styles.reviewItem}>
                                            <span className={styles.reviewLabel}>Language</span>
                                            <span className={styles.reviewValue}>{values.language}</span>
                                        </div>
                                        {values.planType === "reviewed" && values.specialization && (
                                            <div className={styles.reviewItem}>
                                                <span className={styles.reviewLabel}>Specialization</span>
                                                <span className={styles.reviewValue}>{values.specialization}</span>
                                            </div>
                                        )}
                                        {values.extras.length > 0 && (
                                            <div className={`${styles.reviewItem} ${styles.reviewFull}`}>
                                                <span className={styles.reviewLabel}>Extras</span>
                                                <span className={styles.reviewValue}>
                                                    {values.extras.map((e) => EXTRAS.find((o) => o.name === e)?.label).join(", ")}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className={styles.nav}>
                            {step > 1 && (
                                <ButtonUI type="button" variant="outlined" color="secondary" onClick={handlePrev}>
                                    Back
                                </ButtonUI>
                            )}
                            <div className={styles.navSpacer} />
                            {step < totalSteps && (
                                <ButtonUI type="button" color="primary" variant="solid" onClick={handleNext}>
                                    Next
                                </ButtonUI>
                            )}
                            {step === totalSteps && (
                                <ButtonUI type="submit" color="primary" variant="solid" loading={loading} disabled={loading}>
                                    {loading
                                        ? values.planType === "reviewed"
                                            ? "Placing Order..."
                                            : "Generating..."
                                        : values.planType === "reviewed"
                                            ? "Place Expert Order"
                                            : "Generate Business Plan"
                                    }
                                </ButtonUI>
                            )}
                        </div>

                        {/* Token Summary Bar */}
                        <motion.div
                            className={styles.tokenBar}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className={styles.tokenDetails}>
                                <span>Base: {baseTokens}</span>
                                <span>Extras: +{extraCost}</span>
                                <span>Language: +{languageCost}</span>
                            </div>
                            <div className={styles.tokenTotal}>
                                Total: <strong>{totalTokens}</strong> tokens
                            </div>
                        </motion.div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default BusinessGeneratorForm;
