"use client";
import React, { FC, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter, usePathname } from "next/navigation";
import { ProtectedRouteProps } from "@/components/features/protected-route/types";
import { authRoutes, disallowedRoutes, expertOnlyPrefix, userOnlyRoutes } from "./authRoutes";

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const user = useUser();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (authRoutes.some((r) => pathname === r || pathname.startsWith(r + "/")) && !user) {
            router.replace("/sign-in");
            return;
        }

        if (disallowedRoutes.includes(pathname) && user) {
            if (user.role === "expert") {
                router.replace("/expert");
            } else {
                router.replace("/dashboard");
            }
            return;
        }

        if (user && user.role === "expert" && userOnlyRoutes.includes(pathname)) {
            router.replace("/expert");
            return;
        }

        if (user && user.role !== "expert" && pathname.startsWith(expertOnlyPrefix)) {
            router.replace("/");
            return;
        }
    }, [user, router, pathname]);

    if (authRoutes.some((r) => pathname === r || pathname.startsWith(r + "/")) && !user) return null;
    if (disallowedRoutes.includes(pathname) && user) return null;
    if (user && user.role === "expert" && userOnlyRoutes.includes(pathname)) return null;
    if (user && user.role !== "expert" && pathname.startsWith(expertOnlyPrefix)) return null;

    return <>{children}</>;
};

export default ProtectedRoute;
