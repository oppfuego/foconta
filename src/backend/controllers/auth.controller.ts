import { connectDB } from "../config/db";
import { authService } from "../services/auth.service";
import { LogoutResponse } from "@/backend/types/auth.types";
import { UserType } from "@/backend/types/user.types";

export const authController = {
    async register(body: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        email: string;
        phoneNumber: string;
        street: string;
        city: string;
        country: string;
        postCode: string;
        password: string;
        role?: "user" | "expert";
        specializations?: string[];
        expertBio?: string;
        paymentDetails?: string;
    }) {
        await connectDB();
        const { user, accessToken, refreshToken } = await authService.register(body);
        return { user: toUser(user), tokens: { accessToken, refreshToken } };
    },

    async login(body: { email: string; password: string }, userAgent?: string, ip?: string) {
        await connectDB();
        const { user, accessToken, refreshToken } = await authService.login(body.email, body.password, userAgent, ip);
        return { user: toUser(user), tokens: { accessToken, refreshToken } };
    },

    async refresh(refreshJWT: string, userAgent?: string, ip?: string) {
        await connectDB();
        const { user, accessToken, refreshToken } = await authService.refresh(refreshJWT, userAgent, ip);
        return { user: toUser(user), tokens: { accessToken, refreshToken } };
    },

    async me(userId: string): Promise<UserType> {
        await connectDB();
        const user = await authService.me(userId);
        return toUser(user);
    },

    async logout(refreshJWT: string): Promise<LogoutResponse> {
        await connectDB();
        await authService.logout(refreshJWT);
        return { message: "Logged out successfully" };
    },

    async logoutAll(userId: string): Promise<LogoutResponse> {
        await connectDB();
        await authService.logoutAll(userId);
        return { message: "All sessions revoked" };
    },
};

function toUser(u: any): UserType {
    return {
        _id: u._id.toString(),
        name: u.name || [u.firstName, u.lastName].filter(Boolean).join(" ").trim(),
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        phoneNumber: u.phoneNumber,
        dateOfBirth: u.dateOfBirth,
        street: u.street,
        city: u.city,
        country: u.country,
        postCode: u.postCode,
        role: u.role,
        tokens: u.tokens,
        specializations: u.specializations || [],
        expertBio: u.expertBio || "",
        expertBalance: u.expertBalance || 0,
        expertAvatar: u.expertAvatar || "",
        isExpertVerified: u.isExpertVerified || false,
        paymentDetails: u.paymentDetails || "",
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
    };
}
