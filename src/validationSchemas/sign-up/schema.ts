import { AlertColor } from "@mui/material/Alert";
import { RESTRICTED_COUNTRY_NAMES, isAllowedCountry } from "@/resources/countries";
import type { SignUpValues } from "@/components/widgets/sign-up/SignUp";

export const signUpInitialValues: SignUpValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    country: "",
    postCode: "",
    password: "",
    confirmPassword: "",
    terms: false,
};

type SignUpErrors = Partial<Record<keyof SignUpValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trim(value: string) {
    return value.trim();
}

function isValidDate(value: string) {
    if (!value) return false;
    const parsed = new Date(value);
    return !Number.isNaN(parsed.getTime());
}

export const signUpValidation = (values: SignUpValues) => {
    const errors: SignUpErrors = {};

    if (!trim(values.firstName)) errors.firstName = "Required";
    if (!trim(values.lastName)) errors.lastName = "Required";
    if (!trim(values.dateOfBirth)) {
        errors.dateOfBirth = "Required";
    } else if (!isValidDate(values.dateOfBirth)) {
        errors.dateOfBirth = "Enter a valid date";
    }

    if (!trim(values.email)) {
        errors.email = "Required";
    } else if (!emailPattern.test(trim(values.email))) {
        errors.email = "Enter a valid email";
    }

    if (!trim(values.phoneNumber)) errors.phoneNumber = "Required";
    if (!trim(values.street)) errors.street = "Required";
    if (!trim(values.city)) errors.city = "Required";

    if (!trim(values.country)) {
        errors.country = "Required";
    } else if (!isAllowedCountry(values.country) || RESTRICTED_COUNTRY_NAMES.has(values.country)) {
        errors.country = "Select a supported country";
    }

    if (!trim(values.postCode)) errors.postCode = "Required";

    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords must match";
    }

    if (!values.terms) {
        errors.terms = "You must agree to the Terms and Conditions";
    }

    return errors;
};

function buildPayload(values: SignUpValues) {
    return {
        firstName: trim(values.firstName),
        lastName: trim(values.lastName),
        dateOfBirth: values.dateOfBirth,
        email: trim(values.email).toLowerCase(),
        phoneNumber: trim(values.phoneNumber),
        street: trim(values.street),
        city: trim(values.city),
        country: trim(values.country),
        postCode: trim(values.postCode),
        password: values.password,
    };
}

export const signUpOnSubmit = async (
    values: SignUpValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    showAlert: (msg: string, desc?: string, severity?: AlertColor) => void,
    router: { replace: (url: string) => void; refresh: () => void }
) => {
    try {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(buildPayload(values)),
        });
        const data = await res.json();

        if (res.ok && data?.user) {
            showAlert("Registration successful!", "", "success");
            router.replace("/");
            router.refresh();
        } else {
            showAlert(data?.message || "Registration failed", "", "error");
        }
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Network error";
        showAlert(message, "", "error");
    } finally {
        setSubmitting(false);
    }
};
