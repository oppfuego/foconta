import { Document, Types } from "mongoose";

export interface IUserSchema extends Document {
    _id: Types.ObjectId;
    name: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phoneNumber?: string;
    dateOfBirth?: Date | null;
    street?: string;
    city?: string;
    country?: string;
    postCode?: string;
    password: string;
    tokens: number;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
}

export interface UserType {
    _id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string | null;
    street: string;
    city: string;
    country: string;
    postCode: string;
    tokens: number;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
}
