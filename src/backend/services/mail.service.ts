import { sendEmail } from "@/backend/utils/sendEmail";

type OrderConfirmationInput = {
    to: string;
    firstName?: string;
    subject: string;
    summary: string;
    transactionDate: Date;
    details: string[];
};

function escapeHtml(value: string) {
    return value
        .split("&").join("&amp;")
        .split("<").join("&lt;")
        .split(">").join("&gt;")
        .split('"').join("&quot;")
        .split("'").join("&#39;");
}

function formatDate(value: Date) {
    return value.toISOString().replace("T", " ").slice(0, 16) + " UTC";
}

function buildHtml(input: OrderConfirmationInput) {
    const greeting = input.firstName ? `Hi ${escapeHtml(input.firstName)},` : "Hello,";
    const items = input.details
        .map((detail) => `<li style="margin-bottom:8px;">${escapeHtml(detail)}</li>`)
        .join("");

    return `
        <div style="font-family: Arial, sans-serif; background:#f4faff; padding:20px; color:#333;">
            <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
                <h2 style="color:#007BFF; text-align:center;">${escapeHtml(input.subject)}</h2>
                <p style="font-size:16px; line-height:1.6;">${greeting}</p>
                <p style="font-size:16px; line-height:1.6;">${escapeHtml(input.summary)}</p>
                <p style="font-size:15px; line-height:1.6; margin-top:20px;"><strong>Transaction date:</strong> ${escapeHtml(formatDate(input.transactionDate))}</p>
                <ul style="padding-left:20px; font-size:15px; line-height:1.6;">${items}</ul>
            </div>
        </div>
    `;
}

function buildSimpleHtml(title: string, greeting: string, bodyLines: string[]) {
    const items = bodyLines.map((l) => `<p style="font-size:15px; line-height:1.6; margin:4px 0;">${escapeHtml(l)}</p>`).join("");
    return `
        <div style="font-family: Arial, sans-serif; background:#f4faff; padding:20px; color:#333;">
            <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
                <h2 style="color:#007BFF; text-align:center;">${escapeHtml(title)}</h2>
                <p style="font-size:16px; line-height:1.6;">${escapeHtml(greeting)}</p>
                ${items}
            </div>
        </div>
    `;
}

