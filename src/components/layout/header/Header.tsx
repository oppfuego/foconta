"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import styles from "./Header.module.scss";
import { headerContent } from "@/resources/content";
import { useUser } from "@/context/UserContext";
import { Currency, useCurrency } from "@/context/CurrencyContext";
import AuthButtons from "@/components/widgets/auth-buttons/AuthButtons";
import SegmentedControl from "@/components/ui/segmented-control/SegmentedControl";
import { easings } from "@/design/motion";

const CURRENCY_OPTS = [
    { value: "GBP", label: "£" },
    { value: "EUR", label: "€" },
    { value: "USD", label: "$" },
];

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const user = useUser();
    const { currency, setCurrency } = useCurrency();
    const reduce = useReducedMotion();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const isExpert = user?.role === "expert";

    return (
        <>
            <motion.header
                className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: easings.out }}
            >
                <div className={styles.inner}>
                    <Link href={headerContent.logo.href} className={styles.logo} aria-label={`${headerContent.logo.alt} home`}>
                        <Image
                            src={headerContent.logo.src}
                            width={170}
                            height={54}
                            alt={headerContent.logo.alt}
                            priority
                        />
                    </Link>

                    <nav className={styles.nav} aria-label="Primary">
                        {headerContent.links.map((link) => (
                            <Link key={link.label} href={link.href} className={styles.navLink}>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                        {isExpert && (
                            <Link href="/expert" className={styles.navLink}>
                                <span>Expert Panel</span>
                            </Link>
                        )}
                    </nav>

                    <div className={styles.actions}>
                        <SegmentedControl
                            value={currency}
                            onChange={(v) => setCurrency(v as Currency)}
                            options={CURRENCY_OPTS}
                            ariaLabel="Currency"
                            tone={scrolled ? "light" : "light"}
                        />
                        <div className={styles.authWrap}>
                            <AuthButtons />
                        </div>
                    </div>

                    <button
                        className={styles.menuBtn}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </motion.header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <motion.nav
                            className={styles.overlayNav}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.05 } },
                            }}
                            aria-label="Mobile primary"
                        >
                            {headerContent.links.map((link) => (
                                <motion.div
                                    key={link.label}
                                    variants={{
                                        hidden: { opacity: 0, y: 24 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easings.out } },
                                    }}
                                >
                                    <Link
                                        href={link.href}
                                        className={styles.overlayLink}
                                        onClick={() => setOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            {isExpert && (
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 24 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easings.out } },
                                    }}
                                >
                                    <Link href="/expert" className={styles.overlayLink} onClick={() => setOpen(false)}>
                                        Expert Panel
                                    </Link>
                                </motion.div>
                            )}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 24 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easings.out } },
                                }}
                                className={styles.overlayActions}
                            >
                                <SegmentedControl
                                    value={currency}
                                    onChange={(v) => setCurrency(v as Currency)}
                                    options={CURRENCY_OPTS}
                                    ariaLabel="Currency"
                                    tone="dark"
                                />
                                <div className={styles.authWrap}>
                                    <AuthButtons />
                                </div>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
