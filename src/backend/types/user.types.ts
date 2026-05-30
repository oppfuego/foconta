import { Document, Types } from "mongoose";

export interface IUserSchema extends Document {
    _id: Types.ObjectId;
    name: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    street?: string;
    city?: string;
    country?: string;
    postCode?: string;
    tokens: number;
    role: "user" | "admin" | "expert";
    specializations: string[];
    expertBio: string;
    expertBalance: number;
    expertAvatar: string;
    isExpertVerified: boolean;
    paymentDetails: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserType {
    _id: string;
    name: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    street?: string;
    city?: string;
    country?: string;
    postCode?: string;
    tokens: number;
    role: "user" | "admin" | "expert";
    specializations: string[];
    expertBio: string;
    expertBalance: number;
    expertAvatar: string;
    isExpertVerified: boolean;
    paymentDetails: string;
    createdAt: Date;
    updatedAt: Date;
}
