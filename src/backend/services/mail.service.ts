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

export const mailService = {
    async sendOrderConfirmationEmail(input: OrderConfirmationInput) {
        const text = [
            input.firstName ? `Hi ${input.firstName},` : "Hello,",
            input.summary,
            `Transaction date: ${formatDate(input.transactionDate)}`,
            ...input.details.map((detail) => `- ${detail}`),
        ].join("\n");

        try {
            await sendEmail(input.to, input.subject, text, buildHtml(input));
        } catch (error) {
            console.error("Order confirmation email failed:", error);
        }
    },
};
