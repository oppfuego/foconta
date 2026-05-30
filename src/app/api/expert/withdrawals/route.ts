import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { expertService } from "@/backend/services/expert.service";
import { connectDB } from "@/backend/config/db";
import { User } from "@/backend/models/user.model";

export async function GET(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        if (!payload?.sub) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const user = await User.findById(payload.sub);
        if (!user || user.role !== "expert") {
            return NextResponse.json({ message: "Expert access only" }, { status: 403 });
        }

        const withdrawals = await expertService.getWithdrawals(payload.sub);
        return NextResponse.json({ withdrawals });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        if (!payload?.sub) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const user = await User.findById(payload.sub);
        if (!user || user.role !== "expert") {
            return NextResponse.json({ message: "Expert access only" }, { status: 403 });
        }

        const { amount, paymentDetails } = await req.json();
        const withdrawal = await expertService.requestWithdrawal(
            payload.sub,
            amount,
            paymentDetails
        );
        return NextResponse.json({ withdrawal });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
