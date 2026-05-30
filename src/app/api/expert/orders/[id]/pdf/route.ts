import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { connectDB } from "@/backend/config/db";
import { UniversalOrder } from "@/backend/models/universalOrder.model";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const payload = await requireAuth(req);
        if (!payload?.sub) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await connectDB();

        const order = await UniversalOrder.findOne({
            _id: id,
            $or: [{ userId: payload.sub }, { expertId: payload.sub }],
            status: "done",
        });

        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        const pdfData = (order as any).pdfData;
        if (!pdfData) {
            return NextResponse.json({ message: "PDF not available" }, { status: 404 });
        }

        const buffer = Buffer.from(pdfData, "base64");
        const fileName = (order as any).pdfFileName || "business-plan.pdf";

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${fileName}"`,
                "Content-Length": String(buffer.length),
            },
        });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
