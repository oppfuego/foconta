import { NextRequest, NextResponse } from "next/server";
import { authController } from "@/backend/controllers/auth.controller";

/**
 * DEBUG ENDPOINT: Get access token for testing
 *
 * POST /api/test/get-token
 * Body: { email, password }
 * Response: { access_token, token_type, expires_in }
 */

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password required" },
                { status: 400 }
            );
        }

        // Use auth controller to login
        const { user, tokens } = await authController.login(body, undefined, undefined);

        return NextResponse.json({
            access_token: tokens.accessToken,
            token_type: "Bearer",
            expires_in: 5400, // 90 minutes
            user: { id: user.id, email: user.email }
        });
    } catch (err: any) {
        return NextResponse.json(
            { message: err?.message || "Test token endpoint error" },
            { status: 400 }
        );
    }
}

