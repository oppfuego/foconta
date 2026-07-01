import "./globals.css";
import {Fraunces, Inter} from "next/font/google";
import {authWrapper} from "@/utils/authWrapper";
import {AlertProvider} from "@/context/AlertContext";
import PageWrapper from "@/components/layout/page-wrapper/PageWrapper";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import ProtectedRoute from "@/components/features/protected-route/ProtectedRoute";
import {I18nProvider} from "@/context/i18nContext";
import {AllOrdersProvider} from "@/context/AllOrdersContext";
import {CurrencyProvider} from "@/context/CurrencyContext";

const fraunces = Fraunces({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-display",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-body",
    display: "swap",
});

function Layout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
        <body>
        <I18nProvider>
            <AlertProvider>
                <AllOrdersProvider>
                    <ProtectedRoute>
                        <CurrencyProvider>
                            <Header/>
                            <PageWrapper>
                                {children}
                            </PageWrapper>
                            <Footer/>
                        </CurrencyProvider>
                    </ProtectedRoute>
                </AllOrdersProvider>
            </AlertProvider>
        </I18nProvider>
        </body>
        </html>
    );
}

export default authWrapper(Layout);