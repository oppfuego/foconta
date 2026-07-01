// Company details — ALL sourced from env. No hardcoded fallbacks so a
// misconfigured deployment fails loudly instead of shipping stale strings.
// If you need to change any of these, update `.env`, not this file.
export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME;
export const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_ADDRESS;
export const COMPANY_PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE;
export const COMPANY_LEGAL_NAME = process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME;
export const COMPANY_NUMBER = process.env.NEXT_PUBLIC_COMPANY_NUMBER;
export const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL;
export const COMPANY_INSTAGRAM = process.env.NEXT_PUBLIC_COMPANY_INSTAGRAM;
export const COMPANY_LINKEDIN = process.env.NEXT_PUBLIC_COMPANY_LINKEDIN;
