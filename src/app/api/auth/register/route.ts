import { NextRequest, NextResponse } from "next/server";
import { authController } from "@/backend/controllers/auth.controller";
import { attachAuthCookies } from "@/backend/utils/cookies";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { user, tokens } = await authController.register(body);
        const res = NextResponse.json({ user }, { status: 200 });
        attachAuthCookies(res, tokens.accessToken, tokens.refreshToken, 60 * 60 * 24 * 30);
        return res;
    } catch (e: any) {
        const msg = e?.message || "Registration error";
        const isDuplicate = msg.includes("registered");
        const isValidation =
            isDuplicate ||
            msg.includes("required") ||
            msg.includes("valid") ||
            msg.includes("supported") ||
            msg.includes("match") ||
            msg.includes("future");
        return NextResponse.json(
            { type: isDuplicate ? "EmailAlreadyRegistered" : "InvalidRegistration", message: msg },
            { status: isValidation ? 400 : 500 }
        );
    }
}
