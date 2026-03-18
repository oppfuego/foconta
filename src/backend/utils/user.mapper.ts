import { UserType } from "@/backend/types/user.types";

function serializeDateOnly(value?: Date | null): string | null {
    if (!value) return null;
    return new Date(value).toISOString().slice(0, 10);
}

export function toUser(user: any): UserType {
    return {
        _id: user._id.toString(),
        name: user.name,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email,
        phoneNumber: user.phoneNumber ?? "",
        dateOfBirth: serializeDateOnly(user.dateOfBirth),
        street: user.street ?? "",
        city: user.city ?? "",
        country: user.country ?? "",
        postCode: user.postCode ?? "",
        role: user.role,
        tokens: user.tokens,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
