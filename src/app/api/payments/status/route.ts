import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { connectDB } from "@/backend/config/db";
import { PaymentOrder } from "@/backend/models/paymentOrder.model";

export async function GET(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        const ref = req.nextUrl.searchParams.get("ref");

        if (!ref) {
            return NextResponse.json({ message: "Missing reference" }, { status: 400 });
        }

        await connectDB();
        const order = await PaymentOrder.findOne({
            referenceId: ref,
            userId: payload.sub,
        });

        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        const o = order.toObject();
        return NextResponse.json({
            referenceId: o.referenceId,
            state: o.state,
            tokens: o.tokens,
            amount: o.amount,
            currency: o.currency,
            providerCurrency: o.providerCurrency,
            providerAmount: o.providerAmount,
            createdAt: o.createdAt,
        });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
