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
        role: { type: String, enum: ["user", "admin"], default: "user" },
        tokens: { type: Number, default: 10 }
    },
    { timestamps: true }
);

export const User: Model<IUserSchema> =
    mongoose.models.User || mongoose.model<IUserSchema>("User", UserSchema);
