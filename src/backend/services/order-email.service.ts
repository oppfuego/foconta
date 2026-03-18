import { sendEmail } from "@/backend/utils/sendEmail";

interface OrderConfirmationPayload {
    orderId: string;
    orderType: string;
    email: string;
    firstName?: string | null;
    createdAt?: Date | string;
    tokensUsed?: number;
    amountLabel?: string;
    summaryLines: string[];
}

function buildHtml({
    firstName,
    orderId,
    orderType,
    createdAt,
    tokensUsed,
    amountLabel,
    summaryLines,
}: OrderConfirmationPayload) {
    const greeting = firstName?.trim() || "there";
    const createdLabel = new Date(createdAt || new Date()).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
    });
    const metaRows = [
        ["Order type", orderType],
        ["Order ID", orderId],
        ["Transaction date", createdLabel],
        tokensUsed ? ["Tokens used", String(tokensUsed)] : null,
        amountLabel ? ["Amount", amountLabel] : null,
    ].filter(Boolean) as Array<[string, string]>;

    return `
        <div style="font-family: Arial, sans-serif; background:#f4f7fb; padding:24px; color:#1f2937;">
            <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:16px; padding:32px;">
                <h1 style="margin:0 0 12px; font-size:24px; color:#111827;">Order confirmation</h1>
                <p style="margin:0 0 24px; font-size:15px; line-height:1.6;">
                    Hi ${greeting}, your order has been confirmed successfully.
                </p>
                <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
                    ${metaRows
                        .map(
                            ([label, value]) => `
                                <tr>
                                    <td style="padding:8px 0; color:#6b7280; width:180px;">${label}</td>
                                    <td style="padding:8px 0; font-weight:600;">${value}</td>
                                </tr>
                            `
                        )
                        .join("")}
                </table>
                <div style="margin-bottom:24px;">
                    <h2 style="margin:0 0 12px; font-size:18px; color:#111827;">Summary</h2>
                    <ul style="margin:0; padding-left:20px; line-height:1.7;">
                        ${summaryLines.map((line) => `<li>${line}</li>`).join("")}
                    </ul>
                </div>
                <p style="margin:0; font-size:14px; line-height:1.6; color:#6b7280;">
                    This email confirms a successful transaction only. No email is sent for failed or cancelled attempts.
                </p>
            </div>
        </div>
    `;
}

export const orderEmailService = {
    async sendConfirmation(payload: OrderConfirmationPayload) {
        const subject = `${payload.orderType} confirmation`;
        const textLines = [
            `Hi ${payload.firstName?.trim() || "there"},`,
            "",
            `Your ${payload.orderType.toLowerCase()} has been confirmed successfully.`,
            `Order ID: ${payload.orderId}`,
            `Transaction date: ${new Date(payload.createdAt || new Date()).toISOString()}`,
            payload.tokensUsed ? `Tokens used: ${payload.tokensUsed}` : "",
            payload.amountLabel ? `Amount: ${payload.amountLabel}` : "",
            "",
            "Summary:",
            ...payload.summaryLines.map((line) => `- ${line}`),
        ].filter(Boolean);

        return sendEmail(payload.email, subject, textLines.join("\n"), buildHtml(payload));
    },
};
