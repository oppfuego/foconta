"use client";

import { Formik, FormikHelpers } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import {
    signUpValidation,
    signUpInitialValues,
    signUpOnSubmit,
} from "@/validationSchemas/sign-up/schema";
import FormUI from "@/components/ui/form/FormUI";
import { COUNTRY_OPTIONS } from "@/resources/countries";

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
};

export default function SignUpPage() {
    const { showAlert } = useAlert();
    const router = useRouter();

    return (
        <Formik<SignUpValues>
            initialValues={signUpInitialValues}
            validate={signUpValidation}
            onSubmit={async (
                values,
                { setSubmitting }: FormikHelpers<SignUpValues>
            ) => signUpOnSubmit(values, { setSubmitting }, showAlert, router)}
        >
            {({ isSubmitting }) => (
                <FormUI
                    title="Sign Up"
                    description="Create your account"
                    isSubmitting={isSubmitting}
                    fields={[
                        { name: "firstName", type: "text", placeholder: "First name" },
                        { name: "lastName", type: "text", placeholder: "Last name" },
                        { name: "dateOfBirth", type: "date", placeholder: "Date of birth" },
                        { name: "email", type: "email", placeholder: "Email" },
                        { name: "phoneNumber", type: "text", placeholder: "Phone number" },
                        { name: "street", type: "text", placeholder: "Street" },
                        { name: "city", type: "text", placeholder: "City" },
                        {
                            name: "country",
                            type: "select",
                            placeholder: "Select your country",
                            options: COUNTRY_OPTIONS.map((country) => ({
                                label: country,
                                value: country,
                            })),
                        },
                        { name: "postCode", type: "text", placeholder: "Post code" },
                        { name: "password", type: "password", placeholder: "Password" },
                        {
                            name: "confirmPassword",
                            type: "password",
                            placeholder: "Confirm password",
                        },
                    ]}
                    submitLabel="Sign Up"
                    showTerms
                />
            )}
        </Formik>
    );
}
