import { Types } from "mongoose";

export interface UniversalOrderType {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    email: string;
    category: string;
    fields: Record<string, any>;
    extras: string[];
    totalTokens: number;
    planType: "default" | "reviewed";
    language?: string;
    response: string;
    extrasData: Record<string, string>;
    status: "pending" | "ready" | "in_progress" | "done";
    readyAt: Date;
    createdAt: Date;
    expertId?: Types.ObjectId | null;
    pdfUrl?: string | null;
}

export interface CreateUniversalOrderRequest {
    category: string;
    fields: Record<string, any>;
    extras: string[];
    totalTokens: number;
    planType: "default" | "reviewed";
    language?: string;
    email: string;
    specialization?: string;
}

export interface CreateUniversalOrderResponse {
    order: UniversalOrderType;
}
