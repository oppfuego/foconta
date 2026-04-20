import mongoose, { Schema, Document } from "mongoose";

export interface PaymentOrderDocument extends Document {
    userId: mongoose.Types.ObjectId;
    email: string;
    referenceId: string;
    state: "INITIATED" | "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED" | "EXPIRED" | "REFUNDED";
    tokens: number;
    amount: number;
    currency: string;
    providerCurrency: string;
    providerAmount: number;
    paymentId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const paymentOrderSchema = new Schema<PaymentOrderDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        email: { type: String, required: true },
        referenceId: { type: String, required: true, unique: true, index: true },
        state: {
            type: String,
            enum: ["INITIATED", "PENDING", "COMPLETED", "FAILED", "CANCELLED", "EXPIRED", "REFUNDED"],
            default: "INITIATED",
        },
        tokens: { type: Number, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        providerCurrency: { type: String, required: true },
        providerAmount: { type: Number, required: true },
        paymentId: { type: String, default: null },
    },
    { timestamps: true }
);

export const PaymentOrder =
    mongoose.models.PaymentOrder ||
    mongoose.model<PaymentOrderDocument>("PaymentOrder", paymentOrderSchema);

