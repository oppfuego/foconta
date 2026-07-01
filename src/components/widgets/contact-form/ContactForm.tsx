"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { motion, useReducedMotion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { validationSchema, initialValues, sendContactRequest } from "./schema";
import { useAlert } from "@/context/AlertContext";
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE } from "@/resources/constants";
import styles from "./ContactForm.module.scss";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";

interface ContactFormValues {
    name: string;
    secondName: string;
    email: string;
    phone: string;
    message?: string;
}

const ContactForm: React.FC = () => {
    const { showAlert } = useAlert();
    const [successMsg, setSuccessMsg] = useState("");
    const reduce = useReducedMotion();

    const handleSubmit = async (
        values: ContactFormValues,
        { setSubmitting, resetForm }: FormikHelpers<ContactFormValues>
    ) => {
        try {
            await sendContactRequest(values);
            resetForm();
            setSuccessMsg("Message sent successfully — we'll reply within 24 hours.");
            showAlert("Success", "Your message has been sent!", "success");
        } catch {
            showAlert("Error", "Something went wrong. Try again.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className={styles.section}>
            <SectionHeading
                eyebrow="Talk to us"
                title="Contact Our Team"
                description="Have a question about our plans or need tailored advice? Our experts typically respond within 24 hours."
                align="center"
            />

            <div className={styles.grid}>
                <motion.div
                    className={styles.infoBlock}
                    initial={reduce ? undefined : { opacity: 0, x: -30 }}
                    whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.infoBorder} aria-hidden />
                    <h3 className={styles.infoTitle}>Get in touch</h3>
                    <p className={styles.subtext}>
                        We&apos;re here to answer your questions and help you find the right solution for your needs.
                    </p>

                    <ul className={styles.infoList}>
                        <li className={styles.infoItem}>
                            <span className={styles.infoIcon}><FaMapMarkerAlt /></span>
                            <span>{COMPANY_ADDRESS}</span>
                        </li>
                        <li className={styles.infoItem}>
                            <span className={styles.infoIcon}><FaEnvelope /></span>
                            <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
                        </li>
                        <li className={styles.infoItem}>
                            <span className={styles.infoIcon}><FaPhoneAlt /></span>
                            <a href={`tel:${COMPANY_PHONE}`}>{COMPANY_PHONE}</a>
                        </li>
                    </ul>

                    <div className={styles.infoGlow} aria-hidden />
                </motion.div>

                <motion.div
                    className={styles.formBlock}
                    initial={reduce ? undefined : { opacity: 0, x: 30 }}
                    whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                    {successMsg ? (
                        <div className={styles.successMsg}>{successMsg}</div>
                    ) : (
                        <Formik<ContactFormValues>
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className={styles.form}>
                                    <div className={styles.row}>
                                        <FloatingField name="name" label="First name" />
                                        <FloatingField name="secondName" label="Last name" />
                                    </div>
                                    <FloatingField name="email" label="Email address" type="email" />
                                    <FloatingField name="phone" label="Phone number" type="tel" />
                                    <FloatingField name="message" label="Your message" as="textarea" rows={5} />

                                    <ButtonUI
                                        type="submit"
                                        fullWidth
                                        loading={isSubmitting}
                                        text="Send Message"
                                        color="secondary"
                                        textColor="backgroundLight"
                                    />
                                </Form>
                            )}
                        </Formik>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

function FloatingField({
    name,
    label,
    type = "text",
    as = "input",
    rows,
}: {
    name: string;
    label: string;
    type?: string;
    as?: "input" | "textarea";
    rows?: number;
}) {
    return (
        <label className={`${styles.floating} ${as === "textarea" ? styles.floatingTextarea : ""}`}>
            <Field
                as={as}
                name={name}
                type={as === "input" ? type : undefined}
                rows={rows}
                placeholder=" "
                className={styles.input}
            />
            <span className={styles.floatingLabel}>{label}</span>
            <span className={styles.focusRing} aria-hidden />
        </label>
    );
}

export default ContactForm;
