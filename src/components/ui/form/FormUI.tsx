"use client";
import React from "react";
import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import styles from "./FormUI.module.scss";
import InputUI from "@/components/ui/input/InputUI";
import ButtonUI from "@/components/ui/button/ButtonUI";
import SelectUI from "@/components/ui/select/SelectUI";

interface FieldConfig {
    name: string;
    type: string;
    label?: string;
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
}

interface FormUIProps {
    title: string;
    description?: string;
    isSubmitting?: boolean;
    fields?: FieldConfig[];
    submitLabel?: string;
    showTerms?: boolean;
}

const defaultFields: FieldConfig[] = [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
];

const FormUI: React.FC<FormUIProps> = ({
                                           title,
                                           description,
                                           isSubmitting,
                                           fields = defaultFields,
                                           submitLabel = "Sign In",
                                           showTerms = false,
                                       }) => {
    const { values } = useFormikContext<any>();

    const isButtonDisabled =
        isSubmitting || (showTerms ? !values.terms : false);

    return (
        <div className={styles.wrapper}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>{title}</h2>
                {description && <p className={styles.description}>{description}</p>}

                    <Form className={styles.formContent}>
                    {fields.map((field) => (
                        <div key={field.name} className={styles.fieldBlock}>
                            {field.label && (
                                <label className={styles.fieldLabel} htmlFor={field.name}>
                                    {field.label}
                                </label>
                            )}
                            {field.type === "select" ? (
                                <SelectUI
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    options={field.options || []}
                                    formik
                                />
                            ) : (
                                <InputUI
                                    id={field.name}
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    formik
                                />
                            )}
                        </div>
                    ))}

                    {showTerms && (
                        <div className={styles.termsBlock}>
                            <label className={styles.termsLabel}>
                                <Field type="checkbox" name="terms" />
                                <span>
                  I agree to the{" "}
                                    <a
                                        href="/terms-and-conditions"
                                        rel="noopener noreferrer"
                                    >
                    Terms & Conditions
                  </a>
                </span>
                            </label>
                            <ErrorMessage
                                name="terms"
                                component="div"
                                className={styles.errorText}
                            />
                        </div>
                    )}

                    <ButtonUI
                        type="submit"
                        text={submitLabel}
                        disabled={isButtonDisabled}
                        loading={isSubmitting}
                        fullWidth
                        sx={{
                            marginTop: "16px",
                            borderRadius: "12px",
                            fontWeight: 700,
                            fontSize: "1rem",
                            padding: "14px",
                            background: "var(--primary-color)",
                            color: "#fff",
                            transition: "all 0.25s ease",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                background: "var(--secondary-color)",
                                color: "var(--text-accent)",
                            },
                        }}
                    />
                </Form>
            </div>
        </div>
    );
};

export default FormUI;
