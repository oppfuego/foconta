"use client";

import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import type { AuthError, LogoutResponse } from "@/backend/types/auth.types";

export function useAuthActions() {
    const router = useRouter();
    const { clearUser } = useUserContext();

    async function logout(): Promise<boolean> {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            const data = (await res.json()) as LogoutResponse | AuthError;

            if (res.ok && "message" in data) {
                clearUser();
                router.replace("/");
                return true;
            }
        } catch (e) {
            console.error("Logout error:", e);
        }
        return false;
    }

    async function logoutAll(): Promise<boolean> {
        try {
            const res = await fetch("/api/auth/logout-all", {
                method: "POST",
                credentials: "include",
            });

            const data = (await res.json()) as LogoutResponse | AuthError;

            if (res.ok && "message" in data) {
                clearUser();
                router.replace("/");
                return true;
            }
        } catch (e) {
            console.error("LogoutAll error:", e);
        }
        return false;
    }

    return { logout, logoutAll };
}
