import mongoose, { Schema, Model } from "mongoose";
import { IUserSchema } from "@/backend/types/user.types";

const UserSchema: Schema<IUserSchema> = new Schema(
    {
        name: { type: String, required: true, trim: true },
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, index: true },
        password: { type: String, required: true, select: false },
        phoneNumber: { type: String, trim: true },
        dateOfBirth: { type: Date },
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        country: { type: String, trim: true },
        postCode: { type: String, trim: true },
        role: { type: String, enum: ["user", "admin", "expert"], default: "user" },
        tokens: { type: Number, default: 10 },
        specializations: { type: [String], default: [] },
        expertBio: { type: String, default: "" },
        expertBalance: { type: Number, default: 0 },
        expertAvatar: { type: String, default: "" },
        isExpertVerified: { type: Boolean, default: false },
        paymentDetails: { type: String, default: "" }
    },
    { timestamps: true }
);

export const User: Model<IUserSchema> =
    mongoose.models.User || mongoose.model<IUserSchema>("User", UserSchema);
