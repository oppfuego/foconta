import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { ENV } from "@/backend/config/env";
import { connectDB } from "@/backend/config/db";
import { PaymentOrder } from "@/backend/models/paymentOrder.model";
import { appendPaymentLog } from "@/backend/utils/logger";
import crypto from "crypto";

const TOKENS_PER_GBP = 100;
const RATES_TO_GBP: Record<string, number> = { EUR: 1.17, USD: 1.29 };
const ISO_CURRENCY_PREFIX = "iso4217:";

function roundMoney(value: number): number {
    return Math.round(value * 100) / 100;
}

function toIsoCurrency(currency: string): string {
    return `${ISO_CURRENCY_PREFIX}${currency.toUpperCase()}`;
}

function extractStringByKey(value: unknown, keyNames: string[]): string | null {
    if (!value || typeof value !== "object") return null;
    if (Array.isArray(value)) {
        for (const item of value) {
            const match = extractStringByKey(item, keyNames);
            if (match) return match;
        }
        return null;
    }
    for (const [key, nestedValue] of Object.entries(value as Record<string, unknown>)) {
        if (keyNames.includes(key) && typeof nestedValue === "string" && nestedValue.trim()) {
            return nestedValue;
        }
        const nestedMatch = extractStringByKey(nestedValue, keyNames);
        if (nestedMatch) return nestedMatch;
    }
    return null;
}

function findFirstUrl(value: unknown): string | null {
    if (!value) return null;
    if (typeof value === "string") {
        const trimmed = value.trim();
        return /^https?:\/\//i.test(trimmed) ? trimmed : null;
    }
    if (Array.isArray(value)) {
        for (const item of value) {
            const match = findFirstUrl(item);
            if (match) return match;
        }
        return null;
    }
    if (typeof value === "object") {
        for (const nestedValue of Object.values(value as Record<string, unknown>)) {
            const match = findFirstUrl(nestedValue);
            if (match) return match;
        }
    }
    return null;
}

