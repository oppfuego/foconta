import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
    COMPANY_PHONE,
} from "@/resources/constants";

const refundPolicySchema: PageSchema = {
    meta: {
        title: `Refund / Return Policy - ${COMPANY_NAME}`,
        description: `Official Refund / Return Policy for ${COMPANY_NAME}: refunds for tokens, digital outputs, services, and consumer rights.`,
        keywords: ["refund policy", "return policy", `${COMPANY_NAME}`, "tokens", "AI business", "digital content", "consumer rights"],
        canonical: "/refund-policy",
        ogImage: {
            title: `${COMPANY_NAME} - Refund / Return Policy`,
            description: `Transparent refund and return policy for ${COMPANY_NAME} AI business planning platform.`,
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: `Refund / Return Policy`,
            description: `Effective date: 01 June 2026`,
        },
        {
            type: "text",
            title: `1. Summary`,
            description:
                `This Policy explains how refunds, cancellations, disputes, reworks and Token credits are handled on ${COMPANY_NAME}.

${COMPANY_NAME} provides digital services only. We do not sell or ship physical goods, so there are no physical returns.

Refunds are assessed under this Policy, our Terms and Conditions, and applicable consumer law.

Typical refund processing time after approval is 5-10 business days, although bank and payment-provider timelines may vary.

A refund will not exceed the amount originally paid for the relevant Token top-up, package, Order or transaction.

Spent Tokens and Tokens redeemed for delivered digital content are generally non-refundable, except where this Policy or applicable law provides otherwise.

Expert Orders follow specific cancellation, revision and dispute rules because work may begin shortly after an Order is placed.

Promotional, bonus or complimentary Tokens are non-refundable.

Refund and cancellation requests must be sent to ${COMPANY_EMAIL} with your Order reference and supporting details.

Accepted currencies: GBP (£), EUR (€) and USD ($).

Accepted payment methods: Visa and Mastercard.`,
        },
        {
            type: "text",
            title: `2. Scope and Legal Note`,
            description:
                `This Refund / Return Policy ("Policy") applies to Tokens, AI-generated digital outputs, Expert Services, Investor Packs, Custom Plans, Add-ons, downloadable files and other digital services supplied by ${COMPANY_LEGAL_NAME} via foconta.co.uk ("${COMPANY_NAME}", "we", "us", "our").

Nothing in this Policy limits or excludes any mandatory consumer rights you may have under applicable law, including the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 and the Consumer Rights Act 2015, where applicable.

Because ${COMPANY_NAME} supplies digital content and digital services, cancellation rights may be affected once you request immediate supply, start an AI generation, redeem Tokens, place an Expert Order, download a Deliverable, or otherwise access the relevant digital content or service.`,
        },
        {
            type: "text",
            title: `3. Definitions`,
            description:
                `For the purposes of this Policy:

Account means your registered user profile on ${COMPANY_NAME}.

AI Instant Plan means a business plan or related output generated primarily through ${COMPANY_NAME}'s AI-powered tools based on your inputs.

Business Hours means Monday to Friday, excluding UK public holidays, unless otherwise stated or agreed in writing.

Customer means a person or entity purchasing Tokens, redeeming Tokens or ordering Services through ${COMPANY_NAME}.

Deliverables / Outputs means any digital materials supplied through ${COMPANY_NAME}, including business plans, reports, market notes, competitor analysis, financial projections, spreadsheets, pitch decks, PDF files, DOCX files, presentations, text exports, AI-generated outputs and expert-prepared outputs.

Expert means an independent specialist, freelancer or contractor who may be assigned by ${COMPANY_NAME} to prepare, review or assist with a Deliverable.

Expert Order means any Order that involves an Expert, including the Expert 24h Plan, Investor Pack or Custom Plan where expert work is included.

Expert Assigned means the point at which ${COMPANY_NAME} has allocated an Expert to the relevant Order. For refund purposes, this may be treated as the point at which substantial preparation has begun.

Investor Pack means a package that may include a business plan, investor pitch deck, design layout, investor-ready formatting and expert support, as described at the time of purchase.

Custom Plan means a tailored package with flexible scope and dynamic pricing displayed or agreed before confirmation.

Order means a confirmed purchase, Token top-up, Token redemption, AI generation request, Expert Order or package purchase.

Redeemed / Spent Tokens means Tokens used to access, generate, order or receive a Service or Deliverable.

Tokens / Credits means ${COMPANY_NAME}'s internal prepaid digital credits used to access or pay for Services. Tokens are not cash, e-money, cryptocurrency, securities, bank deposits or financial instruments.

Unused Tokens means Tokens credited to your Account but not yet redeemed.

Promotional / Bonus Tokens means Tokens issued free of charge, at a discount, as part of a promotion, or as an incentive.`,
        },
        {
            type: "text",
            title: `4. Token Rates, Currencies and Payment Methods`,
            description:
                `4.1. ${COMPANY_NAME} currently supports the following target Token rate:

100 Tokens = 1 GBP

100 Tokens = 1.17 EUR

100 Tokens = 1.29 USD

4.2. Payments are accepted in GBP (£), EUR (€) and USD ($) using Visa and Mastercard.

4.3. Unless otherwise stated at checkout, applicable taxes are included in the displayed price.

4.4. If your card or bank account is denominated in another currency, your card issuer or payment provider may apply currency conversion rates, fees or charges. ${COMPANY_NAME} is not responsible for fees charged by your bank, card issuer or payment provider.`,
        },
        {
            type: "text",
            title: `5. General Refund Principles`,
            description:
                `5.1. Refund amount cap. Any refund will not exceed the original amount paid for the relevant Token top-up, package, Order or transaction.

5.2. Original payment method. Refunds are normally issued to the original payment method and in the original checkout currency.

5.3. No cash-out. Customers cannot exchange Tokens for cash, withdraw Tokens as fiat currency, or transfer Tokens to another user, except where a refund is approved under this Policy or required by law.

5.4. Account-bound Tokens. Tokens are linked to your Account and cannot be sold, assigned, traded, transferred or resold.

5.5. Promotional Tokens. Promotional, bonus, complimentary or incentive Tokens are non-refundable and have no cash value.

5.6. Processor fees. Where permitted by law and payment-provider rules, non-recoverable payment-processing fees, card fees, chargeback fees or currency conversion costs may be deducted from a refund or excluded from the refundable amount.

5.7. No refund for change of mind after use. Once Tokens have been redeemed and a digital service has started or a Deliverable has been supplied, refunds are limited to the circumstances described in this Policy or required by law.`,
        },
        {
            type: "text",
            title: `6. Refunds for Unused Tokens`,
            description:
                `6.1. If you are a consumer, you may request cancellation of a Token top-up within 14 days of purchase, provided that no Tokens from that top-up have been redeemed.

6.2. If part of a Token top-up has been redeemed, the top-up may no longer be eligible for a full refund. ${COMPANY_NAME} may, at its discretion or where required by law, approve a partial refund, Token credit, or other reasonable remedy.

6.3. Unused Tokens are refunded based on the amount originally paid for the relevant top-up, not based on later exchange-rate movements or later Token price changes.

6.4. Bonus or promotional Tokens issued together with a refunded top-up may be removed from your Account.

6.5. If Tokens were purchased through a promotion, discount, bundle or special offer, the refundable amount may reflect the actual discounted amount paid.`,
        },
        {
            type: "text",
            title: `7. Refunds for AI Instant Plan`,
            description:
                `7.1. The AI Instant Plan is a digital content service generated based on your inputs.

7.2. By starting an AI generation, you request immediate supply of digital content. Once generation has started or the Deliverable has been made available, your cancellation rights may be limited.

7.3. Tokens redeemed for an AI Instant Plan are generally non-refundable once the generation has started or the output has been supplied, except where:

the output is not delivered due to a technical issue attributable to ${COMPANY_NAME};

the file is corrupted, inaccessible or materially incomplete;

the output is clearly not as described;

${COMPANY_NAME} is required by law to provide a refund or remedy.

7.4. If an AI generation fails for technical reasons attributable to ${COMPANY_NAME} and no usable output is supplied, we may restore the relevant Tokens, re-run the generation, provide support, or issue another appropriate remedy.

7.5. Dissatisfaction with style, wording, business assumptions, market interpretation or AI-generated structure will normally be handled through available editing, regeneration, support or revision options rather than a refund, unless the output is defective or not as described.`,
        },
        {
            type: "text",
            title: `8. Refunds and Cancellations for Expert Orders`,
            description:
                `8.1. Expert Orders include any package or Order involving an Expert, including the Expert 24h Plan, Investor Pack and Custom Plan where expert work is included.

8.2. You may request cancellation of an Expert Order by emailing ${COMPANY_EMAIL} with your Order reference, Account email and reason for cancellation.

8.3. If you request cancellation before an Expert has been assigned, ${COMPANY_NAME} may restore the redeemed Tokens or approve a refund to the original payment method, subject to fraud checks, payment status, processor rules and applicable law.

8.4. Once an Expert has been assigned, the Order has entered the expert workflow and substantial preparation may be treated as having begun.

8.5. After an Expert has been assigned, cancellation is not automatically eligible for a full refund. ${COMPANY_NAME} may, depending on the circumstances, offer:

continuation of the Order;

amended delivery timing;

replacement Expert;

rework;

Token credit;

partial refund;

full refund, where required by law or appropriate in exceptional circumstances;

rejection of the cancellation request with reasons.

8.6. Expert Orders are customised digital services prepared based on your selected Specialisation, brief, business information, instructions and uploaded files. Once work has substantially begun, refunds may be limited.

8.7. If you fail to provide required information, do not respond to clarification requests, provide contradictory instructions, change the scope, or delay the Expert's work, this may pause or extend delivery timing and may reduce or remove refund eligibility.

8.8. If ${COMPANY_NAME} fails to supply the Expert Service as contracted and the failure is attributable to ${COMPANY_NAME}, we may provide rework, replacement Expert support, Token credit, partial refund, full refund or another appropriate remedy.`,
        },
        {
            type: "text",
            title: `9. Delivery Timing and Delay Remedies`,
            description:
                `9.1. For the Expert 24h Plan, the advertised delivery period is calculated in Business Hours.

9.2. The delivery period starts when the Customer has placed the Order and submitted the information reasonably required to begin work.

9.3. Delivery timing may be paused or extended where:

the Customer has not submitted a complete brief;

required files are missing, corrupted or unusable;

the Expert or ${COMPANY_NAME} support requests clarification;

the Customer changes the scope or Specialisation;

payment, fraud or security review is pending;

the Order is unusually complex;

technical, third-party or force majeure issues affect delivery.

9.4. Weekends and UK public holidays are not included in the 24-hour delivery period unless ${COMPANY_NAME} expressly agrees otherwise or an Expert voluntarily completes work during that period.

9.5. If a delay occurs, ${COMPANY_NAME} will review the circumstances and may agree with the Customer on an appropriate remedy, such as:

revised delivery time;

priority handling;

additional support;

rework;

Token credit;

partial refund;

another reasonable solution.

9.6. Delay does not automatically create a right to a full refund where the delay was caused by incomplete Customer information, late Customer responses, scope changes, fraud checks, force majeure, payment issues or third-party outages.`,
        },
        {
            type: "text",
            title: `10. Revisions and Rework`,
            description:
                `10.1. Unless otherwise stated at the time of purchase, each Expert 24h Plan, Investor Pack and paid Expert Service includes one free revision round.

10.2. The free revision request must be submitted within 14 days after delivery.

10.3. Revisions are limited to the original brief, package scope, selected Specialisation, submitted information and agreed Deliverable format.

10.4. A revision may include reasonable corrections, clarifications, formatting improvements, minor content adjustments or better alignment with the original brief.

10.5. A revision does not include:

a new business idea;

a new market;

a new industry;

a new Specialisation;

a new financial model;

a new pitch deck concept;

major rewriting;

substantial change of assumptions;

redesign beyond the package scope;

work that materially differs from the original Order.

10.6. Requests outside the original scope may require additional Tokens, a paid add-on, a Custom Plan or a new Order.

10.7. If you are dissatisfied with an Expert Deliverable, you must first allow ${COMPANY_NAME} a reasonable opportunity to provide revision or rework before a refund review is considered, unless applicable law requires otherwise.`,
        },
        {
            type: "text",
            title: `11. Disputes and Internal Review Process`,
            description:
                `11.1. A dispute about an Expert Deliverable must be submitted within 7 days after delivery.

11.2. To submit a dispute, email ${COMPANY_EMAIL} with:

Order reference;

Account email;

package name;

explanation of the issue;

specific parts of the Deliverable you dispute;

supporting evidence, screenshots or examples;

requested remedy.

11.3. If no dispute is submitted within 7 days after delivery, the Deliverable may be treated as accepted for refund and dispute purposes, without limiting any mandatory statutory rights.

11.4. Downloading, using, submitting, sharing, presenting or otherwise relying on a Deliverable may be considered evidence that you accessed and used the digital content and may affect refund eligibility.

11.5. ${COMPANY_NAME} support will review disputes based on relevant evidence, including:

original brief;

selected Specialisation;

package scope;

Customer instructions;

uploaded files;

Expert work records;

delivery timestamps;

revision history;

download/access logs;

support communications;

payment and Token redemption records.

11.6. ${COMPANY_NAME} will aim to provide a dispute decision or proposed remedy within 10 business days after receiving sufficient information, although complex cases may take longer.

11.7. Following review, ${COMPANY_NAME} may decide to:

require revision or rework;

assign a replacement Expert;

extend the delivery period;

issue Token credit;

issue a partial refund;

issue a full refund;

reject the dispute with reasons.

11.8. The internal review process is intended to resolve disputes fairly and efficiently. It does not prevent you from exercising any mandatory legal rights available to you.`,
        },
        {
            type: "text",
            title: `12. Custom Plans and Add-ons`,
            description:
                `12.1. Custom Plans, Investor Packs, bespoke research, additional financial modelling, design work, pitch deck preparation, localisation, extra revisions, urgent support and other Add-ons may involve customised work.

12.2. Customised or bespoke work is generally non-refundable once preparation has substantially begun, unless ${COMPANY_NAME} fails to supply the Service as contracted, the Deliverable is defective or not as described, or a refund is required by law.

12.3. If a Custom Plan is priced dynamically, the applicable Token cost or payment amount will be displayed or agreed before confirmation.

12.4. If a Custom Plan is cancelled before work has substantially begun, ${COMPANY_NAME} may offer a refund, Token restoration or Token credit depending on the payment status, scope and circumstances.

12.5. Extra revision rounds, urgent add-ons and scope expansions are treated as separate paid services and follow the same refund principles as the main Order.`,
        },
        {
            type: "text",
            title: `13. Defective, Corrupted or Misdescribed Deliverables`,
            description:
                `13.1. If a Deliverable is corrupted, inaccessible, materially incomplete, missing an agreed file, or clearly not as described, you should contact ${COMPANY_EMAIL} as soon as possible and provide your Order reference and supporting evidence.

13.2. Depending on the issue, ${COMPANY_NAME} may:

repair the file;

re-send the file;

re-generate the output;

require Expert correction;

provide a replacement Deliverable;

restore Tokens;

issue Token credit;

provide a partial refund;

provide a full refund where appropriate or required by law.

13.3. Minor wording preferences, subjective dissatisfaction, disagreement with non-guaranteed business assumptions, or a change of mind after delivery will not normally qualify as a defect.

13.4. ${COMPANY_NAME} is not responsible for errors caused by inaccurate, incomplete, misleading, outdated or unlawful information supplied by the Customer.`,
        },
        {
            type: "text",
            title: `14. Expert Payouts and Customer Refunds`,
            description:
                `14.1. Where an Expert Order is completed, the internal value of the Order may be converted by ${COMPANY_NAME} into an Expert payout balance after deduction of ${COMPANY_NAME}'s applicable platform commission.

14.2. ${COMPANY_NAME}'s standard platform commission for Expert Orders is 20%, unless otherwise agreed in writing.

14.3. Expert payout eligibility may be delayed, reduced or cancelled if the relevant Order is disputed, refunded, charged back, reversed, fraudulent, incomplete, defective or affected by Expert misconduct.

14.4. A Customer refund, chargeback or reversal may affect whether the Expert receives payout for the relevant Order.

14.5. Token conversion for Expert payouts is an internal settlement mechanism between ${COMPANY_NAME} and Experts. It does not make Tokens cash, e-money, cryptocurrency, securities, bank deposits or a general cash-equivalent product for Customers.`,
        },
        {
            type: "text",
            title: `15. Chargebacks, Fraud and Abuse`,
            description:
                `15.1. If you initiate a chargeback while a refund or dispute request is pending, ${COMPANY_NAME} may treat the matter as a payment dispute and submit transaction evidence to the payment provider.

15.2. Filing a chargeback before allowing ${COMPANY_NAME} to complete its support, revision, rework or dispute process may result in:

temporary Account suspension;

removal of disputed Tokens;

restriction of access to Deliverables;

suspension of pending Orders;

rejection or delay of further refund review;

submission of evidence to payment providers;

closure of the Account in cases of abuse or fraud.

15.3. If funds are reversed, ${COMPANY_NAME} may remove the equivalent Tokens, revoke access to related Deliverables, cancel pending Orders and recover amounts owed where lawful.

15.4. We may refuse refunds, suspend Accounts or close Accounts where we reasonably suspect fraud, abuse, repeated chargebacks, misuse of the refund process, false claims, unauthorised payment use, or attempts to obtain services without payment.`,
        },
        {
            type: "text",
            title: `16. How to Request a Refund, Cancellation or Dispute Review`,
            description:
                `To request a refund, cancellation or dispute review, email ${COMPANY_EMAIL} and provide:

Order reference number;

Account email used for purchase;

package or Service name;

whether the request concerns Unused Tokens, AI output, Expert Order, Investor Pack, Custom Plan or Add-on;

explanation of the issue;

relevant screenshots, file details or supporting evidence;

whether you request refund, Token credit, rework, replacement Expert or another remedy.

Upon receipt, we will aim to:

acknowledge the request within 5 business days;

investigate and request additional information if needed;

provide a decision or proposed remedy;

process any approved refund within 5-10 business days, subject to bank and payment-provider timelines.`,
        },
        {
            type: "text",
            title: `17. Refund Method`,
            description:
                `17.1. Approved refunds are normally issued to the original payment method in the original checkout currency.

17.2. If refund to the original payment method is not possible, ${COMPANY_NAME} may offer a reasonable alternative, such as bank transfer, subject to verification, compliance checks and payment-provider rules.

17.3. Token credits or restored Tokens may be offered where appropriate, especially for technical failures, rework situations, delayed delivery, partial service issues, or where the Customer agrees to continue using the Service.

17.4. Token credits are not cash and cannot be withdrawn, transferred or exchanged, unless required by law.`,
        },
        {
            type: "text",
            title: `18. Record Keeping and Retention`,
            description:
                `18.1. We retain records relevant to Orders, refunds, disputes and chargebacks, including Order IDs, Token purchase and redemption history, checkout confirmations, acceptance records, timestamps, IP address, device information, delivery logs, access/download logs, Expert assignment records, support communications and dispute evidence.

18.2. These records may be retained for at least 24 months, and up to 6 years where required for tax, accounting, dispute, fraud prevention, chargeback, enterprise, regulatory or legal purposes.

18.3. Retention is handled in accordance with our Privacy Policy and applicable data protection law.`,
        },
        {
            type: "text",
            title: `19. Changes to this Policy`,
            description:
                `19.1. We may update this Policy from time to time to reflect changes in our Service, pricing, packages, Expert workflow, payment providers, legal requirements or business processes.

19.2. Material changes will be notified to registered users by email, dashboard notice or prominent website notice where appropriate.

19.3. Changes apply prospectively and do not affect refund decisions for completed transactions unless required by law.`,
        },
        {
            type: "text",
            title: `20. Examples`,
            description:
                `The following examples are illustrative only and do not override the rules above.

20.1. Unused Tokens

You buy 2,000 Tokens in EUR and do not redeem any of them. You request cancellation within 14 days. If eligible, the refund is based on the original EUR amount paid for that top-up, subject to this Policy and payment-provider rules.

20.2. Partly Used Tokens

You buy 5,000 Tokens and redeem 2,000 Tokens for an Expert 24h Plan. The remaining Tokens may be assessed separately from the redeemed Tokens. A full refund of the original top-up may no longer be available.

20.3. AI Output Already Generated

You redeem Tokens for an AI Instant Plan and the output is generated and made available. A refund is generally not available for change of mind, but ${COMPANY_NAME} may assist if the file is corrupted, inaccessible or not supplied.

20.4. Expert Cancellation Before Assignment

You place an Expert Order and email support requesting cancellation before an Expert is assigned. ${COMPANY_NAME} may restore Tokens or approve a refund, subject to review.

20.5. Expert Cancellation After Assignment

You place an Expert Order and an Expert is assigned. Because substantial preparation may have begun, a full refund is not automatic. ${COMPANY_NAME} may offer rework, revised timing, Token credit, partial refund or another appropriate remedy.

20.6. Revision Request

You receive an Expert Deliverable and request reasonable corrections within 14 days. If the request is within the original brief and package scope, it may be handled as your free revision round.

20.7. New Scope After Delivery

You receive a restaurant business plan and then ask for it to be changed into a SaaS business plan. This is a new scope and may require additional Tokens or a new Order.

20.8. Promotional Tokens

You receive 100 bonus Tokens as part of a campaign. These Tokens are non-refundable and cannot be exchanged for cash.`,
        },
        {
            type: "text",
            title: `21. Contact Details`,
            description:
                `${COMPANY_LEGAL_NAME}
Registered office: ${COMPANY_ADDRESS}
Email: ${COMPANY_EMAIL}
Tel: ${COMPANY_PHONE}
Accepted currencies: GBP (£), EUR (€), USD ($)
Payment methods: Visa, Mastercard`,
        },
    ],
};

export default refundPolicySchema;
