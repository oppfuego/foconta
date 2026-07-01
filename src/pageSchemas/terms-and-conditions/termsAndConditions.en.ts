import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_PHONE,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_EMAIL,
} from "@/resources/constants";

const termsSchema: PageSchema = {
    meta: {
        title: `Terms and Conditions - ${COMPANY_NAME}`,
        description: "Official Terms and Conditions for using Foconta.co.uk - tokens, refunds, payments, AI services, expert system, and user rights.",
        keywords: ["terms and conditions", `${COMPANY_NAME}`, "tokens", "refunds", "business plan generator", "AI co-pilot", "digital content", "expert"],
        canonical: "/terms-and-conditions",
        ogImage: {
            title: `${COMPANY_NAME} - Terms and Conditions`,
            description: `Full Terms and Conditions for ${COMPANY_NAME} AI Business Platform.`,
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: `Terms and Conditions`,
            description: `Effective date: 01 June 2026`,
        },
        {
            type: "text",
            title: `1. Introduction`,
            description:
                `1.1. These Terms and Conditions ("Terms") govern your access to and use of foconta.co.uk, our related pages, applications, dashboards, forms, downloadable content and digital services (together, the "Service"), operated by ${COMPANY_LEGAL_NAME} (company number ${COMPANY_NUMBER}, registered office: ${COMPANY_ADDRESS}) ("${COMPANY_NAME}", "we", "us", "our").

1.2. These Terms form a legally binding agreement between ${COMPANY_NAME} and each person or entity using the Service ("you", "User", "Customer"). If you use the Service on behalf of a company, organisation, client or other legal entity, you confirm that you have authority to bind that entity to these Terms.

1.3. By creating an account, purchasing Tokens, redeeming Tokens, ordering an AI-generated plan, ordering an expert-prepared plan, registering as an Expert, requesting a payout, downloading any deliverable, or otherwise using the Service, you agree to these Terms.

1.4. If you do not agree to these Terms, you must not use the Service.`,
        },
        {
            type: "text",
            title: `2. Definitions`,
            description:
                `For the purposes of these Terms:

Account means your registered user profile on the Service.

AI Instant Plan means a business plan or related output generated primarily through ${COMPANY_NAME}'s AI-powered tools based on the information you provide.

Business Hours means Monday to Friday, excluding UK public holidays, unless otherwise stated on the Service or agreed in writing.

Customer means a person or entity purchasing Tokens, redeeming Tokens, or ordering any Service or Deliverable through ${COMPANY_NAME}.

Deliverables / Outputs means any digital materials supplied through the Service, including business plans, business plan sections, market notes, competitor analysis, financial projections, spreadsheets, pitch decks, presentation materials, PDF files, DOCX files, text exports, AI-generated outputs, expert-prepared outputs and related digital files.

Expert means an independent specialist, freelancer or contractor who has registered with ${COMPANY_NAME} and may be assigned to prepare, review or assist with Deliverables.

Expert 24h Plan means an expert-prepared business plan package made available through the Service and priced in Tokens.

Expert Services means any services performed or assisted by an Expert, including expert writing, expert review, revisions, market research support, financial planning support, pitch deck support or other customised business planning assistance.

Investor Pack means a higher-tier package that may include a business plan, pitch deck, design layout, investor-ready formatting and related expert support, as described at the time of purchase.

Custom Plan means a tailored package with flexible scope and dynamic pricing agreed or displayed before purchase.

Order means a confirmed transaction to purchase Tokens, redeem Tokens, or request Services.

Platform Materials means ${COMPANY_NAME}'s software, tools, workflows, templates, prompts, designs, website content, documentation, branding, know-how and other proprietary materials.

Service means the ${COMPANY_NAME} platform and related services, including AI tools, expert matching, brief forms, dashboards, payment flows, Token management, order management, document generation, expert support and digital delivery.

Specialisation means the business plan category selected by a Customer or Expert, including the categories listed in Section 8.

Tokens means ${COMPANY_NAME}'s internal prepaid digital credits used to access or pay for specific Services. Tokens are not cash, e-money, cryptocurrency, securities, stored-value money, bank deposits or financial instruments.

Wallet / Token Balance means the internal balance of Tokens credited to your Account.

Checkout Currency means GBP (£), EUR (€) or USD ($), as selected at checkout.`,
        },
        {
            type: "text",
            title: `3. Eligibility and Account Registration`,
            description:
                `3.1. You must be at least 18 years old to use the Service.

3.2. You must provide accurate, complete and current information when creating an Account, placing an Order, submitting a brief, registering as an Expert or requesting support.

3.3. You are responsible for keeping your login credentials secure and for all activity that takes place under your Account.

3.4. You must notify us immediately at ${COMPANY_EMAIL} if you suspect unauthorised access, misuse of your Account, payment fraud, data loss or any other security incident.

3.5. We may refuse registration, suspend access, request additional information, or close an Account where we reasonably believe that information is inaccurate, incomplete, misleading, unlawful, fraudulent, abusive or inconsistent with these Terms.`,
        },
        {
            type: "text",
            title: `4. Service Overview`,
            description:
                `4.1. ${COMPANY_NAME} provides digital business planning services. Depending on the package selected, the Service may include AI-assisted generation, expert writing, expert review, market and competitor analysis, financial planning support, pitch deck preparation, document formatting and downloadable digital files.

4.2. ${COMPANY_NAME} is not a law firm, accounting firm, investment adviser, tax adviser, regulated financial adviser, healthcare provider or fundraising intermediary. We provide informational, planning and document preparation support only.

4.3. The Service is designed to assist with the preparation of business planning materials. You remain responsible for reviewing all Deliverables before relying on, submitting, publishing or presenting them.

4.4. We do not guarantee that any Deliverable will secure funding, obtain bank approval, satisfy investor requirements, meet regulatory standards, generate revenue, achieve profitability or produce any specific commercial result.

4.5. Any financial figures, forecasts, assumptions, market insights or projections included in Deliverables are based on the information available and the assumptions provided or selected at the time of generation or preparation. They are illustrative and must be independently verified before use.`,
        },
        {
            type: "text",
            title: `5. Tokens`,
            description:
                `5.1. Nature of Tokens. Tokens are internal prepaid digital credits used to access and pay for features of the Service. Tokens have no cash value outside the Service and may not be exchanged, traded, assigned, resold or transferred, except where these Terms expressly allow Expert payout conversion through ${COMPANY_NAME}'s internal Expert process.

5.2. Token Rate. The current target rate is:

100 Tokens = 1 GBP

100 Tokens = 1.17 EUR

100 Tokens = 1.29 USD

The exact number of Tokens credited or redeemed is displayed before purchase or confirmation.

5.3. Token Packages. The available packages may include, for example:

AI Instant Plan - 900 Tokens;

Expert 24h Plan - 2,000 Tokens;

Investor Pack - 5,000 Tokens;

Custom Plan - dynamic pricing, as displayed or agreed before confirmation.

5.4. Pricing in Tokens. Services and packages are priced in Tokens. Any GBP, EUR or USD amount shown is an informational conversion based on the then-current Token rate and applicable checkout settings.

5.5. Issuance. Tokens are issued to your Account after successful payment, subject to fraud checks, payment confirmation and technical processing.

5.6. Redemption. When you confirm an Order, generation, expert request, add-on or package, the displayed number of Tokens is deducted from your Token Balance.

5.7. Failed Delivery. If a generation or Order fails due to a technical issue attributable to ${COMPANY_NAME} and no usable Deliverable is supplied, we may restore the relevant Tokens, re-run the generation, arrange rework, or provide another appropriate remedy.

5.8. No Cash-Out for Customers. Customers may not cash out Tokens, request withdrawal of Tokens as fiat currency, or transfer Tokens to another user, except where a refund is approved under our Refund / Return Policy or required by law.

5.9. Promotional Tokens. Bonus, promotional or complimentary Tokens may be non-refundable, non-transferable, time-limited or subject to additional conditions shown at the point of issue.

5.10. Dormant Accounts. Accounts with no login, purchase, redemption or other activity for 24 months may be archived. Reactivation may require identity, account ownership or security verification.`,
        },
        {
            type: "text",
            title: `6. Orders, Payment and Checkout`,
            description:
                `6.1. Accepted Payment Methods. ${COMPANY_NAME} currently accepts payment by Visa and Mastercard.

6.2. Accepted Currencies. ${COMPANY_NAME} currently supports GBP (£), EUR (€) and USD ($).

6.3. Taxes. Unless otherwise stated at checkout, applicable taxes are included in the displayed price. Where required, tax information may appear on your receipt, invoice or payment confirmation.

6.4. Payment Authority. By submitting payment details, you confirm that you are authorised to use the selected payment method and that the information provided is accurate.

6.5. Order Acceptance. All Orders are subject to acceptance. We may refuse, cancel, delay or review an Order where necessary to prevent fraud, correct obvious pricing or technical errors, comply with law, manage risk, address abuse, or protect the Service.

6.6. Currency Conversion and Card Fees. If your card or account is denominated in a currency other than GBP, EUR or USD, your card issuer may apply exchange rates, conversion fees or other charges. ${COMPANY_NAME} is not responsible for fees charged by your bank, card issuer or payment provider.

6.7. Receipts and Invoices. We may provide electronic receipts or invoices through the Service or by email. You are responsible for ensuring that your billing details are correct.`,
        },
        {
            type: "text",
            title: `7. AI Instant Plan`,
            description:
                `7.1. The AI Instant Plan is generated primarily by automated AI tools based on the inputs, selections, prompts and business information you provide.

7.2. AI-generated Deliverables may contain errors, omissions, outdated information, unsupported assumptions, formatting issues or content that requires human review.

7.3. You are responsible for reviewing, editing and verifying AI-generated Deliverables before using them for any business, academic, funding, legal, financial, regulatory or public purpose.

7.4. AI-generated Deliverables do not constitute legal advice, tax advice, accounting advice, investment advice, regulated financial advice, medical advice or professional certification of your business model.

7.5. Where the Service offers "revisions" or editing options for AI-generated Deliverables, these may be provided through regeneration, user editing, AI-assisted modification or support review, depending on the feature available.

7.6. Delivery: AI Instant Plan Deliverables are generated immediately and become available for download in your Account dashboard. A confirmation email with order details is also sent to your registered email address.`,
        },
        {
            type: "text",
            title: `8. Expert Services and Specialisations`,
            description:
                `8.1. ${COMPANY_NAME} may offer Expert Services through independent specialists, freelancers or contractors. Experts are not employees, agents, partners or legal representatives of ${COMPANY_NAME}.

8.2. ${COMPANY_NAME} automatically assigns an Expert based on the Customer's selected package, selected Specialisation, brief, language, scope, complexity and Expert availability.

8.3. Customers do not have a guaranteed right to select a specific Expert unless this is expressly offered through the Service or agreed in writing.

8.4. Communication between Customers and Experts must take place only through the ${COMPANY_NAME} platform, ${COMPANY_NAME}-managed communication channels, or ${COMPANY_NAME} email workflows. Direct off-platform communication, circumvention of ${COMPANY_NAME}, or private payment arrangements are not permitted.

8.5. Experts may select one or more Specialisations during registration. Customers may also select one or more Specialisations when placing an Order.

8.6. Available Specialisations may include:

Startup Business Plan;

Restaurant & Food Business Plan;

E-commerce Business Plan;

SaaS & Tech Business Plan;

Real Estate Business Plan;

Marketing Strategy Plan;

Financial & Investment Plan;

Franchise Business Plan;

Non-Profit Organization Plan;

Import/Export Business Plan;

Retail Business Plan;

Healthcare Business Plan.

8.7. ${COMPANY_NAME} may add, remove, rename or combine Specialisations from time to time.

8.8. A Specialisation is used for matching and workflow purposes only. It does not mean that ${COMPANY_NAME} or any Expert provides regulated advice, licensed professional services, medical advice, legal advice, tax advice, accounting advice or investment advice.

8.9. "Financial & Investment Plan" refers to business planning, financial modelling and investment-readiness documentation only. It does not constitute investment advice, financial promotion approval, securities advice, portfolio advice or regulated financial activity.

8.10. "Healthcare Business Plan" refers to planning for healthcare-related business models only. Customers must not upload patient records, medical records or sensitive healthcare data unless expressly necessary and lawful. ${COMPANY_NAME} does not provide medical advice or healthcare compliance certification.

8.11. "Non-Profit Organization Plan" refers to business planning for non-profit or mission-led organisations only. ${COMPANY_NAME} does not provide charity registration, legal structuring or tax-exemption advice.`,
        },
        {
            type: "text",
            title: `9. Expert Verification, Status and Confidentiality`,
            description:
                `9.1. Experts may be required to complete onboarding, profile submission, skill selection, experience review, identity checks, portfolio review, quality review or other verification steps after registration.

9.2. Where an Expert is marked as verified, this means that ${COMPANY_NAME} has completed its internal onboarding or review process for that Expert. It does not guarantee a specific outcome, qualification, licence, professional accreditation, funding result or commercial success.

9.3. Experts are required to comply with confidentiality obligations and, where applicable, non-disclosure obligations in relation to Customer briefs, business information, files, Deliverables and communications.

9.4. ${COMPANY_NAME} may restrict, suspend or remove an Expert if we reasonably believe the Expert has breached confidentiality, failed quality standards, attempted to circumvent the platform, misused Customer information, provided misleading information, or breached these Terms or applicable Expert terms.

9.5. Customers should avoid submitting information that is unnecessary, excessively sensitive, unlawful, confidential to a third party without permission, or subject to restrictions that prevent disclosure to ${COMPANY_NAME} or assigned Experts.`,
        },
        {
            type: "text",
            title: `10. Expert Order Process and Delivery`,
            description:
                `10.1. The Expert Order process typically includes:

Customer selects a package and Specialisation;

Customer submits the required brief, business information and any files;

Customer pays or redeems the required Tokens;

${COMPANY_NAME} assigns an Expert based on the Order requirements;

the Expert reviews the brief and may request clarification through ${COMPANY_NAME} channels;

the Expert prepares or reviews the Deliverable, with AI used only as a support tool where appropriate;

${COMPANY_NAME} may conduct an internal quality review where needed;

the Deliverable is supplied electronically through the Service or by email.

10.2. For the Expert 24h Plan, ${COMPANY_NAME} aims to assign an Expert within 1 Business Hour after the Order is placed, subject to availability, fraud checks, technical availability, completeness of the brief and other operational factors.

10.3. The advertised 24-hour delivery period for an Expert 24h Plan is calculated in Business Hours and starts when the Customer has placed the Order and submitted the required brief and information needed to begin work.

10.4. Weekends and public holidays are not included in the 24-hour delivery calculation unless an Expert voluntarily works during those periods or ${COMPANY_NAME} expressly agrees otherwise.

10.5. If the Customer fails to provide requested information, does not respond to clarification requests, changes the scope, submits incomplete data, uploads unusable files, or provides contradictory instructions, delivery timelines may be paused, extended or revised.

10.6. For complex, incomplete, unusual or highly customised Orders, ${COMPANY_NAME} may extend the delivery timeline after notifying the Customer.

10.7. Delivery times are estimates unless expressly described as guaranteed in writing. ${COMPANY_NAME} will use reasonable efforts to meet advertised delivery times but will not be liable for delay caused by Customer inactivity, missing information, payment issues, force majeure, third-party outages, fraud review, technical issues or scope changes.

10.8. Deliverables are supplied digitally. Depending on the package, delivery may include PDF, DOCX, spreadsheet, presentation or other available digital formats. Exact formats are displayed or agreed before purchase where applicable.

10.9. Delivery method: Expert-prepared Deliverables are uploaded to your Account dashboard, where you can download them at any time. You will also receive an email notification when your Deliverable is ready. All Deliverables remain accessible in your Account dashboard for the duration of your Account.`,
        },
        {
            type: "text",
            title: `11. Revisions, Rework and Acceptance`,
            description:
                `11.1. Unless otherwise stated at the time of purchase, each Expert 24h Plan, Investor Pack and paid Expert Service includes one free revision round.

11.2. The free revision request must be submitted within 14 days after delivery.

11.3. Revisions are limited to the original brief, selected Specialisation, package scope and information provided before or during the original Order process.

11.4. A revision may include reasonable corrections, clarifications, formatting adjustments, minor content improvements, or alignment with the original brief.

11.5. A revision does not include a new business idea, new market, new industry, new Specialisation, new financial model, new strategy, substantial rewriting, investor deck redesign, major change of assumptions, or any request that materially changes the original scope.

11.6. Requests outside the original scope may require additional Tokens, a paid add-on, a Custom Plan or a new Order.

11.7. If no revision request or dispute is submitted within 7 days after delivery, the Deliverable may be treated as accepted for refund and dispute purposes, without limiting any mandatory rights you may have under applicable law.

11.8. Downloading, using, submitting, sharing or presenting a Deliverable may be considered evidence that you have accessed and used the digital content, and may affect refund eligibility as described in our Refund / Return Policy.`,
        },
        {
            type: "text",
            title: `12. Cancellations, Refunds and Disputes`,
            description:
                `12.1. Refunds, cancellations and disputes are governed by these Terms and our Refund / Return Policy.

12.2. Customers may request cancellation by emailing ${COMPANY_EMAIL} and providing the Order reference, Account email and reason for cancellation.

12.3. For AI-generated Orders, once generation has started or digital content has been supplied, cancellation and refund rights may be limited because digital content supply has begun.

12.4. For Expert Orders, cancellation may be available before substantial work has begun. For these purposes, substantial work may begin when an Expert has been assigned to the Order.

12.5. Once an Expert has been assigned, the Order has entered the Expert workflow. Refunds may be limited, reduced or refused, except where required by law or where ${COMPANY_NAME} determines that a refund, partial refund, Token credit, replacement Expert, rework or other remedy is appropriate.

12.6. If a Customer is dissatisfied with an Expert Deliverable, the Customer must first request a revision or rework through ${COMPANY_NAME}. Refund review will normally be considered only after a reasonable revision or rework opportunity has been provided.

12.7. A dispute about an Expert Deliverable must be submitted within 7 days after delivery, unless applicable law requires otherwise.

12.8. ${COMPANY_NAME} support will review disputes based on the original brief, package scope, Customer instructions, Expert work records, delivery evidence, revision history, download/access logs and any supporting materials provided by the Customer.

12.9. Following review, ${COMPANY_NAME} may, at its discretion and where appropriate:

require the Expert to revise or rework the Deliverable;

assign a replacement Expert;

extend the delivery period;

issue Token credit;

provide a partial refund;

provide a full refund;

reject the dispute with reasons.

12.10. If a delay occurs in an Expert Order, ${COMPANY_NAME} may agree with the Customer on an appropriate remedy, such as revised delivery time, priority handling, additional support, Token credit, partial refund or another reasonable solution.

12.11. Filing a chargeback before completing ${COMPANY_NAME}'s support and dispute process may result in temporary Account suspension, removal of Tokens, restriction of access to Deliverables, and submission of transaction evidence to the payment provider.

12.12. Nothing in these Terms limits any mandatory consumer rights that cannot be excluded under applicable law.`,
        },
        {
            type: "text",
            title: `13. Consumer Digital Content Rights`,
            description:
                `13.1. If you are a consumer, you may have statutory rights under UK consumer law in relation to digital content and services.

13.2. By starting an AI generation, redeeming Tokens for digital content, downloading a Deliverable, or requesting immediate Expert performance, you request immediate supply of digital content or services.

13.3. Where you have expressly requested immediate supply and acknowledged that cancellation rights may be affected, you may lose the statutory right to cancel once digital content supply or Expert performance has begun, subject to applicable law.

13.4. If a Deliverable is defective, corrupted, incomplete, inaccessible or clearly not as described, you should contact us promptly at ${COMPANY_EMAIL} with your Order reference and supporting evidence.`,
        },
        {
            type: "text",
            title: `14. Expert Accounts, Conversion and Payouts`,
            description:
                `14.1. This Section applies to Experts using or registering with ${COMPANY_NAME}.

14.2. Experts act as independent contractors/freelancers and are not employees, workers, agents, partners, franchisees or representatives of ${COMPANY_NAME}.

14.3. Customers may redeem Tokens to purchase Expert Services. After an Expert Order is completed, the relevant internal value of the Order may be converted by ${COMPANY_NAME} into an Expert payout balance, subject to these Terms, the applicable Expert terms, ${COMPANY_NAME}'s commission, dispute status, chargeback risk, fraud checks and internal approval.

14.4. ${COMPANY_NAME} applies a platform commission of 20% to Expert Orders, unless a different rate is agreed in writing.

14.5. Experts may request payout after completion of the relevant Order. Completion normally means that the Deliverable has been supplied and is not subject to an open dispute, unresolved rework request, chargeback, fraud review or payment failure.

14.6. Payouts may be made in EUR or USD to a bank account or card, subject to availability, verification, payment provider rules, compliance checks and any instructions provided by ${COMPANY_NAME}.

14.7. Experts must request payout through the method made available by ${COMPANY_NAME}. After a payout request, ${COMPANY_NAME} may contact the Expert by email to provide payout instructions, request details, verify information or confirm payment method.

14.8. Experts are solely responsible for their own taxes, social contributions, invoices, business registrations, licences, reporting obligations and compliance with laws applicable to their services and income.

14.9. ${COMPANY_NAME} may withhold, delay, reduce or cancel payout where an Order is disputed, refunded, charged back, reversed, fraudulent, incomplete, in breach of these Terms, or affected by Expert misconduct or quality failure.

14.10. Token conversion for Experts is an internal settlement mechanism between ${COMPANY_NAME} and Experts. It does not make Tokens electronic money, securities, cryptocurrency, bank deposits or a general cash-equivalent product for Customers.`,
        },
        {
            type: "text",
            title: `15. Your Inputs, Files and Responsibilities`,
            description:
                `15.1. You are responsible for the accuracy, legality and completeness of all information, files, prompts, assumptions and instructions you submit.

15.2. You must not upload, submit or request content that is unlawful, misleading, defamatory, discriminatory, infringing, fraudulent, harmful, abusive, confidential without authorisation, or in violation of third-party rights.

15.3. You must not submit personal data about third parties unless you have a lawful basis and any required notices or permissions.

15.4. You must not submit patient records, medical records, payment card numbers, government identifiers, passwords, trade secrets belonging to third parties, or highly sensitive information unless strictly necessary and lawful.

15.5. You are responsible for reviewing all Deliverables for factual accuracy, legal suitability, financial assumptions, regulatory compliance, sector requirements and fitness for your intended use.

15.6. You must not use the Service to prepare fraudulent funding applications, misleading investor materials, unlawful financial promotions, deceptive documents, forged records, fake references, false revenue claims or documents intended to mislead banks, investors, public authorities, regulators or third parties.`,
        },
        {
            type: "text",
            title: `16. Acceptable Use`,
            description:
                `16.1. You must not misuse the Service, including by:

attempting to reverse engineer, copy or extract the Service;

scraping, harvesting or bulk-downloading content without permission;

bypassing security controls, rate limits, access controls or payment flows;

using bots, automated scripts or unauthorised integrations;

interfering with the stability, performance or security of the Service;

uploading malware, malicious code or harmful files;

attempting to access another user's Account or data;

using the Service for illegal, fraudulent, deceptive or harmful purposes;

attempting to contact Experts directly to avoid ${COMPANY_NAME} fees or controls.

16.2. We may apply usage limits, rate limits, file limits, fraud controls, content moderation, security checks and other protective measures.

16.3. If we reasonably believe that your use of the Service creates legal, security, reputational, payment, fraud or operational risk, we may suspend or restrict your Account.`,
        },
        {
            type: "text",
            title: `17. Intellectual Property and Licences`,
            description:
                `17.1. ${COMPANY_NAME} Platform IP. The Service, Platform Materials, templates, workflows, prompts, software, interface, designs, documentation, branding, website content and proprietary methods are owned by ${COMPANY_NAME} or its licensors and are protected by intellectual property laws.

17.2. Your Inputs. You retain any rights you have in the materials, data, files and instructions you submit to the Service.

17.3. Licence to ${COMPANY_NAME}. You grant ${COMPANY_NAME} a worldwide, royalty-free, non-exclusive licence to use, host, process, reproduce, adapt and transmit your inputs and files as necessary to provide, secure, support and improve the Service, comply with law and enforce these Terms.

17.4. Use of Deliverables. Subject to full payment or valid Token redemption, ${COMPANY_NAME} grants you a non-exclusive, worldwide licence to use the Deliverables for your personal, academic, internal business, commercial planning, investor presentation, lender presentation, client presentation or business development purposes.

17.5. Restrictions. You must not resell, redistribute, publish or commercialise ${COMPANY_NAME} templates, Platform Materials or Deliverables as standalone competing products, template packs, AI training datasets, prompt libraries or document-generation services without our written permission.

17.6. No Transfer of Platform IP. Nothing in these Terms transfers ownership of ${COMPANY_NAME}'s Platform Materials, software, workflows, models, templates, know-how or brand assets to you.

17.7. Feedback. If you provide feedback, suggestions or ideas, we may use them without restriction or compensation, provided we do not disclose your confidential information in doing so.`,
        },
        {
            type: "text",
            title: `18. Confidentiality`,
            description:
                `18.1. ${COMPANY_NAME} will use reasonable efforts to keep Customer business information confidential and to make it available only to personnel, Experts, contractors, processors and advisers who need it to provide, support, secure or improve the Service.

18.2. Experts are required to comply with confidentiality obligations in relation to Customer briefs, files, business information and Deliverables.

18.3. Confidentiality does not apply to information that is publicly available, already known without restriction, independently developed, lawfully received from a third party, or required to be disclosed by law, court order or public authority.

18.4. You acknowledge that no online service can guarantee absolute confidentiality or security. You should not submit information that you are not authorised or willing to share for the purpose of receiving the Service.`,
        },
        {
            type: "text",
            title: `19. Third-Party Services`,
            description:
                `19.1. The Service may rely on third-party providers, including payment processors, hosting providers, analytics tools, email services, file storage providers, AI infrastructure providers and communication tools.

19.2. We are not responsible for third-party websites, services, terms, policies, outages, processing delays or fees, except where applicable law provides otherwise.

19.3. Full card details are processed by payment providers. ${COMPANY_NAME} does not intentionally store full payment card numbers.`,
        },
        {
            type: "text",
            title: `20. Data Protection and Privacy`,
            description:
                `20.1. We process personal data in accordance with our Privacy Policy and applicable data protection laws, including the UK GDPR and the Data Protection Act 2018 where applicable.

20.2. Customer information may be shared with assigned Experts, internal reviewers, support personnel and service providers where necessary to perform the Order, provide revisions, resolve disputes, process payments, prevent fraud or comply with law.

20.3. Experts must process Customer information only as necessary to perform the assigned work and must not use Customer information for their own marketing, direct contact, external portfolio use or unrelated purposes.

20.4. For more information about how we collect, use, store and protect personal data, please review our Privacy Policy.`,
        },
        {
            type: "text",
            title: `21. Warranties and Disclaimers`,
            description:
                `21.1. We warrant that we will provide the Service with reasonable care and skill.

21.2. Except as expressly stated in these Terms, the Service and Deliverables are provided on an "as is" and "as available" basis.

21.3. We do not warrant that:

the Service will be uninterrupted, error-free or always available;

Deliverables will be free from factual, financial, market or formatting errors;

Deliverables will meet the requirements of any specific investor, lender, university, regulator, public authority or third party;

any financial projections will be achieved;

any fundraising, loan approval, investment, grant, sale, profit, revenue or business outcome will occur;

any Deliverable will be suitable for legal, tax, accounting, investment, medical or regulated purposes without independent professional review.

21.4. You should obtain independent professional advice before relying on Deliverables for legal, tax, accounting, investment, medical, regulated, fundraising or high-value commercial decisions.`,
        },
        {
            type: "text",
            title: `22. Limitation of Liability`,
            description:
                `22.1. Nothing in these Terms limits or excludes liability for death or personal injury caused by negligence, fraud, fraudulent misrepresentation, or any liability that cannot be limited or excluded by law.

22.2. Subject to Section 22.1, our total aggregate liability arising out of or in connection with the Service in any 12-month period shall not exceed the total amount paid by you to ${COMPANY_NAME} for the relevant Services during that 12-month period.

22.3. Subject to Section 22.1, we are not liable for indirect, incidental, special, punitive or consequential losses, including loss of profits, loss of revenue, loss of business, loss of goodwill, loss of anticipated savings, loss of opportunity, loss of data, failed fundraising, investor rejection, lender rejection, business interruption or reputational damage.

22.4. We are not liable for losses caused by inaccurate Customer inputs, missing information, late responses, unauthorised third-party data, misuse of Deliverables, unsupported assumptions, changes in market conditions, third-party requirements, platform outages outside our control, payment provider delays or force majeure events.`,
        },
        {
            type: "text",
            title: `23. Indemnity`,
            description:
                `23.1. You agree to indemnify and hold harmless ${COMPANY_NAME}, its directors, officers, employees, contractors, Experts, suppliers and service providers from and against claims, losses, damages, liabilities, costs and expenses arising from:

your breach of these Terms;

your unlawful or improper use of the Service;

your misuse of Deliverables;

your infringement of third-party rights;

your submission of unlawful, misleading or unauthorised content;

your attempt to circumvent ${COMPANY_NAME}'s platform, payment or communication rules.

23.2. This indemnity does not limit any mandatory rights you may have as a consumer.`,
        },
        {
            type: "text",
            title: `24. Suspension and Termination`,
            description:
                `24.1. We may suspend, restrict or terminate your Account or access to the Service if:

you breach these Terms;

payment fails, is reversed, charged back or suspected to be fraudulent;

you misuse Tokens, refunds, disputes or chargebacks;

you attempt to contact Experts directly or bypass ${COMPANY_NAME};

you submit unlawful, harmful, misleading or infringing content;

you create security, legal, operational or reputational risk;

we are required to do so by law, payment provider rules or public authority request.

24.2. Upon termination, your right to access the Service may cease. We may retain records as necessary for tax, accounting, dispute, fraud prevention, legal compliance and legitimate business purposes.

24.3. Termination does not affect rights and obligations that have already accrued, including payment obligations, confidentiality, intellectual property restrictions, dispute provisions, limitation of liability and indemnity obligations.`,
        },
        {
            type: "text",
            title: `25. Changes to the Service and Terms`,
            description:
                `25.1. We may update, modify, suspend or discontinue parts of the Service from time to time to reflect legal, technical, security, commercial or operational changes.

25.2. We may update these Terms from time to time. The Effective date will indicate the latest version.

25.3. Where changes are material, we will use reasonable efforts to notify registered users by email, dashboard notice or prominent website notice.

25.4. Continued use of the Service after the updated Terms take effect constitutes acceptance of the updated Terms.`,
        },
        {
            type: "text",
            title: `26. Notices`,
            description:
                `26.1. Notices to ${COMPANY_NAME} should be sent to ${COMPANY_EMAIL} or by post to our registered office.

26.2. We may send notices to you by email, dashboard message, in-product notice or other contact details associated with your Account.

26.3. You are responsible for keeping your contact details up to date.`,
        },
        {
            type: "text",
            title: `27. Governing Law and Jurisdiction`,
            description:
                `27.1. These Terms are governed by the laws of England and Wales.

27.2. The courts of England and Wales have exclusive jurisdiction, except that consumers resident in Scotland, Northern Ireland or an EU Member State may have the right to bring proceedings in their local courts where mandatory consumer law allows.`,
        },
        {
            type: "text",
            title: `28. Miscellaneous`,
            description:
                `28.1. If any provision of these Terms is found invalid or unenforceable, the remaining provisions will continue in full force.

28.2. No failure or delay by ${COMPANY_NAME} to enforce any provision will constitute a waiver.

28.3. You may not assign or transfer your rights or obligations under these Terms without our prior written consent.

28.4. We may assign or transfer our rights and obligations to an affiliate, successor, purchaser or other entity in connection with a merger, acquisition, restructuring, sale of assets or transfer of business.

28.5. These Terms, together with the policies referenced in them, form the entire agreement between you and ${COMPANY_NAME} in relation to the Service.`,
        },
        {
            type: "text",
            title: `29. Contact Details`,
            description:
                `${COMPANY_LEGAL_NAME}
Registered office: ${COMPANY_ADDRESS}
Company number: ${COMPANY_NUMBER}
Email: ${COMPANY_EMAIL}
Tel: ${COMPANY_PHONE}`,
        },
    ],
};

export default termsSchema;
