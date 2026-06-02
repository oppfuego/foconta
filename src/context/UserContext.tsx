"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import {IUser, Nullable} from "@/types/user.types";

interface UserContextType {
    user: Nullable<IUser>;
    refreshUser: () => Promise<void>;
    clearUser: () => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    refreshUser: async () => {},
    clearUser: () => {},
});

export function useUser(): Nullable<IUser> {
    return useContext(UserContext).user;
}

export function useUserContext() {
    return useContext(UserContext);
}

export function UserProvider({
                                 user: initialUser,
                                 children,
                             }: {
    user: Nullable<IUser>;
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<Nullable<IUser>>(initialUser);

    const refreshUser = useCallback(async () => {
        try {
            const res = await fetch("/api/auth/me", {
                credentials: "include",
                cache: "no-store",
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user || null);
            }
        } catch (e) {
            console.error("Failed to refresh user:", e);
        }
    }, []);

    const clearUser = useCallback(() => {
        setUser(null);
    }, []);

    return (
        <UserContext.Provider value={{ user, refreshUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
}
