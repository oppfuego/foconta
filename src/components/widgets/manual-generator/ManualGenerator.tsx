"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Input from "@mui/joy/Input";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ManualGenerator.module.scss";
import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";

// ✅ New pricing
const BASE_COST_BY_PLAN: Record<"ai" | "reviewed", number> = {
    ai: 1500,       // AI generation
    reviewed: 5000, // Human-written / reviewed
};

// ✅ Updated language add-on (was 5, scaled up ~187.5 -> rounded)
const LANGUAGES = [
    { value: "English", label: "English (default)", cost: 0 },
    { value: "Ukrainian", label: "Українська", cost: 200 },
    { value: "German", label: "Deutsch", cost: 200 },
    { value: "French", label: "Français", cost: 200 },
    { value: "Spanish", label: "Español", cost: 200 },
];

// ✅ Updated extras (scaled from old costs by ~37.5 and rounded)
const EXTRAS = [
    { name: "marketingStrategy", label: "Marketing Strategy", cost: 400 },         // 10 -> 375 -> 400
    { name: "financialProjection", label: "3-Year Financial Forecast", cost: 600 },// 15 -> 562.5 -> 600
    { name: "riskAnalysis", label: "Risk & Mitigation Plan", cost: 300 },          // 8 -> 300
    { name: "growthRoadmap", label: "Growth Roadmap", cost: 400 },                 // 10 -> 375 -> 400
    { name: "competitorReview", label: "Competitor Analysis", cost: 275 },         // 7 -> 262.5 -> 275
    { name: "pitchDeck", label: "Investor Pitch Deck", cost: 600 },                // 15 -> 562.5 -> 600
    { name: "brandingGuide", label: "Branding & Visual Identity", cost: 450 },     // 12 -> 450
    { name: "teamStructure", label: "Organizational Structure", cost: 300 },       // 8 -> 300
    { name: "customerJourney", label: "Customer Journey Map", cost: 400 },         // 10 -> 375 -> 400
    { name: "salesForecast", label: "Sales Forecast", cost: 450 },                 // 12 -> 450
    { name: "fundingPlan", label: "Funding Strategy", cost: 350 },                 // 9 -> 337.5 -> 350
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
}

const stepVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -60, transition: { duration: 0.3 } },
};

