import { AlertColor } from "@mui/material/Alert";
import {
    buildRegistrationPayload,
    getAllowedCountryOptions,
    registrationInitialValues,
    validateRegistrationValues,
} from "@/shared/auth/registration";

export const signUpInitialValues = registrationInitialValues;

export const signUpCountryOptions = getAllowedCountryOptions().map((country) => ({
    value: country.code,
    label: country.name,
}));

export const signUpValidation = validateRegistrationValues;

export const signUpOnSubmit = async (
    values: typeof signUpInitialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    showAlert: (msg: string, desc?: string, severity?: AlertColor) => void,
    router: { replace: (url: string) => void; refresh: () => void }
) => {
    try {
        const payload = buildRegistrationPayload(values);
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
        });
        const data = await res.json();

        if (res.ok && data?.user) {
            showAlert("Registration successful!", "", "success");
            router.replace("/");
            router.refresh();
        } else {
            showAlert(data?.message || "Registration failed", "", "error");
        }
    } catch (e: any) {
        showAlert(e?.message || "Network error", "", "error");
    } finally {
        setSubmitting(false);
    }
};
