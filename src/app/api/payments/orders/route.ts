import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { connectDB } from "@/backend/config/db";
import { PaymentOrder } from "@/backend/models/paymentOrder.model";

export async function GET(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        await connectDB();

        const orders = await PaymentOrder.find({ userId: payload.sub })
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({ orders });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}