const BusinessGeneratorForm = () => {
    const { showAlert } = useAlert();
    const user = useUser();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

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
    };

    const mockData: FormValues = {
        businessName: "EcoGrow Solutions",
        niche: "Sustainable Agriculture",
        businessType: "AgroTech SaaS",
        teamSize: "12",
        budget: "$100,000",
        marketDescription:
            "Farmers and agribusinesses in EU markets seeking eco-efficient yield optimization.",
        productDescription:
            "AI platform for soil & crop monitoring with satellite and IoT data fusion.",
        uniqueValue:
            "Automated sustainability insights and actionable tasks to cut waste by 15–25%.",
        customerPain:
            "Lack of affordable, easy-to-use tools to predict yield and reduce resource waste.",
        goal: "Attract investors and secure pilots with 5 enterprise clients.",
        planType: "ai",
        language: "English",
        extras: ["marketingStrategy", "financialProjection", "pitchDeck", "growthRoadmap"],
    };

    const handleNext = () => setStep((s) => Math.min(5, s + 1));
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
                    };

                    const res = await fetch("/api/universal/create-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(payload),
                    });
                    const data = await res.json();

                    if (res.ok)
                        showAlert("Success", "Business plan generated successfully!", "success");
                    else showAlert("Error", data.message || "Failed to generate", "error");
                } catch {
                    showAlert("Error", "Network or server issue", "error");
                } finally {
                    setLoading(false);
                }
            }}
        >
            {({ values, setFieldValue, setValues }) => {
                const baseTokens = BASE_COST_BY_PLAN[values.planType];
                const extraCost = calcExtraCost(values.extras);
                const languageCost = calcLanguageCost(values.language);
                const totalTokens = baseTokens + extraCost + languageCost;

                return (
                    <Form className={styles.form}>
                        <header className={styles.header}>
                            <motion.h2
                                key={step}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                Business Plan Generator
                            </motion.h2>
                            <p>Step {step} of 5</p>
                        </header>

                        {/* 🧪 Mock Data */}
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <ButtonUI
                                type="button"
                                variant="outline"
                                color="secondary"
                                onClick={() => setValues(mockData)}
                            >
                                🧪 Fill with Mock Data
                            </ButtonUI>
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    variants={stepVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className={styles.step}
                                >
                                    <h3>Basic Information</h3>
                                    <div className={styles.row}>
                                        <Field name="businessName" as={Input} placeholder="Business Name" />
                                        <Field name="niche" as={Input} placeholder="Niche / Industry" />
                                    </div>
                                    <Field
                                        name="businessType"
                                        as={Input}
                                        placeholder="Business Type (e.g. SaaS, Retail, Services)"
                                    />
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    variants={stepVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className={styles.step}
                                >
                                    <h3>Team & Market</h3>
                                    <div className={styles.row}>
                                        <Field name="teamSize" as={Input} placeholder="Team Size (e.g. 5)" />
                                        <Field name="budget" as={Input} placeholder="Budget (e.g. $50,000)" />
                                    </div>
                                    <Field
                                        name="marketDescription"
                                        as={Input}
                                        placeholder="Target Market Description"
                                    />
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    variants={stepVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className={styles.step}
                                >
                                    <h3>Product Details</h3>
                                    <Field
                                        name="productDescription"
                                        as={Input}
                                        placeholder="Product / Service Description"
                                    />
                                    <Field name="uniqueValue" as={Input} placeholder="Unique Value Proposition" />
                                    <Field name="customerPain" as={Input} placeholder="Customer Pain / Problem" />
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    variants={stepVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className={styles.step}
                                >
                                    <h3>Goal & Settings</h3>
                                    <Field name="goal" as={Input} placeholder="Main Goal (e.g. attract investors)" />
                                    <div className={styles.row}>
                                        <div className={styles.inputGroup}>
                                            <label>Language</label>
                                            <Select
                                                value={values.language}
                                                onChange={(_, v) => setFieldValue("language", v || "English")}
                                            >
                                                {LANGUAGES.map((lang) => (
                                                    <Option key={lang.value} value={lang.value}>
                                                        {lang.label}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>

                                        <div className={styles.inputGroup}>
                                            <label>Plan Type</label>
                                            <Select
                                                value={values.planType}
                                                onChange={(_, v) => setFieldValue("planType", (v || "ai") as FormValues["planType"])}
                                            >
                                                <Option value="ai">AI Instant (1500 tokens)</Option>
                                                <Option value="reviewed">Human-written (5000 tokens)</Option>
                                            </Select>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div
                                    key="step5"
                                    variants={stepVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className={styles.step}
                                >
                                    <h3>Additional Modules</h3>
                                    <div className={styles.optionsGrid}>
                                        {EXTRAS.map((opt) => (
                                            <motion.label
                                                key={opt.name}
                                                className={`${styles.option} ${
                                                    values.extras.includes(opt.name) ? styles.active : ""
                                                }`}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={values.extras.includes(opt.name)}
                                                    onChange={(e) => {
                                                        if (e.target.checked)
                                                            setFieldValue("extras", [...values.extras, opt.name]);
                                                        else
                                                            setFieldValue(
                                                                "extras",
                                                                values.extras.filter((x) => x !== opt.name)
                                                            );
                                                    }}
                                                />
                                                <span>{opt.label}</span>
                                                <strong>+{opt.cost}</strong>
                                            </motion.label>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className={styles.nav}>
                            {step > 1 && (
                                <ButtonUI type="button" variant="outline" color="secondary" onClick={handlePrev}>
                                    ← Back
                                </ButtonUI>
                            )}
                            {step < 5 && (
                                <ButtonUI type="button" color="primary" variant="solid" onClick={handleNext}>
                                    Next →
                                </ButtonUI>
                            )}
                            {step === 5 && (
                                <ButtonUI type="submit" color="primary" variant="solid" loading={loading}>
                                    Generate Business Plan
                                </ButtonUI>
                            )}
                        </div>

                        <motion.div
                            className={styles.tokenBar}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <p>
                                Base: {baseTokens} | Extras: +{extraCost} | Language: +{languageCost}
                            </p>
                            <h4>
                                Total: <span>{totalTokens}</span> tokens
                            </h4>
                        </motion.div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default BusinessGeneratorForm;