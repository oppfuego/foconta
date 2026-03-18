"use client";

import { Formik, FormikHelpers } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import {
    signUpValidation,
    signUpInitialValues,
    signUpOnSubmit,
    signUpCountryOptions,
} from "@/validationSchemas/sign-up/schema";
import FormUI from "@/components/ui/form/FormUI";

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
                        { name: "firstName", label: "First name", type: "text", placeholder: "Enter your first name" },
                        { name: "lastName", label: "Last name", type: "text", placeholder: "Enter your last name" },
                        { name: "dateOfBirth", label: "Date of birth", type: "date", placeholder: "Select your date of birth" },
                        { name: "email", label: "Email", type: "email", placeholder: "Enter your email address" },
                        { name: "phoneNumber", label: "Phone number", type: "text", placeholder: "Enter your phone number" },
                        { name: "street", label: "Street", type: "text", placeholder: "Enter your street address" },
                        { name: "city", label: "City", type: "text", placeholder: "Enter your city" },
                        {
                            name: "country",
                            label: "Country",
                            type: "select",
                            placeholder: "Select your country",
                            options: signUpCountryOptions,
                        },
                        { name: "postCode", label: "Post code", type: "text", placeholder: "Enter your post code" },
                        { name: "password", label: "Password", type: "password", placeholder: "Create a password" },
                        { name: "confirmPassword", label: "Confirm password", type: "password", placeholder: "Re-enter your password" },
                    ]}
                    submitLabel="Sign Up"
                    showTerms // ✅ додає чекбокс і блокує кнопку
                />
            )}
        </Formik>
    );
}
