import mongoose, { Schema, Document } from "mongoose";

export interface WithdrawalDocument extends Document {
    expertId: mongoose.Types.ObjectId;
    amount: number;
    commission: number;
    netAmount: number;
    status: "pending" | "processed" | "rejected";
    createdAt: Date;
    processedAt?: Date;
}

const withdrawalSchema = new Schema<WithdrawalDocument>(
    {
        expertId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        amount: { type: Number, required: true },
        commission: { type: Number, required: true },
        netAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "processed", "rejected"],
            default: "pending",
        },
        processedAt: { type: Date },
    },
    { timestamps: true }
);

export const Withdrawal =
    mongoose.models.Withdrawal ||
    mongoose.model<WithdrawalDocument>("Withdrawal", withdrawalSchema);
