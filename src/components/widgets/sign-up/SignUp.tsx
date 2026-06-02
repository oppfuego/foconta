"use client";

import React from "react";
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter, useSearchParams } from "next/navigation";
import {
    signUpValidation,
    signUpInitialValues,
    signUpOnSubmit,
} from "@/validationSchemas/sign-up/schema";
import InputUI from "@/components/ui/input/InputUI";
import SelectUI from "@/components/ui/select/SelectUI";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { COUNTRY_OPTIONS } from "@/resources/countries";
import { EXPERT_SPECIALIZATIONS } from "@/resources/specializations";
import { useUserContext } from "@/context/UserContext";
import styles from "./SignUp.module.scss";

export type SignUpValues = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    street: string;
    city: string;
    country: string;
    postCode: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
    role: "user" | "expert";
    specializations: string[];
    expertBio: string;
};

export default function SignUpPage() {
    const { showAlert } = useAlert();
    const router = useRouter();
    const { refreshUser } = useUserContext();
    const searchParams = useSearchParams();
    const initialRole = searchParams.get("role") === "expert" ? "expert" : "user";

    const initialValues: SignUpValues = {
        ...signUpInitialValues,
        role: initialRole,
        specializations: [],
        expertBio: "",
    };

    return (
        <Formik<SignUpValues>
            initialValues={initialValues}
            validate={signUpValidation}
            onSubmit={async (
                values,
                { setSubmitting }: FormikHelpers<SignUpValues>
            ) => signUpOnSubmit(values, { setSubmitting }, showAlert, router, refreshUser)}
        >
            {({ isSubmitting, values, setFieldValue }) => {
                const isExpert = values.role === "expert";
                const isButtonDisabled = isSubmitting || !values.terms;

                return (
                    <div className={styles.wrapper}>
                        <div className={styles.formContainer}>
                            <h2 className={styles.title}>Sign Up</h2>
                            <p className={styles.description}>Create your account</p>

                            <div className={styles.roleToggle}>
                                <button
                                    type="button"
                                    className={`${styles.roleBtn} ${!isExpert ? styles.active : ""}`}
                                    onClick={() => setFieldValue("role", "user")}
                                >
                                    As User
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.roleBtn} ${isExpert ? styles.active : ""}`}
                                    onClick={() => setFieldValue("role", "expert")}
                                >
                                    As Expert
                                </button>
                            </div>

                            <Form className={styles.formContent}>
                                <InputUI name="firstName" type="text" placeholder="First name" formik />
                                <InputUI name="lastName" type="text" placeholder="Last name" formik />
                                <InputUI name="dateOfBirth" type="date" placeholder="Date of birth" formik />
                                <InputUI name="email" type="email" placeholder="Email" formik />
                                <InputUI name="phoneNumber" type="text" placeholder="Phone number" formik />
                                <InputUI name="street" type="text" placeholder="Street" formik />
                                <InputUI name="city" type="text" placeholder="City" formik />
                                <SelectUI
                                    name="country"
                                    options={COUNTRY_OPTIONS.map((c) => ({ label: c, value: c }))}
                                    placeholder="Select your country"
                                    formik
                                />
                                <InputUI name="postCode" type="text" placeholder="Post code" formik />
                                <InputUI name="password" type="password" placeholder="Password" formik />
                                <InputUI name="confirmPassword" type="password" placeholder="Confirm password" formik />

                                {isExpert && (
                                    <div className={styles.expertFields}>
                                        <h3 className={styles.expertTitle}>Expert Details</h3>

                                        <div className={styles.specSection}>
                                            <label className={styles.specLabel}>Specializations *</label>
                                            <div className={styles.specGrid}>
                                                {EXPERT_SPECIALIZATIONS.map((spec) => (
                                                    <label key={spec} className={styles.specItem}>
                                                        <input
                                                            type="checkbox"
                                                            checked={values.specializations.includes(spec)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setFieldValue("specializations", [
                                                                        ...values.specializations,
                                                                        spec,
                                                                    ]);
                                                                } else {
                                                                    setFieldValue(
                                                                        "specializations",
                                                                        values.specializations.filter((s) => s !== spec)
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <span>{spec}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <ErrorMessage
                                                name="specializations"
                                                component="div"
                                                className={styles.errorText}
                                            />
                                        </div>

                                        <div className={styles.bioField}>
                                            <label className={styles.specLabel}>Bio</label>
                                            <Field
                                                as="textarea"
                                                name="expertBio"
                                                placeholder="Tell us about your expertise and experience..."
                                                className={styles.textarea}
                                                rows={3}
                                            />
                                        </div>

                                    </div>
                                )}

                                <div className={styles.termsBlock}>
                                    <label className={styles.termsLabel}>
                                        <Field type="checkbox" name="terms" />
                                        <span>
                                            I agree to the{" "}
                                            <a href="/terms-and-conditions" rel="noopener noreferrer">
                                                Terms & Conditions
                                            </a>
                                        </span>
                                    </label>
                                    <ErrorMessage name="terms" component="div" className={styles.errorText} />
                                </div>

                                <ButtonUI
                                    type="submit"
                                    text={isExpert ? "Register as Expert" : "Sign Up"}
                                    disabled={isButtonDisabled}
                                    loading={isSubmitting}
                                    fullWidth
                                />
                            </Form>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}