export const mailService = {
    async sendOrderConfirmationEmail(input: OrderConfirmationInput) {
        console.log("[mailService] Order confirmation requested", {
            to: input.to,
            subject: input.subject,
            hasFirstName: Boolean(input.firstName),
            detailsCount: input.details.length,
            transactionDate: input.transactionDate?.toISOString?.() || String(input.transactionDate),
        });

        const text = [
            input.firstName ? `Hi ${input.firstName},` : "Hello,",
            input.summary,
            `Transaction date: ${formatDate(input.transactionDate)}`,
            ...input.details.map((detail) => `- ${detail}`),
        ].join("\n");

        try {
            const result = await sendEmail(input.to, input.subject, text, buildHtml(input));
            console.log("[mailService] Order confirmation sent", {
                to: input.to,
                subject: input.subject,
                provider: result.provider,
            });
        } catch (error) {
            console.error("[mailService] Order confirmation email failed", {
                to: input.to,
                subject: input.subject,
                error: error instanceof Error ? error.message : String(error),
            });
        }
    },

    async sendExpertOrderAssignedEmail(expertEmail: string, orderDetails: {
        orderId: string;
        category: string;
        clientEmail: string;
    }) {
        const subject = "New Order Assigned to You";
        const text = [
            "You have a new order assigned!",
            `Order ID: ${orderDetails.orderId}`,
            `Category: ${orderDetails.category}`,
            "Log in to your Expert Panel to view details and start working.",
        ].join("\n");
        const html = buildSimpleHtml(subject, "Hello,", [
            "You have a new order assigned!",
            `Order ID: #${orderDetails.orderId.slice(-6)}`,
            `Category: ${orderDetails.category}`,
            "Log in to your Expert Panel to view details and start working.",
        ]);
        try {
            await sendEmail(expertEmail, subject, text, html);
        } catch (e) {
            console.error("[mailService] Expert order assigned email failed", e);
        }
    },

    async sendUserOrderCompletedByExpertEmail(userEmail: string, orderDetails: {
        orderId: string;
        category: string;
        firstName?: string;
    }) {
        const subject = "Your Business Plan is Ready!";
        const greeting = orderDetails.firstName ? `Hi ${orderDetails.firstName},` : "Hello,";
        const text = [
            greeting,
            "Great news! Your expert-written business plan is ready.",
            `Order: #${orderDetails.orderId.slice(-6)}`,
            `Category: ${orderDetails.category}`,
            "Log in to your profile to download it.",
        ].join("\n");
        const html = buildSimpleHtml(subject, greeting, [
            "Great news! Your expert-written business plan is ready.",
            `Order: #${orderDetails.orderId.slice(-6)}`,
            `Category: ${orderDetails.category}`,
            "Log in to your profile to download the PDF.",
        ]);
        try {
            await sendEmail(userEmail, subject, text, html);
        } catch (e) {
            console.error("[mailService] User order completed email failed", e);
        }
    },

    async sendAdminNewExpertOrderEmail(adminEmail: string, orderDetails: {
        orderId: string;
        category: string;
        clientEmail: string;
    }, expertDetails: {
        expertName: string;
        expertEmail: string;
        action: string;
    }) {
        const subject = `Expert Order ${expertDetails.action === "completed" ? "Completed" : "Created"}: #${orderDetails.orderId.slice(-6)}`;
        const text = [
            `Order #${orderDetails.orderId.slice(-6)} has been ${expertDetails.action}.`,
            `Expert: ${expertDetails.expertName} (${expertDetails.expertEmail})`,
            `Client: ${orderDetails.clientEmail}`,
            `Category: ${orderDetails.category}`,
        ].join("\n");
        const html = buildSimpleHtml(subject, "Admin notification:", [
            `Order #${orderDetails.orderId.slice(-6)} has been ${expertDetails.action}.`,
            `Expert: ${expertDetails.expertName} (${expertDetails.expertEmail})`,
            `Client: ${orderDetails.clientEmail}`,
            `Category: ${orderDetails.category}`,
        ]);
        try {
            await sendEmail(adminEmail, subject, text, html);
        } catch (e) {
            console.error("[mailService] Admin expert order email failed", e);
        }
    },

    async sendExpertWithdrawalRequestToAdminEmail(adminEmail: string, expertDetails: {
        expertName: string;
        expertEmail: string;
    }, withdrawalDetails: {
        amount: number;
        commission: number;
        netAmount: number;
        withdrawalId: string;
    }) {
        const subject = `Withdrawal Request from ${expertDetails.expertName}`;
        const text = [
            `Expert ${expertDetails.expertName} (${expertDetails.expertEmail}) requests a withdrawal.`,
            `Amount: €${withdrawalDetails.amount.toFixed(2)}`,
            `Commission (20%): €${withdrawalDetails.commission.toFixed(2)}`,
            `Net payout: €${withdrawalDetails.netAmount.toFixed(2)}`,
            `Withdrawal ID: ${withdrawalDetails.withdrawalId}`,
        ].join("\n");
        const html = buildSimpleHtml(subject, "Withdrawal Request:", [
            `Expert: ${expertDetails.expertName} (${expertDetails.expertEmail})`,
            `Amount: €${withdrawalDetails.amount.toFixed(2)}`,
            `Commission (20%): €${withdrawalDetails.commission.toFixed(2)}`,
            `Net payout: €${withdrawalDetails.netAmount.toFixed(2)}`,
            `Withdrawal ID: ${withdrawalDetails.withdrawalId}`,
        ]);
        try {
            await sendEmail(adminEmail, subject, text, html);
        } catch (e) {
            console.error("[mailService] Withdrawal request admin email failed", e);
        }
    },

    async sendExpertWithdrawalConfirmationEmail(expertEmail: string, details: {
        amount: number;
        commission: number;
        netAmount: number;
        expertName?: string;
    }) {
        const subject = "Your Withdrawal Request is Being Processed";
        const greeting = details.expertName ? `Hi ${details.expertName},` : "Hello,";
        const text = [
            greeting,
            "Your withdrawal request has been submitted.",
            `Amount: €${details.amount.toFixed(2)}`,
            `Commission (20%): €${details.commission.toFixed(2)}`,
            `You will receive: €${details.netAmount.toFixed(2)}`,
            "We'll notify you when it's processed.",
        ].join("\n");
        const html = buildSimpleHtml(subject, greeting, [
            "Your withdrawal request has been submitted.",
            `Amount: €${details.amount.toFixed(2)}`,
            `Commission (20%): €${details.commission.toFixed(2)}`,
            `You will receive: €${details.netAmount.toFixed(2)}`,
            "We'll notify you when it's processed.",
        ]);
        try {
            await sendEmail(expertEmail, subject, text, html);
        } catch (e) {
            console.error("[mailService] Withdrawal confirmation email failed", e);
        }
    },

    async sendExpertWelcomeEmail(expertEmail: string, expertName: string) {
        const subject = "Welcome to Foconta as an Expert!";
        const greeting = `Hi ${expertName},`;
        const text = [
            greeting,
            "Welcome! You have successfully registered as an expert on Foconta.",
            "Clients will be able to order expert-written business plans, and you will earn money for your expertise.",
            "Log in to your Expert Panel to set up your profile and start receiving orders.",
        ].join("\n");
        const html = buildSimpleHtml(subject, greeting, [
            "Welcome! You have successfully registered as an expert on Foconta.",
            "Clients will be able to order expert-written business plans, and you will earn money for your expertise.",
            "Log in to your Expert Panel to set up your profile and start receiving orders.",
        ]);
        try {
            await sendEmail(expertEmail, subject, text, html);
        } catch (e) {
            console.error("[mailService] Expert welcome email failed", e);
        }
    },

    async sendAdminNewExpertRegisteredEmail(adminEmail: string, expertDetails: {
        expertName: string;
        expertEmail: string;
        specializations: string[];
    }) {
        const subject = `New Expert Registered: ${expertDetails.expertName}`;
        const text = [
            `A new expert has registered on Foconta.`,
            `Name: ${expertDetails.expertName}`,
            `Email: ${expertDetails.expertEmail}`,
            `Specializations: ${expertDetails.specializations.join(", ")}`,
        ].join("\n");
        const html = buildSimpleHtml(subject, "New Expert Registration:", [
            `Name: ${expertDetails.expertName}`,
            `Email: ${expertDetails.expertEmail}`,
            `Specializations: ${expertDetails.specializations.join(", ")}`,
        ]);
        try {
            await sendEmail(adminEmail, subject, text, html);
        } catch (e) {
            console.error("[mailService] Admin new expert email failed", e);
        }
    },
};
