export type UserRole = "user" | "admin";

export interface IUser {
    _id: string;
    name: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    street?: string;
    city?: string;
    country?: string;
    postCode?: string;
    role: UserRole;
    tokens: number | null;
    createdAt: string;
    updatedAt: string;
}

export type Nullable<T> = T | null;

export interface UserResponse {
    user: IUser;
}
