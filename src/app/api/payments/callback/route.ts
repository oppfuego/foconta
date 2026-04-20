import { NextRequest, NextResponse } from "next/server";
import { ENV } from "@/backend/config/env";
import { userController } from "@/backend/controllers/user.controller";
import { connectDB } from "@/backend/config/db";
import { PaymentOrder } from "@/backend/models/paymentOrder.model";
import { appendPaymentLog } from "@/backend/utils/logger";
import crypto from "crypto";

type PaymentState = "INITIATED" | "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED" | "EXPIRED" | "REFUNDED";

function normalizeProviderPayload(rawBody: unknown): Record<string, unknown> | null {
    if (!rawBody) return null;
    if (typeof rawBody === "string") {
        const trimmed = rawBody.trim();
        if (!trimmed) return null;
        try {
            return normalizeProviderPayload(JSON.parse(trimmed));
        } catch {
            const params = new URLSearchParams(trimmed);
            if ([...params.keys()].length > 0) {
                const obj = Object.fromEntries(params.entries());
                if (typeof obj.payload === "string") {
                    try { return normalizeProviderPayload(JSON.parse(obj.payload)); } catch { return obj; }
                }
                return obj;
            }
            return null;
        }
    }
    if (Array.isArray(rawBody)) return null;
    if (typeof rawBody === "object") {
        const o = rawBody as Record<string, unknown>;
        if (typeof o.payload === "string") {
            try { return normalizeProviderPayload(JSON.parse(o.payload)); } catch { return o; }
        }
        if (o.payload && typeof o.payload === "object" && !Array.isArray(o.payload)) {
            return o.payload as Record<string, unknown>;
        }
        return o;
    }
    return null;
}

function verifyCallbackSignature(payload: Record<string, unknown>): boolean {
    const transactionId = String(payload.transaction_id || "");
    const sep31Status = String(payload.sep31_status || "");
    const refunded = payload.refunded === true || String(payload.refunded).toLowerCase() === "true";
    const provided = String(payload.md5_body_sig || "").toLowerCase();

    if (!transactionId || !sep31Status || !provided) return false;

    const expected = crypto
        .createHash("md5")
        .update(`${transactionId}${sep31Status}${refunded}${ENV.APS_CALLBACK_SECRET}`)
        .digest("hex")
        .toLowerCase();

    return expected === provided;
}

function mapCallbackState(payload: Record<string, unknown>): PaymentState {
    const status = String(payload.status || "").toLowerCase();
    const fiscalStatus = String(payload.fiscal_status || "").toLowerCase();
    const sep31Status = String(payload.sep31_status || "").toLowerCase();
    const refunded = payload.refunded === true || String(payload.refunded).toLowerCase() === "true";

    if (refunded || status === "refunded") return "REFUNDED";
    if ((status === "done" || status === "completed" || status === "success") && sep31Status === "completed") return "COMPLETED";
    if ((fiscalStatus === "done" || fiscalStatus === "completed") && sep31Status === "completed") return "COMPLETED";
    if (status === "pending" || fiscalStatus === "pending") return "PENDING";
    if (status === "canceled" || status === "cancelled" || fiscalStatus === "cancelled") return "CANCELLED";
    if (status === "expired" || fiscalStatus === "expired") return "EXPIRED";
    if (status === "failed" || fiscalStatus === "failed" || sep31Status === "error") return "FAILED";
    return "PENDING";
}

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        console.log("[Payment Callback] Received:", rawBody.slice(0, 500));
        await appendPaymentLog("payment.callback.received", {
            rawPreview: rawBody.slice(0, 500),
        });

        const payload = normalizeProviderPayload(rawBody);
        if (!payload) {
            await appendPaymentLog("payment.callback.invalid_payload", {
                rawPreview: rawBody.slice(0, 500),
            });
            return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
        }

        if (!verifyCallbackSignature(payload)) {
            console.error("[Payment Callback] Invalid signature");
            await appendPaymentLog("payment.callback.invalid_signature", {
                referenceId: String(payload.merchant_external_id || payload.external_id || "").trim() || null,
                transactionId: String(payload.transaction_id || "").trim() || null,
            });
            return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
        }

        const referenceId = String(payload.merchant_external_id || payload.external_id || "").trim();
        if (!referenceId) {
            await appendPaymentLog("payment.callback.missing_reference", {
                transactionId: String(payload.transaction_id || "").trim() || null,
            });
            return NextResponse.json({ message: "Missing reference" }, { status: 400 });
        }

        const state = mapCallbackState(payload);
        const transactionId = String(payload.transaction_id || "").trim() || null;
        console.log("[Payment Callback] State:", state, "Reference:", referenceId);
        await appendPaymentLog("payment.callback.mapped_state", {
            referenceId,
            transactionId,
            state,
            status: String(payload.status || "") || null,
            fiscalStatus: String(payload.fiscal_status || "") || null,
            sep31Status: String(payload.sep31_status || "") || null,
            refunded: payload.refunded === true || String(payload.refunded).toLowerCase() === "true",
        });

        await connectDB();
        const order = await PaymentOrder.findOne({ referenceId });

        if (!order) {
            console.error("[Payment Callback] Order not found for reference:", referenceId);
            await appendPaymentLog("payment.callback.order_not_found", {
                referenceId,
                transactionId,
                state,
            });
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        // Prevent double-crediting
        if (order.state === "COMPLETED") {
            console.log("[Payment Callback] Order already completed, skipping");
            await appendPaymentLog("payment.callback.duplicate_completed", {
                referenceId,
                transactionId,
                tokens: order.tokens,
            });
            return NextResponse.json({ received: true });
        }

        // Update order state
        order.state = state;
        if (transactionId) order.paymentId = transactionId;
        await order.save();

        // Credit tokens on successful payment
        if (state === "COMPLETED" && order.tokens > 0) {
            await userController.buyTokens(order.userId.toString(), order.tokens);
            console.log(`✅ Credited ${order.tokens} tokens to user ${order.userId}`);
            await appendPaymentLog("payment.callback.tokens_credited", {
                referenceId,
                transactionId,
                userId: order.userId.toString(),
                tokens: order.tokens,
            });
        }

        await appendPaymentLog("payment.callback.completed", {
            referenceId,
            transactionId,
            state,
        });

        return NextResponse.json({ received: true });
    } catch (err: any) {
        console.error("[Payment Callback] Error:", err);
        await appendPaymentLog("payment.callback.failed", {
            errorMessage: err?.message || "Unknown callback error",
        });
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
