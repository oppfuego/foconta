import { PageSchema } from "@/components/constructor/page-render/types";

const privacyPolicySchema: PageSchema = {
    meta: {
        title: "Privacy Policy - Foconta",
        description: "Foconta Privacy Policy: details on what data we collect, how we use it, how long we retain it, and your rights under UK GDPR.",
        keywords: ["privacy policy", "GDPR", "data protection", "foconta", "AI business", "personal data", "uk gdpr"],
        canonical: "/privacy-policy",
        ogImage: {
            title: "Foconta - Privacy Policy",
            description: "Transparent privacy practices for Foconta AI business planning platform under UK GDPR.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: `Privacy Policy`,
            description: `Effective date: 01 June 2026`,
        },
        {
            type: "text",
            title: `1. Introduction`,
            description:
                `We respect your privacy. This Privacy Policy explains what personal data we collect, why we use it, how we share it, how long we keep it, and how you can exercise your rights when using foconta.co.uk and related services (the "Service").

Controller: THE COMPANY YOU NEED LTD
Company number: 15967968
Registered office: 31 Auctioneers Way, Northampton, United Kingdom, NN1 1HF
Trading name: Foconta
Contact: info@foconta.co.uk

In this Privacy Policy, "Foconta", "we", "us" and "our" refer to THE COMPANY YOU NEED LTD.

This Policy applies to Customers, registered users, website visitors, Experts, applicants, contractors and other individuals who interact with the Service. The Service is intended for individuals aged 18 or over.`,
        },
        {
            type: "text",
            title: `2. What Foconta Does`,
            description:
                `Foconta provides digital business planning services, including AI-assisted business plan generation, expert-prepared business plans, investor packs, pitch deck support, financial planning support, downloadable documents and related services.

Some Services are delivered automatically using AI tools. Other Services may involve independent Experts, freelancers or contractors assigned by Foconta based on your selected package, brief, business requirements and selected Specialisation.`,
        },
        {
            type: "text",
            title: `3. Personal Data We Collect`,
            description:
                `We collect only the personal data reasonably necessary to operate, deliver, secure, support and improve the Service.

3.1 Account and contact data

We may collect:

name or display name;

email address;

phone number, where provided;

account login details;

account preferences;

language preferences;

communication preferences;

customer support history.

Passwords are stored in protected form and are not stored in plain text.

3.2 Billing, payment and Token data

We may collect and process:

billing name;

billing address;

country of residence or billing country;

tax or VAT information, where provided or required;

payment confirmation details;

transaction references;

Token purchase history;

Token redemption history;

package selected;

Order references;

refund and chargeback records;

invoice and receipt information.

We do not intentionally store full payment card numbers. Card payments are processed by third-party payment providers.

Foconta currently supports payments in EUR (€) and USD ($) through Visa and Mastercard.

3.3 Business plan inputs and Customer content

When you use the Service, we may collect the information you provide for business plan generation or expert work, including:

business idea;

business name;

industry;

selected Specialisation;

target market;

geography;

customer segments;

competitors;

pricing assumptions;

revenue assumptions;

costs and financial assumptions;

milestones;

KPIs;

business goals;

funding goals;

marketing strategy;

operational details;

pitch deck instructions;

branding details;

files, spreadsheets, documents, images or other materials you upload;

any additional information you choose to submit.

This information may include personal data about you, your team members, shareholders, employees, customers, suppliers or other third parties if you include it in your brief or uploaded files.

3.4 Expert applicant and Expert profile data

If you register or apply as an Expert, we may collect:

name;

email address;

phone number;

country of residence;

professional profile information;

selected Specialisations;

experience;

skills;

education;

certifications;

portfolio materials;

sample work;

CV or professional biography;

languages;

availability;

performance data;

quality review records;

internal rating or status;

verification status;

communications with Foconta;

payout request data.

Experts may be required to complete onboarding, profile review, skill selection and internal verification after registration.

3.5 Expert payout and settlement data

For Experts, we may process:

payout request details;

preferred payout currency;

bank account or card payout details, where required;

payment references;

payout status;

commission records;

Order completion records;

dispute and chargeback status;

tax or invoicing information, where needed.

Expert payouts may be made in EUR or USD to a bank account or card, subject to verification, payment provider rules and Foconta's internal process.

3.6 Communications and support data

We may collect and store:

emails sent to or from Foconta;

support tickets;

refund requests;

dispute messages;

revision requests;

Order clarification messages;

Expert-Customer communications routed through Foconta;

complaints;

internal notes needed to resolve support issues.

Customer and Expert communication must take place through Foconta-controlled platform, email or workflow channels. We may review such communications for service delivery, dispute resolution, quality control, fraud prevention and compliance.

3.7 Technical and usage data

When you use the Service, we may collect:

IP address;

device type;

browser type and version;

operating system;

timezone;

language;

pages viewed;

clicks;

login attempts;

session information;

error logs;

performance logs;

security telemetry;

anti-abuse signals;

generation attempts;

delivery timestamps;

download/access logs;

Token activity;

Order status events.

3.8 Data from third parties

We may receive limited information from third parties, including:

payment processors;

fraud-prevention providers;

hosting and infrastructure providers;

analytics providers;

email delivery providers;

professional advisers;

public sources, where relevant to Expert verification or business plan research.

We do not sell your personal data.`,
        },
        {
            type: "text",
            title: `4. Special Category Data and Sensitive Information`,
            description:
                `We do not intentionally request special category personal data, such as health information, racial or ethnic origin, political opinions, religious beliefs, trade union membership, biometric data, genetic data or information about sex life or sexual orientation.

However, you may voluntarily include such information in prompts, uploaded files, business descriptions, healthcare business plans, non-profit plans or other materials.

Where special category data is voluntarily provided, we will process it only where necessary to provide the requested Service and where we have a valid legal basis under applicable data protection law, such as your explicit consent or another lawful condition.

You should not submit patient records, medical records, payment card numbers, government identifiers, passwords, third-party trade secrets, or highly sensitive information unless strictly necessary, lawful and authorised.`,
        },
        {
            type: "text",
            title: `5. Data About Other People`,
            description:
                `If you provide personal data about another person, you are responsible for ensuring that you have a lawful basis to do so and that any required notice, consent or permission has been obtained.

This may include data about co-founders, employees, contractors, investors, shareholders, customers, suppliers, team members or business partners included in your business plan materials.`,
        },
        {
            type: "text",
            title: `6. Why We Process Personal Data and Legal Bases`,
            description:
                `We process personal data under the UK GDPR and the Data Protection Act 2018 on the following legal bases.

6.1 Performance of a contract

We process personal data to:

create and manage your Account;

process Token purchases and redemptions;

process Orders;

deliver AI Instant Plans;

assign Experts;

deliver Expert 24h Plans, Investor Packs and Custom Plans;

provide downloadable files;

manage revisions and rework;

handle support requests;

process refunds and disputes;

process Expert onboarding and Expert Services;

manage Expert payout requests.

6.2 Consent

We may rely on consent to:

send marketing emails where required;

use non-essential cookies;

process special category data you voluntarily submit where explicit consent is required;

use Customer content or feedback for model improvement where we ask for consent;

publish testimonials, case studies or portfolio examples where identifiable information is used.

You may withdraw consent at any time by contacting us at info@foconta.co.uk or using available account or cookie settings. Withdrawal does not affect processing already carried out lawfully before withdrawal.

6.3 Legitimate interests

We may process personal data for our legitimate interests, including:

securing the Service;

detecting fraud, abuse, bots, chargeback abuse and unauthorised access;

enforcing our Terms and policies;

managing Expert quality and service standards;

assigning suitable Experts based on Specialisation and Order requirements;

reviewing support, refund and dispute evidence;

improving Service reliability and user experience;

analysing aggregate usage and performance;

communicating important non-marketing Service updates;

maintaining business records;

protecting Foconta, Customers, Experts and third parties from harm or misuse;

conducting limited B2B outreach related to our Service, subject to your right to object.

We balance our interests against your rights and freedoms and use safeguards where appropriate.

6.4 Legal obligation

We process personal data where necessary to:

comply with tax and accounting obligations;

maintain transaction records;

respond to lawful requests from authorities;

comply with court orders or legal processes;

meet data protection obligations;

prevent unlawful activity where required by law.

6.5 Establishment, exercise or defence of legal claims

We may process and retain relevant data where necessary to establish, exercise or defend legal claims, including disputes, chargebacks, complaints, investigations, contractual claims or regulatory matters.`,
        },
        {
            type: "text",
            title: `7. AI, Automated Processing and Profiling`,
            description:
                `Foconta uses AI tools to generate, structure, analyse and improve business plan materials based on the information you provide.

This may involve automated processing to:

generate business plan drafts;

structure business sections;

create financial assumptions;

suggest market or competitor analysis;

format Deliverables;

adapt tone, language and presentation;

support Experts with research and drafting.

For Expert Services, AI may be used as a support tool, but the assigned Expert may review, write, refine or adapt the Deliverable depending on the package and scope.

We do not make legal or similarly significant decisions about you solely by automated means. Foconta does not use AI to make decisions such as credit approval, investment decisions, employment decisions or legally binding eligibility determinations.

You may request human review of a support, dispute or refund outcome by contacting us.`,
        },
        {
            type: "text",
            title: `8. Expert Matching and Expert Access to Customer Data`,
            description:
                `When you place an Expert Order, Foconta may share relevant Customer data with the assigned Expert so that the Expert can perform the requested work.

This may include:

your brief;

selected Specialisation;

business idea;

market information;

financial assumptions;

uploaded files;

Order details;

revision requests;

support messages;

delivery requirements.

Experts are required to use Customer information only for the assigned work and to comply with confidentiality obligations. Experts must not use Customer information for their own marketing, direct contact, portfolio use, resale, publication or unrelated purposes unless expressly authorised.

Foconta may restrict or remove an Expert who misuses Customer information, attempts to bypass Foconta, breaches confidentiality, or violates our Terms.`,
        },
        {
            type: "text",
            title: `9. Sharing Personal Data`,
            description:
                `We share personal data only where necessary for the purposes described in this Policy.

We may share data with:

assigned Experts and internal reviewers;

payment processors and card acquirers;

banks or payout providers;

fraud-prevention and security providers;

hosting, cloud infrastructure and storage providers;

email delivery providers;

analytics and performance tools;

customer support and helpdesk tools;

AI infrastructure or processing providers;

professional advisers, including legal, accounting and compliance advisers;

public authorities, courts or regulators where required by law;

potential purchasers or successors in connection with a business transfer, restructuring, merger or sale of assets.

We require service providers and contractors to process personal data only for authorised purposes and to apply appropriate security and confidentiality safeguards.`,
        },
        {
            type: "text",
            title: `10. International Transfers`,
            description:
                `Some of our service providers, Experts, contractors or technical infrastructure may be located outside the United Kingdom or the European Economic Area.

Where personal data is transferred internationally, we use appropriate safeguards where required, such as:

UK adequacy regulations;

EU adequacy decisions, where relevant;

the UK International Data Transfer Agreement;

the UK Addendum to the EU Standard Contractual Clauses;

EU Standard Contractual Clauses;

supplementary technical and organisational measures where appropriate.`,
        },
        {
            type: "text",
            title: `11. Cookies and Similar Technologies`,
            description:
                `We use cookies and similar technologies, including localStorage, sessionStorage, pixels and analytics tools, to operate the Service, maintain security, remember preferences, measure performance and, where you consent, support analytics or marketing.

Essential cookies are necessary for core functionality and security. Non-essential cookies are used only where permitted by law and according to your choices.

For more information, please review our Cookies Policy.`,
        },
        {
            type: "text",
            title: `12. Marketing Communications`,
            description:
                `We may send marketing communications where you have opted in or where another lawful basis applies, such as permitted B2B communication under applicable rules.

You can unsubscribe from marketing emails at any time by using the unsubscribe link in the message or contacting info@foconta.co.uk.

We will still send important non-marketing messages where necessary, such as account notices, Order updates, security alerts, payment confirmations, policy updates and service communications.`,
        },
        {
            type: "text",
            title: `13. Retention`,
            description:
                `We keep personal data only as long as necessary for the purposes described in this Policy.

Typical retention periods include:

Account data: while the Account is active and for up to 24 months after closure, unless longer retention is required.

Orders, Tokens, payments, invoices and transaction records: at least 24 months and up to 6 years where required for tax, accounting, dispute, chargeback or legal purposes.

Customer briefs, uploaded files and Deliverables: while needed to provide the Service, support revisions, handle disputes and maintain account history, typically up to 24 months unless deletion is requested and no legal reason requires retention.

Expert profile and onboarding data: while the Expert account is active and for a reasonable period after closure, typically up to 24 months, unless longer retention is required for disputes, payments, tax, quality control or legal purposes.

Expert payout and commission records: up to 6 years where needed for tax, accounting, payment, audit or dispute purposes.

Support, refund and dispute records: typically up to 6 years where needed for legal, payment, chargeback or dispute purposes.

Security logs and technical telemetry: typically 6-24 months, depending on risk, security and operational needs.

Cookie consent records: typically at least 24 months, and longer where needed to demonstrate compliance.

Where feasible, we delete, anonymise or pseudonymise personal data when it is no longer needed.`,
        },
        {
            type: "text",
            title: `14. Security`,
            description:
                `We implement appropriate technical and organisational measures designed to protect personal data, including:

access controls;

role-based permissions;

administrative safeguards;

encryption in transit;

secure hosting practices;

logging and monitoring;

backup and recovery procedures;

vendor due diligence;

confidentiality obligations for Experts and contractors;

internal access restrictions;

incident response processes.

No online service can guarantee absolute security. You are responsible for keeping your login details secure and notifying us promptly of suspected unauthorised access.`,
        },
        {
            type: "text",
            title: `15. Your Rights`,
            description:
                `Subject to applicable law and legal limits, you may have the right to:

be informed about how your personal data is used;

access your personal data;

request correction of inaccurate or incomplete data;

request erasure of your data;

restrict processing;

object to processing based on legitimate interests;

object to direct marketing;

request data portability;

withdraw consent where processing is based on consent;

not be subject to a decision based solely on automated processing where it produces legal or similarly significant effects.

To exercise your rights, contact info@foconta.co.uk from the email associated with your Account where possible.

We may request proof of identity before responding. We aim to respond within one month. Where a request is complex or numerous, we may extend the response period by up to two further months, as permitted by law.`,
        },
        {
            type: "text",
            title: `16. Deleting Your Account`,
            description:
                `You may request deletion of your Account by contacting info@foconta.co.uk.

Account deletion may not immediately remove all data. We may retain certain records where necessary for:

tax and accounting obligations;

fraud prevention;

payment records;

chargebacks;

disputes;

legal claims;

security logs;

compliance with law;

enforcement of our Terms.

Where deletion is not possible immediately, we will restrict or minimise data where appropriate.`,
        },
        {
            type: "text",
            title: `17. Children's Data`,
            description:
                `The Service is intended for users aged 18 or over. We do not knowingly collect personal data from children.

If you believe a child has provided personal data to us, please contact info@foconta.co.uk so we can review and delete the data where appropriate.`,
        },
        {
            type: "text",
            title: `18. Confidentiality and Business Information`,
            description:
                `We understand that business plan materials may include confidential commercial information.

We use reasonable efforts to protect Customer business information and to limit access to those who need it to provide, support, secure or improve the Service, including assigned Experts, internal reviewers, support staff and service providers.

Experts are required to comply with confidentiality obligations. However, no online service can guarantee absolute confidentiality, and you should not submit information that you are not authorised or willing to share for the purpose of receiving the Service.`,
        },
        {
            type: "text",
            title: `19. Third-Party Links and Services`,
            description:
                `The Service may include links to third-party websites, tools or services. We are not responsible for the privacy practices, terms or content of third-party websites or services that we do not control.

Your use of third-party services may be subject to their own privacy policies and terms.`,
        },
        {
            type: "text",
            title: `20. Changes to This Privacy Policy`,
            description:
                `We may update this Privacy Policy from time to time to reflect changes in our Service, Expert workflow, payment processes, technologies, legal requirements or business operations.

Material changes will be notified by email, dashboard notice or prominent website notice where appropriate.

The Effective date at the top of this Policy indicates the latest version.`,
        },
        {
            type: "text",
            title: `21. Contact and Complaints`,
            description:
                `Controller: THE COMPANY YOU NEED LTD
Registered office: 31 Auctioneers Way, Northampton, United Kingdom, NN1 1HF
Email: info@foconta.co.uk
Tel: +44 7537 166412

If you are not satisfied with our response, you may lodge a complaint with the UK Information Commissioner's Office (ICO).

If you are resident in the European Union or European Economic Area, you may also have the right to lodge a complaint with your local data protection supervisory authority.`,
        },
    ],
};

export default privacyPolicySchema;
