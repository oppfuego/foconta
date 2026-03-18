import { PageSchema } from "@/components/constructor/page-render/types";
import {COMPANY_ADDRESS} from "@/resources/constants";

const cookiePolicyEn: PageSchema = {
    meta: {
        title: "Cookies Policy – Foconta",
        description:
            "Foconta Cookies Policy: how we use cookies, storage, pixels, and SDKs, including consent options and your control preferences.",
        keywords: [
            "cookies policy",
            "cookies",
            "GDPR",
            "tracking",
            "privacy",
            "consent",
            "foconta",
        ],
        canonical: "/cookies-policy",
        ogImage: {
            title: "Foconta – Cookies Policy",
            description:
                "Transparent cookies and consent policy for Foconta AI business planning platform.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Cookies Policy",
            description: "Effective date: 01 October 2025",
        },
        {
            type: "text",
            title: "1. Overview",
            description:
                "This Cookies Policy explains how Foconta (“we”, “us”, “our”) uses cookies and similar technologies (including localStorage, sessionStorage, pixels, and SDKs) on foconta.co.uk and related services (the “Service”). It complements our Privacy Policy. By interacting with our cookie banner or the preferences centre, you can manage consent to non-essential cookies as described below.",
            bullets: [
                `Controller: THE COMPANY YOU NEED LTD (Company No. 15967968), ${COMPANY_ADDRESS}.`,
                "Contact: info@foconta.co.uk",
            ],
        },
        {
            type: "text",
            title: "2. What Are Cookies (and Similar Technologies)?",
            description:
                "Cookies are small files placed on your device by a website. They help the site to run essential functions (e.g., login sessions, CSRF protection), remember preferences (e.g., language, UI choices), measure performance and reliability, and — where you consent — enable analytics and marketing/attribution.",
            description2:
                "Similar technologies (treated similarly for consent) include: localStorage/sessionStorage keys, SDK identifiers, tracking pixels, and device/browser identifiers.",
        },
        {
            type: "text",
            title: "3. Categories We Use",
            bullets: [
                "Necessary / Essential – required for core functionality (authentication, security, session management, load balancing, consent logging). These do not require consent.",
                "Functional – remember choices (language, theme, optional saved generator/brief inputs).",
                "Performance / Analytics – help us understand usage, errors, and page speed so we can improve reliability. Depending on the tool, we rely on consent or legitimate interests (with strict configuration) where appropriate.",
                "Marketing / Advertising – set only if you enable them; used for campaign attribution, remarketing, and measuring the effectiveness of our ads.",
                "Security / Anti-abuse – detect unusual activity, mitigate fraud and bot traffic.",
            ],
            description:
                "We comply with UK GDPR and PECR (Privacy and Electronic Communications Regulations) for placing and reading non-essential cookies.",
        },
        {
            type: "text",
            title: "4. Typical Cookies & Storage Keys (Examples)",
            description:
                "Names and lifetimes can vary by release and provider. The current, authoritative list appears in the Cookie Settings panel.",
            bullets: [
                "session_id — Maintains authenticated session • Necessary • Session",
                "csrf_token — CSRF protection • Necessary • Session",
                "consent_state — Stores your banner/settings choices • Necessary/Functional • 6–12 months",
                "ui_prefs — Language, theme, layout • Functional • ~6 months",
                "perf_metrics — Page performance & errors • Analytics • 1–3 months",
                "campaign_src — UTM/campaign attribution • Marketing • 1–3 months",
                "foconta_token_hint (localStorage) — Optional: remembers last token pack view • Functional • Until cleared",
                "foconta_generator_prefs (localStorage) — Optional: saves generator/brief inputs • Functional • Until cleared",
            ],
        },
        {
            type: "text",
            title: "5. Consent and Lawful Basis",
            bullets: [
                "Essential cookies are strictly necessary and do not require consent.",
                "Non-essential cookies (Functional, Analytics, Marketing) are set only after you consent via the banner or preferences centre, unless we use a tightly scoped analytics configuration relying on legitimate interests (no cross-site tracking, IP truncation, aggregated reports).",
                "Our lawful bases may include performance of contract (to run the Service), consent, and legitimate interests (e.g., service improvement, fraud prevention). Details appear in our Privacy Policy.",
            ],
        },
        {
            type: "text",
            title: "6. How We Record and Retain Consent",
            description:
                "When you save a choice, we record: the consent categories you selected, a policy/version reference, timestamp, IP address, and user-agent (for evidential purposes). We retain this record for at least 24 months, and up to 6 years in case of disputes, in line with our Privacy Policy and data-protection law.",
        },
        {
            type: "text",
            title: "7. Third Parties and International Transfers",
            description:
                "We may use third-party providers (for example: payment processing, analytics, hosting/CDN, email delivery, marketing/attribution) that set or read cookies/identifiers. Some providers may process data outside the UK/EEA. Where transfers occur, we implement appropriate safeguards (e.g., UK adequacy decisions, UK/EU Standard Contractual Clauses, and supplementary measures as needed).",
            description2:
                "A current list of third-party providers and cookie details is available in the Cookie Settings panel on our site.",
        },
        {
            type: "text",
            title: "8. Managing or Withdrawing Consent",
            bullets: [
                "Use the cookie banner or Cookie Settings link (site footer) to accept, decline, or customise non-essential categories.",
                "You can withdraw consent at any time in Cookie Settings; your new choice applies going forward.",
                "You can also clear cookies via your browser settings or use private/incognito mode.",
                "Note: disabling certain cookies may limit functionality (e.g., you may be logged out or preferences won’t persist).",
            ],
        },
        {
            type: "text",
            title: "9. Do Not Track / Global Privacy Controls",
            description:
                "If your browser sends Global Privacy Control (GPC) or similar signals, we will treat them as an opt-out from non-essential cookies where technically feasible and consistent with applicable law.",
        },
        {
            type: "text",
            title: "10. Changes to this Policy",
            description:
                "We may update this Policy (for example, when we add or change integrations). Material changes will be announced by a prominent in-product notice or email to registered users. The Effective date above will always reflect the latest version. Changes operate prospectively.",
        },
        {
            type: "text",
            title: "11. Contact",
            bullets: [
                "Email: info@foconta.co.uk",
                `Postal address: THE COMPANY YOU NEED LTD, ${COMPANY_ADDRESS}`,
            ],
        },
    ],
};

export default cookiePolicyEn;
