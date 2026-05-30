import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { expertService } from "@/backend/services/expert.service";
import { connectDB } from "@/backend/config/db";
import { User } from "@/backend/models/user.model";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        console.log("[expert/complete] Starting for order:", id);

        const payload = await requireAuth(req);
        if (!payload?.sub) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const user = await User.findById(payload.sub);
        if (!user || user.role !== "expert") {
            return NextResponse.json({ message: "Expert access only" }, { status: 403 });
        }

        let formData: FormData;
        try {
            formData = await req.formData();
        } catch (e: any) {
            console.error("[expert/complete] FormData parse error:", e.message);
            return NextResponse.json({ message: "Invalid form data" }, { status: 400 });
        }

        const file = formData.get("file");
        console.log("[expert/complete] File received:", {
            hasFile: !!file,
            type: file?.constructor?.name,
            name: file instanceof File ? file.name : null,
            size: file instanceof File ? file.size : null,
        });

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ message: "PDF file is required" }, { status: 400 });
        }

        if (file.size === 0) {
            return NextResponse.json({ message: "File is empty" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const order = await expertService.completeOrder(id, payload.sub, buffer, file.name);
        return NextResponse.json({ order });
    } catch (err: any) {
        console.error("[expert/complete] Error:", err.message);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
