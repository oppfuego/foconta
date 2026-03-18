import { Resend } from "resend";
import nodemailer from "nodemailer";
import { ENV } from "@/backend/config/env";

const resend = ENV.RESEND_API ? new Resend(ENV.RESEND_API) : null;

const smtpTransport =
    ENV.SMTP_HOST && ENV.SMTP_USER && ENV.SMTP_PASS
        ? nodemailer.createTransport({
              host: ENV.SMTP_HOST,
              port: Number(ENV.SMTP_PORT),
              secure: ENV.SMTP_SECURE,
              auth: {
                  user: ENV.SMTP_USER,
                  pass: ENV.SMTP_PASS,
              },
          })
        : null;

type SendEmailResult =
    | { provider: "resend"; result: unknown }
    | { provider: "smtp"; result: unknown };

function defaultTemplate(title: string, message: string) {
    return `
    <div style="font-family: Arial, sans-serif; background:#f4faff; padding:20px; color:#333;">
      <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <h2 style="color:#007BFF; text-align:center;">${title}</h2>
        <p style="font-size:16px; line-height:1.6; color:#333;">
          ${message}
        </p>
        <div style="text-align:center; margin:30px 0;">
          <a href="${ENV.APP_URL}/dashboard" 
             style="background:#007BFF; color:#fff; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:bold;">
             Go to Dashboard
          </a>
        </div>
        <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />
        <p style="font-size:14px; color:#777; text-align:center;">
          © ${new Date().getFullYear()} Averis – All rights reserved.
        </p>
      </div>
    </div>
  `;
}

async function tryResend(to: string, subject: string, text: string, html: string) {
    if (!resend) {
        throw new Error("Resend is not configured");
    }

    const response = await resend.emails.send({
        from: ENV.EMAIL_FROM,
        to,
        subject,
        text,
        html,
    });

    if ((response as any)?.error) {
        throw new Error(`Resend rejected email: ${JSON.stringify((response as any).error)}`);
    }

    return response;
}

async function trySmtp(to: string, subject: string, text: string, html: string) {
    if (!smtpTransport) {
        throw new Error("SMTP is not configured");
    }

    return smtpTransport.sendMail({
        from: ENV.EMAIL_FROM,
        to,
        subject,
        text,
        html,
    });
}

export async function sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string
): Promise<SendEmailResult> {
    const recipient = (to || "").trim();
    const sender = (ENV.EMAIL_FROM || "").trim();
    const finalHtml = html || defaultTemplate(subject, text);

    console.log("[sendEmail] Attempting send", {
        to: recipient,
        subject,
        from: sender,
        hasResend: Boolean(resend),
        hasSmtp: Boolean(smtpTransport),
        hasHtml: Boolean(finalHtml),
    });

    if (!recipient) {
        throw new Error("Email recipient is empty");
    }
    if (!sender) {
        throw new Error("EMAIL_FROM is not configured");
    }

    try {
        const result = await tryResend(recipient, subject, text || "", finalHtml);
        console.log("[sendEmail] Sent via Resend", {
            to: recipient,
            subject,
            result,
        });
        return { provider: "resend", result };
    } catch (resendError) {
        console.error("[sendEmail] Resend send failed", {
            to: recipient,
            subject,
            error:
                resendError instanceof Error ? resendError.message : String(resendError),
        });
    }

    try {
        const result = await trySmtp(recipient, subject, text || "", finalHtml);
        console.log("[sendEmail] Sent via SMTP", {
            to: recipient,
            subject,
            messageId: (result as any)?.messageId,
            response: (result as any)?.response,
        });
        return { provider: "smtp", result };
    } catch (smtpError) {
        console.error("[sendEmail] SMTP send failed", {
            to: recipient,
            subject,
            error: smtpError instanceof Error ? smtpError.message : String(smtpError),
        });
        throw smtpError;
    }
}
