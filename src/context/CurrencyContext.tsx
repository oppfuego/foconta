"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Currency = "EUR" | "USD";

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (val: Currency) => void;
    sign: string;
    rateToGBP: number;
    convertFromGBP: (gbp: number) => number;
    convertToGBP: (val: number) => number;
}

// 💱 Символи валют
const CURRENCY_SIGNS: Record<Currency, string> = {
    EUR: "€",
    USD: "$",
};

// 💹 Поточні курси (1 GBP = ...)
const RATES: Record<Currency, number> = {
    EUR: 1.17,   // 1 GBP = 1.17 EUR
    USD: 1.29,   // 1 GBP = 1.29 USD
};

const CurrencyContext = createContext<CurrencyContextType>({
    currency: "USD",
    setCurrency: () => {},
    sign: "$",
    rateToGBP: 1.29,
    convertFromGBP: (v) => v * 1.29,
    convertToGBP: (v) => v / 1.29,
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState<Currency>("USD");

    const rateToGBP = RATES[currency];
    const sign = CURRENCY_SIGNS[currency];

    return (
        <CurrencyContext.Provider
            value={{
                currency,
                setCurrency,
                sign,
                rateToGBP,
                convertFromGBP: (gbp) => gbp * rateToGBP,
                convertToGBP: (val) => val / rateToGBP,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};
