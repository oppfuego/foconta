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

        const profile = await expertService.getProfile(payload.sub);
        return NextResponse.json({ profile });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}

export async function PUT(req: NextRequest) {
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

        const body = await req.json();
        const updated = await expertService.updateProfile(payload.sub, body);
        return NextResponse.json({ message: "Profile updated", profile: updated });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
