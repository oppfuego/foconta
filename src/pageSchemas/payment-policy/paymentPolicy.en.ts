import { PageSchema } from "@/components/constructor/page-render/types";

const paymentPolicySchema: PageSchema = {
    meta: {
        title: "Payment Policy – Foconta",
        description: "Foconta Payment Policy: how payments, tokens, purchases, expert orders, payouts, and payment security are handled.",
        keywords: ["payment policy", "foconta", "tokens", "payments", "expert payouts", "Visa", "Mastercard", "EUR", "USD"],
        canonical: "/payment-policy",
        ogImage: {
            title: "Foconta – Payment Policy",
            description: "Transparent payment policy for Foconta AI business planning platform.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: `Payment Policy`,
            description:
                `Effective date: 01 June 2026`,
        },
        {
            type: "text",
            title: `1. Introduction`,
            description:
                `This Payment Policy explains how payments, Tokens, purchases, Expert Orders, Expert payouts, payment security, chargebacks and related payment matters are handled on foconta.co.uk and related services (the “Service”).

The Service is operated by THE COMPANY YOU NEED LTD (company number 15967968, registered office: 31 Auctioneers Way, Northampton, United Kingdom, NN1 1HF) trading as Foconta (“Foconta”, “we”, “us”, “our”).

By purchasing Tokens, redeeming Tokens, placing an Order, ordering an AI Instant Plan, ordering an Expert 24h Plan, purchasing an Investor Pack, requesting a Custom Plan, registering as an Expert, or requesting an Expert payout, you agree to this Payment Policy, our Terms and Conditions, Refund / Return Policy and any other policies referenced on the Service.`,
        },
        {
            type: "text",
            title: `2. Scope`,
            description:
                `This Policy applies to:

Token purchases;

AI Instant Plan payments;

Expert 24h Plan payments;

Investor Pack payments;

Custom Plan payments;

Add-ons and extra services;

refunds and payment reversals;

failed or disputed payments;

chargebacks;

Expert Order settlement;

Expert payout requests;

fraud, abuse and payment security checks.

This Policy applies to Customers, Experts and any other users who make or receive payments through Foconta.`,
        },
        {
            type: "text",
            title: `3. Accepted Currencies`,
            description:
                `Foconta currently supports the following checkout currencies:

EUR (€)

USD ($)

Foconta does not currently support GBP as a checkout currency. Any previous reference to GBP in older materials, screenshots or archived documents is superseded by this Policy.

If your bank account, card or payment account is denominated in another currency, your card issuer, bank or payment provider may apply its own exchange rate, conversion fee or other charges. Foconta is not responsible for fees, exchange rates or charges applied by your bank, card issuer or payment provider.`,
        },
        {
            type: "text",
            title: `4. Accepted Payment Methods`,
            description:
                `Foconta currently accepts:

Visa

Mastercard

Payment availability may depend on your country, card issuer, payment provider, fraud screening results, technical availability and applicable rules.

We may add, remove or restrict payment methods from time to time without prior notice.`,
        },
        {
            type: "text",
            title: `5. Taxes and Price Display`,
            description:
                `Unless otherwise stated at checkout, applicable taxes are included in the displayed price.

Before you confirm a payment, the checkout page or payment interface will show the amount payable, checkout currency and, where applicable, the number of Tokens to be credited or redeemed.

You are responsible for ensuring that your billing information is accurate and complete. If you act on behalf of a business, you are responsible for providing correct business billing details, tax details or invoice details where required.`,
        },
        {
            type: "text",
            title: `6. Tokens`,
            description:
                `6.1. Nature of Tokens. Tokens are Foconta’s internal prepaid digital credits used to access or pay for Services. Tokens are not cash, e-money, cryptocurrency, securities, bank deposits, financial instruments or stored-value money.

6.2. Token Rate. The current target Token rate is:

100 Tokens = 1.17 EUR

100 Tokens = 1.29 USD

6.3. Price Changes. Token rates, package prices and Service prices may change from time to time. The applicable price is the price displayed at the time you confirm the relevant purchase or redemption.

6.4. Token Issuance. Tokens are credited to your Account after successful payment confirmation, subject to fraud checks, payment provider confirmation and technical processing.

6.5. Token Redemption. When you confirm an AI generation, Expert Order, package, Add-on, Custom Plan or other paid feature, the displayed number of Tokens is deducted from your Account.

6.6. Customer No Cash-Out. Customers may not exchange Tokens for cash, withdraw Tokens, sell Tokens, transfer Tokens to another user, trade Tokens, or use Tokens outside the Service, except where a refund is approved under the Refund / Return Policy or required by law.

6.7. Promotional Tokens. Promotional, bonus, complimentary or incentive Tokens may be subject to additional conditions, expiry periods or restrictions. Unless required by law, promotional Tokens are non-refundable and have no cash value.`,
        },
        {
            type: "text",
            title: `7. Available Packages`,
            description:
                `Foconta may offer the following packages:

7.1. AI Instant Plan

The AI Instant Plan is priced at 900 Tokens unless another price is displayed at checkout.

This package is designed for instant AI-assisted business plan generation based on the information provided by the Customer.

7.2. Expert 24h Plan

The Expert 24h Plan is priced at 2,000 Tokens unless another price is displayed at checkout.

This package includes expert involvement and is subject to expert assignment, Customer brief completeness, business-hour delivery rules, revision rules and dispute rules described in our Terms and Conditions and Refund / Return Policy.

7.3. Investor Pack

The Investor Pack is priced at 5,000 Tokens unless another price is displayed at checkout.

This package may include a business plan, pitch deck, design layout, investor-ready formatting and related expert support, as described at the time of purchase.

7.4. Custom Plan

Custom Plans are priced dynamically. The applicable Token amount, payment amount, scope, currency and payment conditions will be displayed or agreed before confirmation.

A Custom Plan may combine AI generation, Expert Services, presentation design, financial modelling, research, localisation, additional revisions or other tailored services.`,
        },
        {
            type: "text",
            title: `8. Custom Plan Payments`,
            description:
                `8.1. A Custom Plan may require a custom Token amount, direct payment amount or agreed package price.

8.2. Foconta may request additional information before confirming the scope and price of a Custom Plan.

8.3. A Custom Plan is not confirmed until the required payment is successfully completed or the required Tokens are redeemed.

8.4. If a Custom Plan requires additional work beyond the originally agreed scope, Foconta may require additional Tokens or additional payment before continuing.

8.5. Custom Plans may be non-refundable once preparation has substantially begun, subject to our Refund / Return Policy and applicable law.`,
        },
        {
            type: "text",
            title: `9. Order Confirmation`,
            description:
                `9.1. An Order is created when you successfully complete checkout, purchase Tokens, redeem Tokens or otherwise confirm a paid Service.

9.2. We may send an electronic receipt, invoice, payment confirmation, Order confirmation or dashboard notification.

9.3. Order confirmation does not guarantee that an Order will be fulfilled if the payment is later reversed, declined, identified as fraudulent, affected by chargeback, or found to breach our Terms.

9.4. We may refuse, cancel, delay or review an Order where necessary to prevent fraud, correct obvious errors, comply with law, address payment issues, manage chargeback risk, or protect the Service.`,
        },
        {
            type: "text",
            title: `10. Payment Authorisation and Security`,
            description:
                `10.1. By submitting payment details, you confirm that you are authorised to use the selected payment method.

10.2. You must not use a stolen, unauthorised, fraudulent or disputed payment method.

10.3. Payments may be subject to authentication, security checks, fraud screening, card issuer approval, payment provider approval or other verification steps.

10.4. We do not intentionally store full card numbers. Card details are processed by third-party payment providers.

10.5. You must ensure that payment information, billing details and contact information are accurate and up to date.`,
        },
        {
            type: "text",
            title: `11. Failed, Pending or Declined Payments`,
            description:
                `11.1. If a payment fails, is declined, remains pending, is reversed, or cannot be verified, Tokens may not be credited and the relevant Service may not begin.

11.2. If Tokens are credited before a payment is later declined, reversed or charged back, Foconta may remove the relevant Tokens, restrict access to Deliverables, cancel pending Orders or request repayment.

11.3. Foconta is not responsible for delays caused by banks, card issuers, payment processors, fraud checks, currency conversion or third-party payment systems.`,
        },
        {
            type: "text",
            title: `12. Digital Delivery and Immediate Performance`,
            description:
                `12.1. Foconta supplies digital content and digital services.

12.2. By redeeming Tokens, starting an AI generation, placing an Expert Order, ordering a Custom Plan, downloading a Deliverable, or requesting immediate Expert performance, you request immediate supply of digital content or services.

12.3. Once digital content supply or Expert performance has begun, cancellation and refund rights may be limited as described in our Terms and Conditions and Refund / Return Policy.

12.4. This does not affect any mandatory consumer rights that cannot be excluded by law.`,
        },
        {
            type: "text",
            title: `13. Refunds`,
            description:
                `13.1. Refunds are governed by our Refund / Return Policy.

13.2. Approved refunds are normally issued to the original payment method and in the original checkout currency.

13.3. Refunds will not exceed the amount originally paid for the relevant Token top-up, package, Order or transaction.

13.4. Where permitted by law and payment provider rules, non-recoverable payment processing fees, currency conversion costs, card fees, chargeback fees or bank fees may be excluded from the refundable amount.

13.5. Token credits or restored Tokens may be offered where appropriate, including in cases of technical failure, delayed delivery, rework, partial service issues or Customer-agreed remedies.`,
        },
        {
            type: "text",
            title: `14. Chargebacks and Payment Disputes`,
            description:
                `14.1. If you have a payment issue, you should first contact Foconta at info@foconta.co.uk so we can review and attempt to resolve the matter.

14.2. If you initiate a chargeback or payment dispute, Foconta may submit transaction records, checkout evidence, Token redemption history, access logs, delivery records, support communications, revision history and other relevant evidence to the payment provider.

14.3. If a chargeback is initiated while a refund, revision or dispute review is pending, we may suspend the relevant Account, pause pending Orders, restrict access to Deliverables or stop further work until the payment dispute is resolved.

14.4. If funds are reversed, we may remove equivalent Tokens, revoke access to associated Deliverables, cancel pending Orders and recover amounts owed where lawful.

14.5. Repeated, abusive, false or fraudulent chargebacks may result in Account closure and refusal of future Services.`,
        },
        {
            type: "text",
            title: `15. Expert Orders and Internal Settlement`,
            description:
                `15.1. Customers may redeem Tokens to purchase Expert Services, including Expert 24h Plan, Investor Pack or Custom Plan where expert work is included.

15.2. Once an Expert Order is completed, Foconta may internally convert the relevant Order value into an Expert payout balance, subject to this Policy, the Terms and Conditions, any Expert terms, dispute status, chargeback risk, fraud checks, payment confirmation and internal approval.

15.3. Token redemption by Customers does not create a direct payment relationship between the Customer and the Expert. Foconta remains responsible for managing the platform payment flow and Expert settlement process.

15.4. Customers must not pay Experts directly, attempt to bypass Foconta, or enter into off-platform payment arrangements for work introduced through Foconta.

15.5. Any attempt to bypass Foconta’s payment flow may result in Account suspension, cancellation of Orders, removal of Expert access, refusal of payout, or other action permitted under our Terms.`,
        },
        {
            type: "text",
            title: `16. Expert Payouts`,
            description:
                `16.1. Experts are independent freelancers or contractors and are not employees of Foconta.

16.2. Experts may become eligible for payout after completion of the relevant Expert Order.

16.3. Completion normally means that the Deliverable has been supplied and the Order is not subject to an open dispute, unresolved revision or rework request, chargeback, refund request, payment failure, fraud review or breach investigation.

16.4. Foconta applies a standard platform commission of 20% to Expert Orders, unless a different rate is agreed in writing.

16.5. Expert payout amounts are calculated after deduction of Foconta’s applicable commission and any relevant adjustments, refunds, reversals, chargebacks, fees, penalties or deductions permitted under the applicable Expert terms.

16.6. Experts may request payout through the process made available by Foconta. After a payout request, Foconta may contact the Expert by email to provide instructions, request payout details, verify information or confirm the payout method.

16.7. Expert payouts may be made in EUR or USD to a bank account or card, subject to availability, verification, payment provider rules, compliance checks and Foconta’s internal process.

16.8. Foconta may withhold, delay, reduce or cancel an Expert payout where:

the Customer disputes the Order;

a revision or rework request is open;

the Order is refunded or partially refunded;

the payment is charged back or reversed;

fraud or abuse is suspected;

the Expert breached confidentiality obligations;

the Expert attempted to bypass Foconta;

the Deliverable is defective, incomplete or outside scope;

payout details are incomplete or unverifiable;

legal, tax, compliance or payment provider requirements prevent payout.

16.9. Experts are responsible for their own taxes, social contributions, business registrations, licences, invoices, reporting obligations and compliance with laws applicable to their services and income.

16.10. Expert payout conversion is an internal settlement mechanism between Foconta and Experts. It does not make Tokens cash, e-money, cryptocurrency, securities, bank deposits or a general cash-equivalent product for Customers.`,
        },
        {
            type: "text",
            title: `17. Payment Errors and Pricing Errors`,
            description:
                `17.1. If an obvious pricing, Token, currency, package or checkout error occurs, Foconta may cancel, correct or reverse the affected transaction.

17.2. If Tokens are credited due to a technical, pricing or payment error, Foconta may remove the incorrectly credited Tokens or adjust the Account balance.

17.3. If a Service is purchased at an incorrect price due to a clear technical error, Foconta may cancel the Order and restore Tokens or issue an appropriate refund.

17.4. We will use reasonable efforts to notify affected users where material payment or pricing corrections are made.`,
        },
        {
            type: "text",
            title: `18. Fraud Prevention and Compliance Checks`,
            description:
                `18.1. We may review payments, Token activity, Orders, Expert payout requests and Account behaviour to prevent fraud, abuse, chargeback misuse, unauthorised access, money laundering risk, sanctions risk, platform circumvention and other misuse.

18.2. We may request additional information from Customers or Experts where reasonably necessary to verify identity, payment authority, payout details, Order legitimacy or compliance.

18.3. We may refuse, delay, suspend or cancel a payment, payout, Order, refund or Token transfer where required by law, payment provider rules, sanctions rules, fraud prevention requirements or platform security controls.

18.4. We may report suspected fraud, unlawful activity or abuse to payment providers, banks, regulators, law enforcement or other relevant parties where lawful and appropriate.`,
        },
        {
            type: "text",
            title: `19. Invoices, Receipts and Records`,
            description:
                `19.1. Foconta may provide electronic receipts, invoices or payment confirmations.

19.2. You are responsible for downloading, saving or requesting copies of payment records needed for your own accounting, tax or business purposes.

19.3. Foconta may retain payment, Token, Order, refund, chargeback and payout records as described in our Privacy Policy and Refund / Return Policy.

19.4. Records may be retained for at least 24 months and up to 6 years where required for tax, accounting, dispute, chargeback, legal, audit, fraud prevention or compliance purposes.`,
        },
        {
            type: "text",
            title: `20. Changes to This Payment Policy`,
            description:
                `20.1. We may update this Payment Policy from time to time to reflect changes in payment methods, currencies, Token rates, packages, Expert payout processes, payment providers, legal requirements or business operations.

20.2. Material changes may be notified by email, dashboard notice or prominent website notice where appropriate.

20.3. Changes apply prospectively and do not affect completed transactions unless required by law or payment provider rules.`,
        },
        {
            type: "text",
            title: `21. Contact Details`,
            description:
                `Questions about payments, Tokens, invoices, refunds or Expert payouts should be sent to:

THE COMPANY YOU NEED LTD
Registered office: 31 Auctioneers Way, Northampton, United Kingdom, NN1 1HF
Company number: 15967968
Email: info@foconta.co.uk
Tel: +44 7537 166412

Accepted currencies: EUR (€), USD ($)
Accepted payment methods: Visa, Mastercard`,
        },
    ],
};

export default paymentPolicySchema;
