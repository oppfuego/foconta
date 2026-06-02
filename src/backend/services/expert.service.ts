import { connectDB } from "../config/db";
import { User } from "../models/user.model";
import { UniversalOrder } from "../models/universalOrder.model";
import { Withdrawal } from "../models/withdrawal.model";
import { mailService } from "./mail.service";
import { ENV } from "../config/env";
import { TOKENS_TO_CURRENCY_RATE } from "@/resources/pricing";
import mongoose from "mongoose";

export const expertService = {
    async getOrders(expertId: string) {
        await connectDB();
        const orders = await UniversalOrder.find({
            planType: "reviewed",
            $or: [
                { expertId: null, status: "pending" },
                { expertId: { $exists: false }, status: "pending" },
                { expertId: new mongoose.Types.ObjectId(expertId) },
            ],
        })
            .select("-pdfData")
            .sort({ createdAt: -1 })
            .lean();
        return orders.map((d: any) => {
            if (d.extrasData instanceof Map) d.extrasData = Object.fromEntries(d.extrasData);
            return d;
        });
    },

    async takeOrder(orderId: string, expertId: string) {
        await connectDB();
        const order = await UniversalOrder.findOne({ _id: orderId, planType: "reviewed" });
        if (!order) throw new Error("Order not found");
        if (order.status !== "pending") throw new Error("Order is not in pending status");
        if (order.expertId && order.expertId.toString() !== expertId) {
            throw new Error("Order already taken by another expert");
        }

        order.expertId = new mongoose.Types.ObjectId(expertId);
        order.status = "in_progress";
        await order.save();

        const expert = await User.findById(expertId);
        if (expert) {
            mailService.sendExpertOrderAssignedEmail(expert.email, {
                orderId: order._id.toString(),
                category: order.category,
                clientEmail: order.email,
            }).catch((e: any) => console.error("[expert] Assignment email failed:", e));
        }

        if (ENV.SMTP_USER && expert) {
            mailService.sendAdminNewExpertOrderEmail(
                ENV.SMTP_USER,
                {
                    orderId: order._id.toString(),
                    category: order.category,
                    clientEmail: order.email,
                },
                {
                    expertName: expert.name || "Unknown",
                    expertEmail: expert.email || "Unknown",
                    action: "taken",
                }
            ).catch((e: any) => console.error("[expert] Admin take email failed:", e));
        }

        return order.toObject();
    },

    async completeOrder(orderId: string, expertId: string, pdfBuffer: Buffer, pdfFileName: string) {
        await connectDB();
        const order = await UniversalOrder.findOne({ _id: orderId, expertId });
        if (!order) throw new Error("Order not found or not assigned to you");
        if (order.status !== "in_progress") throw new Error("Order is not in progress");

        const base64 = pdfBuffer.toString("base64");
        (order as any).pdfData = base64;
        (order as any).pdfFileName = pdfFileName;
        order.status = "done";
        (order as any).pdfUrl = "stored";
        order.readyAt = new Date();
        await order.save();

        const expert = await User.findById(expertId);
        if (expert) {
            const earnings = order.totalTokens * TOKENS_TO_CURRENCY_RATE;
            expert.expertBalance = (expert.expertBalance || 0) + earnings;
            await expert.save();
        }

        User.findById(order.userId).then((clientUser) => {
            if (clientUser) {
                mailService.sendUserOrderCompletedByExpertEmail(
                    clientUser.email,
                    {
                        orderId: order._id.toString(),
                        category: order.category,
                        firstName: clientUser.firstName || clientUser.name,
                    }
                ).catch((e) => console.error("[expert] Client completion email failed:", e));
            }
        }).catch((e) => console.error("[expert] Client lookup failed:", e));

        if (ENV.SMTP_USER) {
            mailService.sendAdminNewExpertOrderEmail(
                ENV.SMTP_USER,
                {
                    orderId: order._id.toString(),
                    category: order.category,
                    clientEmail: order.email,
                },
                {
                    expertName: expert?.name || "Unknown",
                    expertEmail: expert?.email || "Unknown",
                    action: "completed",
                }
            ).catch((e) => console.error("[expert] Admin completion email failed:", e));
        }

        return order.toObject();
    },

    async getProfile(expertId: string) {
        await connectDB();
        const user = await User.findById(expertId).select("-password");
        if (!user || user.role !== "expert") throw new Error("Expert not found");
        return user;
    },

    async updateProfile(expertId: string, data: {
        expertBio?: string;
        specializations?: string[];
        paymentDetails?: string;
    }) {
        await connectDB();
        const user = await User.findById(expertId);
        if (!user || user.role !== "expert") throw new Error("Expert not found");

        if (data.specializations !== undefined) {
            if (!Array.isArray(data.specializations) || data.specializations.length === 0) {
                throw new Error("At least one specialization is required");
            }
            user.specializations = data.specializations;
        }
        if (data.expertBio !== undefined) user.expertBio = data.expertBio;
        if (data.paymentDetails !== undefined) user.paymentDetails = data.paymentDetails;

        await user.save();
        return user;
    },

    async getWithdrawals(expertId: string) {
        await connectDB();
        return Withdrawal.find({ expertId }).sort({ createdAt: -1 }).lean();
    },

    async requestWithdrawal(expertId: string, amount: number, paymentDetails: string) {
        await connectDB();
        const expert = await User.findById(expertId);
        if (!expert || expert.role !== "expert") throw new Error("Expert not found");
        if (amount <= 0) throw new Error("Invalid amount");
        if (amount > (expert.expertBalance || 0)) throw new Error("Insufficient balance");
        if (!paymentDetails.trim()) throw new Error("Payment details are required");

        const commission = amount * 0.2;
        const netAmount = amount * 0.8;

        expert.expertBalance = (expert.expertBalance || 0) - amount;
        await expert.save();

        const withdrawal = await Withdrawal.create({
            expertId: new mongoose.Types.ObjectId(expertId),
            amount,
            commission,
            netAmount,
            paymentDetails: paymentDetails.trim(),
            status: "pending",
        });

        if (ENV.SMTP_USER) {
            mailService.sendExpertWithdrawalRequestToAdminEmail(
                ENV.SMTP_USER,
                {
                    expertName: expert.name || `${expert.firstName} ${expert.lastName}`,
                    expertEmail: expert.email,
                },
                {
                    amount,
                    commission,
                    netAmount,
                    paymentDetails: paymentDetails.trim(),
                    withdrawalId: withdrawal._id.toString(),
                }
            ).catch((e) => console.error("[expert] Withdrawal admin email failed:", e));
        }

        mailService.sendExpertWithdrawalConfirmationEmail(
            expert.email,
            {
                amount,
                commission,
                netAmount,
                expertName: expert.firstName || expert.name,
            }
        ).catch((e) => console.error("[expert] Withdrawal confirmation email failed:", e));

        return withdrawal.toObject();
    },
};
