import {
    ALLOWED_COUNTRIES,
    ALLOWED_COUNTRY_CODES,
    getCountryName,
} from "@/shared/constants/countries";

export interface RegistrationFormValues {
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
}

export interface RegistrationPayload {
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
}

export interface RegistrationValidationErrors {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    email?: string;
    phoneNumber?: string;
    street?: string;
    city?: string;
    country?: string;
    postCode?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
}

export const registrationInitialValues: RegistrationFormValues = {
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trim(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

function isRealDate(value: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = new Date(`${value}T00:00:00.000Z`);
    if (Number.isNaN(parsed.getTime())) return false;
    return parsed.toISOString().slice(0, 10) === value;
}

export function buildRegistrationPayload(
    values: RegistrationFormValues
): RegistrationPayload {
    return {
        firstName: trim(values.firstName),
        lastName: trim(values.lastName),
        dateOfBirth: trim(values.dateOfBirth),
        email: trim(values.email).toLowerCase(),
        phoneNumber: trim(values.phoneNumber),
        street: trim(values.street),
        city: trim(values.city),
        country: trim(values.country).toUpperCase(),
        postCode: trim(values.postCode),
        password: values.password,
    };
}

export function validateRegistrationValues(
    values: RegistrationFormValues
): RegistrationValidationErrors {
    const payload = buildRegistrationPayload(values);
    const errors: RegistrationValidationErrors = {};

    if (!payload.firstName) errors.firstName = "First name is required";
    if (!payload.lastName) errors.lastName = "Last name is required";
    if (!payload.dateOfBirth) {
        errors.dateOfBirth = "Date of birth is required";
    } else if (!isRealDate(payload.dateOfBirth)) {
        errors.dateOfBirth = "Enter a valid date of birth";
    } else if (new Date(`${payload.dateOfBirth}T00:00:00.000Z`) > new Date()) {
        errors.dateOfBirth = "Date of birth cannot be in the future";
    }

    if (!payload.email) {
        errors.email = "Email is required";
    } else if (!EMAIL_RE.test(payload.email)) {
        errors.email = "Enter a valid email address";
    }

    if (!payload.phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!payload.street) errors.street = "Street is required";
    if (!payload.city) errors.city = "City is required";
    if (!payload.country) {
        errors.country = "Country is required";
    } else if (!ALLOWED_COUNTRY_CODES.has(payload.country)) {
        errors.country = "Selected country is not supported";
    }
    if (!payload.postCode) errors.postCode = "Post code is required";
    if (!payload.password) errors.password = "Password is required";
    if (!values.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords do not match";
    }
    if (!values.terms) {
        errors.terms = "You must agree to the Terms and Conditions";
    }

    return errors;
}

export interface NormalizedRegistrationData {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    phoneNumber: string;
    street: string;
    city: string;
    country: string;
    postCode: string;
    password: string;
    name: string;
}

export function normalizeRegistrationPayload(
    input: unknown
): NormalizedRegistrationData {
    const payload = buildRegistrationPayload(input as RegistrationFormValues);
    const errors = validateRegistrationValues({
        ...registrationInitialValues,
        ...payload,
        confirmPassword: payload.password,
        terms: true,
    });

    const firstError = Object.values(errors).find(Boolean);
    if (firstError) {
        throw new Error(firstError);
    }

    return {
        ...payload,
        dateOfBirth: new Date(`${payload.dateOfBirth}T00:00:00.000Z`),
        country: payload.country,
        name: `${payload.firstName} ${payload.lastName}`.trim(),
    };
}

export function getAllowedCountryOptions() {
    return ALLOWED_COUNTRIES;
}

export function getCountryLabel(countryCode: string): string {
    return getCountryName(countryCode);
}