export async function POST(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        const { amount, currency } = await req.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
        }

        const normalizedCurrency = (currency || "GBP").toUpperCase();

        await appendPaymentLog("payment.create.received", {
            userId: payload.sub,
            email: payload.email || null,
            requestedCurrency: currency || "GBP",
            normalizedCurrency,
            requestedAmount: amount,
        });

        // Determine provider currency & method GUID
        let providerCurrency: "USD" | "EUR";
        let methodGuid: string;
        let currencyFallback = false;

        if (normalizedCurrency === "EUR" && ENV.APS_METHOD_GUID_EUR) {
            providerCurrency = "EUR";
            methodGuid = ENV.APS_METHOD_GUID_EUR;
        } else if (normalizedCurrency === "USD" && ENV.APS_METHOD_GUID_USD) {
            providerCurrency = "USD";
            methodGuid = ENV.APS_METHOD_GUID_USD;
        } else {
            // Fallback to USD
            currencyFallback = normalizedCurrency !== "USD";
            providerCurrency = "USD";
            methodGuid = ENV.APS_METHOD_GUID_USD;
        }

        // Convert amount to provider currency
        const gbpEquivalent = amount / (RATES_TO_GBP[normalizedCurrency] || 1);
        const providerAmount = roundMoney(gbpEquivalent * (RATES_TO_GBP[providerCurrency] || 1));
        const tokens = Math.floor(gbpEquivalent * TOKENS_PER_GBP);

        const referenceId = `topup-${payload.sub}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
        const isoCurrency = toIsoCurrency(providerCurrency);

        const successUrl = `${ENV.APP_URL}/payment-result?ref=${encodeURIComponent(referenceId)}`;
        const callbackUrl = `${ENV.APP_URL}/api/payments/callback`;

        await appendPaymentLog("payment.create.converted", {
            referenceId,
            requestedCurrency: normalizedCurrency,
            providerCurrency,
            currencyFallback,
            requestedAmount: amount,
            gbpEquivalent,
            providerAmount,
            tokens,
        });

        // Build body per Armenotech v3 API
        const body = {
            amount: providerAmount,
            currency: providerCurrency,
            body_currency: isoCurrency,
            fields: {
                transaction: {
                    deposit_method: methodGuid,
                    deposit: {
                        redirect_url: successUrl,
                        status_callback_url: callbackUrl,
                        external_id: referenceId,
                        merchant_external_id: referenceId,
                        currency: providerCurrency,
                        body_currency: isoCurrency,
                        payer_id: payload.sub,
                        from_email: payload.email || undefined,
                    },
                },
            },
        };

        const baseUrl = ENV.APS_API_URL.replace(/\/$/, "");
        const endpoint = `${baseUrl}/api/v3/${ENV.APS_MERCHANT_GUID}/transactions`;

        console.log("[Payment] Creating deposit session:", { endpoint, referenceId, providerAmount, providerCurrency });

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-App-Token": ENV.APS_APP_TOKEN,
                "X-App-Secret": ENV.APS_APP_SECRET,
            },
            body: JSON.stringify(body),
            cache: "no-store",
        });

        let responseBody: unknown = null;
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            try {
                responseBody = await response.json();
            } catch {
                responseBody = null;
            }
        } else {
            const text = await response.text().catch(() => "");
            console.error("[Payment] Non-JSON response:", text.slice(0, 500));
            await appendPaymentLog("payment.create.provider_non_json", {
                referenceId,
                status: response.status,
                responsePreview: text.slice(0, 500),
            });
            return NextResponse.json({ message: "Payment provider returned invalid response" }, { status: 502 });
        }

        if (!response.ok) {
            console.error("[Payment] Provider error:", response.status, JSON.stringify(responseBody).slice(0, 500));
            await appendPaymentLog("payment.create.provider_error", {
                referenceId,
                status: response.status,
                providerCurrency,
                providerAmount,
                responsePreview: JSON.stringify(responseBody).slice(0, 500),
            });
            return NextResponse.json({ message: "Payment provider error" }, { status: 502 });
        }

        // Extract redirect URL (provider may return it under various keys)
        const redirectUrl =
            extractStringByKey(responseBody, [
                "how", "redirect_url", "redirectUrl", "payment_url", "paymentUrl",
                "checkout_url", "checkoutUrl", "hosted_url", "hostedUrl", "url", "link",
            ]) || findFirstUrl(responseBody);

        if (!redirectUrl) {
            console.error("[Payment] No redirect URL in response:", JSON.stringify(responseBody).slice(0, 500));
            await appendPaymentLog("payment.create.redirect_missing", {
                referenceId,
                status: response.status,
                responsePreview: JSON.stringify(responseBody).slice(0, 500),
            });
            return NextResponse.json({ message: "No payment URL received from provider" }, { status: 502 });
        }

        console.log("[Payment] Redirect URL obtained:", redirectUrl);

        // Save payment order to DB
        await connectDB();
        await PaymentOrder.create({
            userId: payload.sub,
            email: payload.email,
            referenceId,
            state: "PENDING",
            tokens,
            amount,
            currency: normalizedCurrency,
            providerCurrency,
            providerAmount,
            paymentId: extractStringByKey(responseBody, [
                "transaction_id", "transactionId", "id", "payment_id", "paymentId",
            ]) || null,
        });

        await appendPaymentLog("payment.create.completed", {
            referenceId,
            userId: payload.sub,
            requestedCurrency: normalizedCurrency,
            providerCurrency,
            requestedAmount: amount,
            providerAmount,
            tokens,
            currencyFallback,
            redirectUrl,
        });

        return NextResponse.json({
            redirect_url: redirectUrl,
            reference_id: referenceId,
            tokens,
            currency_fallback: currencyFallback,
            provider_currency: providerCurrency,
            requested_currency: normalizedCurrency,
        });
    } catch (err: any) {
        console.error("[Payment] Create error:", err);
        await appendPaymentLog("payment.create.failed", {
            errorMessage: err?.message || "Unknown create payment error",
        });
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
