import { PageSchema } from "@/components/constructor/page-render/types";
import {COMPANY_ADDRESS} from "@/resources/constants";

const privacyPolicySchema: PageSchema = {
    meta: {
        title: "Privacy Policy – Foconta",
        description:
            "Foconta Privacy Policy: details on what data we collect, how we use it, how long we retain it, and your rights under UK GDPR.",
        keywords: [
            "privacy policy",
            "GDPR",
            "data protection",
            "foconta",
            "AI business",
            "personal data",
            "uk gdpr",
        ],
        canonical: "/privacy-policy",
        ogImage: {
            title: "Foconta – Privacy Policy",
            description:
                "Transparent privacy practices for Foconta AI business planning platform under UK GDPR.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Privacy Policy",
            description: "Effective date: 01 October 2025",
        },
        {
            type: "text",
            title: "1. Introduction",
            description:
                "We respect your privacy. This Privacy Policy explains what personal data we collect, why we use it, how long we keep it, and how you can exercise your rights when using foconta.co.uk and related services (the “Service”).",
            bullets: [
                `Controller: THE COMPANY YOU NEED LTD (Company No. 15967968), Academy House, ${COMPANY_ADDRESS} (“Foconta”, “we”, “us”, “our”).`,
                "Contact: info@foconta.co.uk",
                "Scope & age: This Policy applies to Users of the Service. The Service is intended for individuals 18+.",
            ],
        },
        {
            type: "text",
            title: "2. Personal Data We Collect",
            description:
                "We collect only what we need to operate, secure, and improve the Service.",
        },
        {
            type: "text",
            title: "2.1. Data You Provide Directly",
            bullets: [
                "Name (or display name) and contact details (e.g., email).",
                "Account credentials (stored securely in hashed form).",
                "Billing details (billing address; optional VAT information for invoicing).",
                "Business and project inputs for plan generation (e.g., industry, target markets, competitive notes, goals, milestones, KPIs, financial assumptions, keywords, audience persona, timelines).",
                "Files and user-generated content (UGC) you upload (e.g., spreadsheets, briefs, pitch decks, brand assets).",
                "Support requests and communications with us.",
            ],
            description:
                "Special category data: We do not ask for special category data. If you voluntarily include such data in prompts/uploads (e.g., beliefs, health, political opinions), we will process it only to deliver the requested feature/output and only with your consent (see §3.2).",
        },
        {
            type: "text",
            title: "2.2. Data Collected Automatically",
            bullets: [
                "IP address, device and browser information, operating system, timezone, language.",
                "Access and security telemetry (e.g., login attempts, anti-abuse signals).",
                "Usage data: page views, clicks, token purchases/redemptions, generation attempts, delivery/open events, error logs, and aggregate performance metrics.",
            ],
        },
        {
            type: "text",
            title: "2.3. Data from Third Parties (as needed)",
            bullets: [
                "Payment processors: transaction references and status (we do not receive full card numbers).",
                "Fraud/abuse-prevention providers: risk and verification signals.",
                "Professional advisers: where needed for legal, tax, or compliance purposes.",
            ],
        },
        {
            type: "text",
            title: "2.4. User-Generated Content (UGC)",
            description:
                "Outputs or materials you upload or generate may contain personal data about you or others. You are responsible for having the necessary rights, notices, and lawful basis for any third-party data contained in your UGC.",
        },
        {
            type: "text",
            title: "3. Why We Process Your Data & Legal Bases (UK GDPR)",
            description:
                "We process personal data under the UK GDPR and the Data Protection Act 2018 on the following legal bases:",
        },
        {
            type: "text",
            title: "3.1. Performance of a Contract",
            bullets: [
                "To create and maintain your Account.",
                "To process token top-ups and deliver digital outputs (business plans, reports, spreadsheets, PDFs, presentations).",
                "To provide customer support and handle refunds/queries.",
            ],
        },
        {
            type: "text",
            title: "3.2. Consent (including special category data)",
            bullets: [
                "To use any special category data you voluntarily include in prompts or uploads.",
                "To send marketing emails/newsletters where you opt in.",
                "To use your content/feedback for model improvement where you opt in.",
            ],
            description:
                "You may withdraw consent at any time via account settings or by contacting us (see §12). Withdrawal does not affect the lawfulness of prior processing and may reduce output relevance.",
        },
        {
            type: "text",
            title: "3.3. Legitimate Interests",
            bullets: [
                "To keep the Service secure (fraud detection, abuse prevention, logging, rate-limiting).",
                "To measure and improve performance and user experience (aggregated/pseudonymised analytics where possible).",
                "To communicate important, non-marketing updates about the Service.",
                "For business customer outreach related to your existing or potential use of the Service, subject to your rights to object (see §8).",
            ],
        },
        {
            type: "text",
            title: "3.4. Legal Obligation",
            bullets: [
                "Tax, accounting, and compliance record-keeping.",
                "Responding to lawful requests from public authorities.",
            ],
        },
        {
            type: "text",
            title: "4. AI, Profiling and Automated Decisions",
            bullets: [
                "The Service uses AI to generate outputs based on your inputs. This involves automated processing and limited profiling to tailor business plans, financial assumptions, timelines, and similar assets to your goals and constraints.",
                "We do not make legal or similarly significant decisions about you solely by automated means.",
                "You can choose not to provide certain inputs; outputs may then be less relevant. You may request human review of any support outcome at any time.",
            ],
        },
        {
            type: "text",
            title: "5. Sharing and International Transfers",
            bullets: [
                "Payment processing: card acquirers/processors (e.g., Visa/Mastercard providers) – we receive transaction references/status, not full card details.",
                "Hosting & IT: secure cloud infrastructure, CDNs, storage and backups.",
                "Product & support tooling: analytics (aggregated/pseudonymised where feasible), helpdesk, email delivery, error tracking, A/B testing.",
                "Professional advisers: legal, accounting, and compliance (where required).",
                "Some providers may be located outside the UK/EEA. Where transfers occur, we implement appropriate safeguards, such as UK adequacy regulations, UK/EU Standard Contractual Clauses (SCCs), and supplementary measures where appropriate.",
                "We do not sell your personal data.",
            ],
        },
        {
            type: "text",
            title: "6. Cookies and Similar Technologies",
            description:
                "We use cookies and similar technologies (including localStorage/sessionStorage) to run the Service, remember preferences, measure performance, and—where you consent—enable analytics/marketing. Essential cookies are necessary for core functionality and security. For details and controls, please see our Cookies Policy (linked in the site footer).",
        },
        {
            type: "text",
            title: "7. Retention",
            bullets: [
                "Orders, tokens & transactions: at least 24 months, and up to 6 years where disputes, tax, or enterprise records require.",
                "Account & profile data (incl. business preferences): while your Account is active and for a reasonable period after closure (typically up to 24 months), unless longer is required for legal or security reasons.",
                "Logs & security telemetry: typically 6–24 months, depending on purpose and risk.",
                "Where feasible, we minimise, pseudonymise, or anonymise data and then securely delete it.",
            ],
        },
        {
            type: "text",
            title: "8. Your Rights",
            bullets: [
                "Access your data;",
                "Rectification of inaccurate data;",
                "Erasure ('right to be forgotten');",
                "Restriction of processing;",
                "Data portability;",
                "Object to processing based on legitimate interests (including direct marketing);",
                "Withdraw consent at any time (for marketing, any special-category data you provided, and model-improvement opt-ins).",
            ],
            description:
                "How to exercise: email info@foconta.co.uk from your Account email. We may request proof of identity. We aim to respond within one month (extendable by up to two months for complex requests, with notice).",
        },
        {
            type: "text",
            title: "9. Security",
            bullets: [
                "Access controls, role-based permissions, and MFA for admin interfaces.",
                "Encryption in transit (HTTPS/TLS) and at rest where applicable.",
                "Network segregation, firewalls, and regular backups.",
                "Logging/monitoring and incident-response procedures.",
                "Vendor due diligence and contractual safeguards for processors.",
            ],
            description:
                "No system is 100% secure. We continuously improve our controls and promptly investigate incidents.",
        },
        {
            type: "text",
            title: "10. Children’s Data",
            description:
                "The Service is for users 18+. We do not knowingly collect data from children. If you believe a child has provided data to us, contact info@foconta.co.uk so we can delete it.",
        },
        {
            type: "text",
            title: "11. Changes to this Policy",
            description:
                "We may update this Policy from time to time. Material changes will be notified by email and/or a prominent in-product notice. Updates apply prospectively.",
        },
        {
            type: "text",
            title: "12. Contact & Complaints",
            bullets: [
                "Controller: THE COMPANY YOU NEED LTD",
                `Address: ${COMPANY_ADDRESS}`,
                "Email (privacy): info@foconta.co.uk",
                "If you are not satisfied with our response, you can lodge a complaint with the UK Information Commissioner’s Office (ICO). If you are an EU resident, you may also have the right to complain to your local supervisory authority.",
            ],
        },
    ],
};

export default privacyPolicySchema;
