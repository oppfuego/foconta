import { connectDB } from "../config/db";
import { userService } from "../services/user.service";
import { UserType } from "@/backend/types/user.types";
import { transactionService } from "@/backend/services/transaction.service";
import { mailService } from "@/backend/services/mail.service";

export const userController = {
    async buyTokens(userId: string, amount: number): Promise<UserType> {
        await connectDB();

        const user = await userService.addTokens(userId, amount);

        console.log("💳 Adding tokens for user:", userId);
        const transaction = await transactionService.record(user._id, user.email, amount, "add", user.tokens);
        console.log("✅ Transaction created successfully");

        await mailService.sendOrderConfirmationEmail({
            to: user.email,
            firstName: user.firstName,
            subject: "Payment Confirmation",
            summary: "Your token purchase was completed successfully.",
            transactionDate: transaction.createdAt || new Date(),
            details: [
                `Purchase type: Token top-up`,
                `Tokens added: ${amount}`,
                `Balance after payment: ${user.tokens} tokens`,
            ],
        });

        return formatUser(user);
    },

    async spendTokens(userId: string, amount: number, reason?: string): Promise<UserType> {
        await connectDB();

        const user = await userService.getUserById(userId);
        if (!user) throw new Error("User not found");
        if ((user.tokens || 0) < amount) throw new Error("Not enough tokens");

        user.tokens -= amount;
        await user.save();

        const transaction = await transactionService.record(user._id, user.email, amount, "spend", user.tokens);

        await mailService.sendOrderConfirmationEmail({
            to: user.email,
            firstName: user.firstName,
            subject: "Order Confirmation",
            summary: "Your token deduction was completed successfully.",
            transactionDate: transaction.createdAt || new Date(),
            details: [
                `Tokens used: ${amount}`,
                `Reason: ${reason || "Account usage"}`,
                `Balance after transaction: ${user.tokens} tokens`,
            ],
        });

        return formatUser(user);
    },
};

function formatUser(user: any): UserType {
    return {
        _id: user._id.toString(),
        name: user.name || [user.firstName, user.lastName].filter(Boolean).join(" ").trim(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        street: user.street,
        city: user.city,
        country: user.country,
        postCode: user.postCode,
        role: user.role,
        tokens: user.tokens,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
