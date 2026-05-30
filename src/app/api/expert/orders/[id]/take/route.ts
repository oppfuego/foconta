import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { expertService } from "@/backend/services/expert.service";
import { connectDB } from "@/backend/config/db";
import { User } from "@/backend/models/user.model";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params;
        const order = await expertService.takeOrder(id, payload.sub);
        return NextResponse.json({ order });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
