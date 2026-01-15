import { PageSchema } from "@/components/constructor/page-render/types";

const termsSchema: PageSchema = {
    meta: {
        title: "Terms and Conditions – Foconta",
        description:
            "Official Terms and Conditions for using Foconta.co.uk – tokens, refunds, payments, AI co-pilot services, and user rights.",
        keywords: [
            "terms and conditions",
            "foconta",
            "tokens",
            "refunds",
            "business plan generator",
            "AI co-pilot",
            "digital content",
        ],
        canonical: "/terms-and-conditions",
        ogImage: {
            title: "Foconta – Terms and Conditions",
            description: "Full Terms and Conditions for Foconta AI Business Platform.",
            bg: "#ffffff",
            color: "#000000",
        },
    },

    blocks: [
        {
            type: "text",
            title: "Terms and Conditions",
            description:
                "Effective date: 01 October 2025\n\nThese Terms and Conditions govern your access to and use of foconta.co.uk and related services provided by THE COMPANY YOU NEED LTD.",
        },

        {
            type: "text",
            title: "1. Introduction",
            description:
                "1.1. These Terms and Conditions (“Terms”) govern your access to and use of foconta.co.uk, our related pages, applications, and downloadable content (the “Service”), operated by THE COMPANY YOU NEED LTD (company number 15967968, registered office: 31 Auctioneers Way, Northampton, United Kingdom, NN1 1HF) (“Foconta”, “we”, “us”, “our”).\n\n1.2. By creating an account, purchasing Tokens, or generating any business plan, report, presentation, spreadsheet, PDF or other digital output through the Service, you agree to these Terms. If you do not agree, do not use the Service.",
        },

        {
            type: "text",
            title: "2. Definitions",
            bullets: [
                "Account – your user profile on the Service.",
                "Tokens – our internal, prepaid digital credits used to access specific features of the Service (e.g., AI Co-pilot generation, exports, expert review). Tokens are not cash, e-money, or financial instruments.",
                "Output / Deliverables – any AI-assisted or expert-prepared materials delivered via the Service, including business plans (and sections thereof), market notes, financial models/spreadsheets, presentations, PDFs, and structured text exports.",
                "Add-ons / Extras – optional paid modules (e.g., advanced financial modelling, sector benchmarks, localisation, slide design, expedited expert review).",
                "Order – a confirmed transaction to purchase Tokens and/or redeem Tokens for Services.",
                "Services – the Foconta platform and its features including briefs, AI Co-pilot generation, optional human expert review (where available), exports, and delivery of digital content.",
                "Checkout Currency – GBP (£), EUR (€) or USD ($), as selected at checkout.",
            ],
        },

        {
            type: "text",
            title: "3. Eligibility & Account Registration",
            description:
                "3.1. You must be 18 years or older. If you use the Service on behalf of a company or organisation, you represent that you have authority to bind that entity.\n\n3.2. You must provide accurate, current information and keep your credentials secure. You are responsible for all activity under your Account.\n\n3.3. Notify us immediately of any suspected unauthorised access or security incident at info@foconta.co.uk.",
        },

        {
            type: "text",
            title: "4. Tokens",
            description:
                "4.1. Nature. Tokens prepay access to features of the Service. Tokens have no cash value, are non-transferable, and may not be exchanged, traded, assigned, or resold.\n\n4.2. Issuance & Rate. Tokens are issued after successful card payment. The current target rate is 100 Tokens = 1.00 GBP / 1.17 EUR / 1.29 USD. Before payment, the interface shows the exact number of Tokens you will receive. Rates and bundles may change.\n\n4.3. Pricing in Tokens. Features and packages are priced in Tokens; the interface shows the token amount before redemption. Any GBP/EUR/USD amounts shown alongside are informational conversions.\n\n4.4. Redemption. When you confirm a generation or service, the displayed token amount is deducted in real time. If a generation fails for technical reasons attributable to us and no content is delivered, the associated Tokens will be automatically returned or manually restored after support review.\n\n4.5. Expiry & Dormancy. Unless stated otherwise in a promotion, Tokens do not expire. Accounts with no login or activity for 24 months may be archived.\n\n4.6. Promotions & Bonuses. From time to time, we may offer bonus or promotional Tokens subject to their specific terms.",
        },

        {
            type: "text",
            title: "5. Ordering, Payment & Checkout",
            description:
                "Accepted payment methods: Visa, Mastercard · Accepted currencies: GBP (£), EUR (€), USD ($)\n\n5.1. Acceptance. All Orders are subject to acceptance. We may refuse or cancel an Order to prevent fraud or abuse, correct obvious errors, comply with law, or address technical issues.\n\n5.2. Payment Authority. By paying, you confirm you are authorised to use the selected card.\n\n5.3. Currencies, Taxes & FX. Prices are shown in GBP/EUR/USD. You may choose your Checkout Currency. VAT/consumption taxes may apply depending on your billing country.\n\n5.4. Delivery of Digital Content. Outputs and PDFs are delivered electronically via download or email.",
        },

        // 🔥 НОВИЙ РОЗДІЛ — ДОДАНИЙ, НІЧОГО ІНШОГО НЕ ЧІПАЄМО
        {
            type: "text",
            title: "6. Delivery of Digital Content",
            description:
                "6.1. Digital-only delivery. All Services provided by Foconta result in digital content only. No physical documents or materials are produced or shipped.\n\n6.2. Moment of delivery. Delivery is deemed complete when the requested Output (including AI-generated or expert-reviewed business plans, reports, financial models, presentations, spreadsheets, PDFs, or other digital materials) is made available to you via your Account, download link, or email.\n\n6.3. Immediate access. Once processing is complete, the Output becomes available for viewing, download, or export. Re-accessing or re-downloading the same Output does not consume additional Tokens unless additional Services are requested.\n\n6.4. AI and expert involvement. Outputs may be created by artificial intelligence, human consultants, or a combination of both, depending on the Service selected at checkout.\n\n6.5. Availability and limitations. Access to Outputs depends on successful processing, system availability, and your internet connection. If delivery fails due to a technical issue attributable to us, we will re-deliver the Output or restore the associated Tokens in accordance with these Terms.\n\n6.6. Support. If you cannot access or download an Output, contact info@foconta.co.uk with your Order ID, approximate delivery time, and any relevant error details.",
        },

        {
            type: "text",
            title: "7. Cancellations, Refunds & Consumer Rights",
            description:
                "7.1. By starting a generation (AI or expert), you request immediate performance and acknowledge that once the supply of digital content has begun, you may lose the statutory right to cancel.\n\n7.2. Unused Tokens may be cancelled within 14 days of purchase provided no Tokens from that top-up have been spent.\n\n7.3. Used Tokens are non-refundable except where required by law or a verified technical failure attributable to us occurred.\n\n7.4. If a delivered file is defective or not as described, contact info@foconta.co.uk within 14 days citing your Order ID.\n\n7.5. Unwarranted chargebacks may lead to suspension and removal of equivalent Tokens or generated content.",
        },

        // ⬇️ ДАЛІ ВСЕ БЕЗ ЗМІН (8–20)
        {
            type: "text",
            title: "8. Scope of Service & Professional Disclaimers",
            description:
                "8.1. Foconta provides informational and planning assistance. Outputs are generated by AI and may be reviewed by human experts where selected.\n\n8.2. We do not provide legal, tax, accounting, investment, or regulated financial advice.\n\n8.3. You are responsible for verifying compliance of your business plans and decisions with applicable regulations and requirements.",
        },

        {
            type: "text",
            title: "9. Your Inputs, Content & Acceptable Use",
            description:
                "9.1. You must provide lawful, truthful inputs and not upload illegal, infringing, or harmful content.\n\n9.2. You must not misuse the Service (e.g., reverse engineering, scraping, overburdening, or bypassing usage limits).\n\n9.3. If your content receives a valid takedown notice, we may restrict or remove it and notify you where legally permissible.",
        },

        {
            type: "text",
            title: "10. Intellectual Property & Licences",
            description:
                "10.1. The Service, software, templates, and content are owned by Foconta or our licensors.\n\n10.2. Upon valid redemption, you receive a personal, non-transferable licence to use generated Outputs for your internal business purposes. Redistribution or resale is prohibited without consent.\n\n10.3. You retain rights in your inputs and grant us a limited licence to use non-identifying data to operate and improve the Service.",
        },

        {
            type: "text",
            title: "11. Warranties & Disclaimers",
            description:
                "11.1. We warrant that we are entitled to provide the Service.\n\n11.2. Except as stated, the Service and Outputs are provided “as is” and “as available”.\n\n11.3. No specific fundraising, approval, or financial outcome is guaranteed.",
        },

        {
            type: "text",
            title: "12. Limitation of Liability",
            description:
                "12.1. Nothing limits liability for death or injury caused by negligence, fraud, or where limitation is prohibited by law.\n\n12.2. Our total liability in any 12-month period shall not exceed the total paid for Tokens/Services.\n\n12.3. We are not liable for indirect or consequential losses, including lost profits or data.",
        },

        {
            type: "text",
            title: "13. Indemnity",
            description:
                "You agree to indemnify and hold harmless Foconta and its officers, employees, and contractors from claims or damages arising from your unlawful use of the Service or breach of these Terms.",
        },

        {
            type: "text",
            title: "14. Data Protection & Privacy",
            description:
                "14.1. We process personal data in accordance with UK GDPR and the Data Protection Act 2018, as described in our Privacy Policy.\n\n14.2. By using the Service, you acknowledge our privacy practices and your data rights.",
        },

        {
            type: "text",
            title: "15. Third-Party Services & Links",
            description:
                "The Service may include integrations or links with third-party services (e.g., payment processors, analytics). We are not responsible for their content or practices.",
        },

        {
            type: "text",
            title: "16. Suspension & Termination",
            description:
                "16.1. We may suspend or terminate access if you breach these Terms, create security/fraud risks, or as required by law.\n\n16.2. Upon termination, your licence to use the Service and Outputs ceases; minimal records may be retained as required by law.",
        },

        {
            type: "text",
            title: "17. Changes to the Service or Terms",
            description:
                "17.1. We may update the Service or these Terms to reflect legal or business changes.\n\n17.2. Material changes will be communicated by email or in-product notice. Continued use after the effective date constitutes acceptance.",
        },

        {
            type: "text",
            title: "18. Notices",
            description:
                "Formal notices to us: info@foconta.co.uk or by post to our registered office. We may contact you via email or in-product notifications.",
        },

        {
            type: "text",
            title: "19. Governing Law & Jurisdiction",
            description:
                "19.1. These Terms are governed by the laws of England and Wales.\n\n19.2. The courts of England and Wales have exclusive jurisdiction, except that consumers in Scotland, Northern Ireland, or EU Member States may bring proceedings locally.",
        },

        {
            type: "text",
            title: "20. Miscellaneous",
            description:
                "20.1. Invalid provisions do not affect validity of others.\n\n20.2. No delay constitutes a waiver.\n\n20.3. You may not assign your rights without our consent. We may assign to an affiliate or successor.\n\n20.4. These Terms and referenced policies form the full agreement between you and Foconta.",
        },

        {
            type: "text",
            title: "21. Contact Details",
            bullets: [
                "THE COMPANY YOU NEED LTD",
                "Registered office: 31 Auctioneers Way, Northampton, United Kingdom, NN1 1HF",
                "Company number: 15967968",
                "Email: info@foconta.co.uk",
                "Tel: +44 7537 166412",
            ],
        },
    ],
};

export default termsSchema;
