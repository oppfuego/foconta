import type { Metadata } from "next";
import { Suspense } from "react";
import PaymentResultClient from "./PaymentResultClient";

export const metadata: Metadata = {
    title: "Payment Result | Foconta",
    description: "Check the status of your payment.",
};

export default function PaymentResultPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
            <PaymentResultClient />
        </Suspense>
    );
}

