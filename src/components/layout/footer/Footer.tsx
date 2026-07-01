"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { FaInstagram, FaLinkedinIn, FaArrowUp } from "react-icons/fa";

import styles from "./Footer.module.scss";
import { footerContent } from "@/resources/content";
import { SmartLinkProps } from "@/types/smart-link";
import visa from "@/assets/cards/visa.png";
import mastercard from "@/assets/cards/mastercard.png";
import pciDss from "@/assets/cards/pci-dss-compliant-logo-vector.svg";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_INSTAGRAM,
    COMPANY_LINKEDIN,
} from "@/resources/constants";

const SmartLink: React.FC<SmartLinkProps> = ({
    href,
    className,
    children,
    ariaLabel,
    title,
    target,
    rel,
}) => {
    const isInternal = href?.startsWith("/");
    if (isInternal) {
        return (
            <Link href={href} className={className} aria-label={ariaLabel} title={title}>
                {children}
            </Link>
        );
    }
    return (
        <a
            href={href}
            className={className}
            aria-label={ariaLabel}
            title={title}
            target={target}
            rel={rel}
        >
            {children}
        </a>
    );
};

const Footer: React.FC = () => {
    const { columns, contact, legal } = footerContent;
    const rootRef = useRef<HTMLElement | null>(null);
    const reduce = useReducedMotion();

    const cx = useMotionValue(0);
    const cy = useMotionValue(0);
    const sx = useSpring(cx, { stiffness: 60, damping: 20, mass: 0.6 });
    const sy = useSpring(cy, { stiffness: 60, damping: 20, mass: 0.6 });

    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 600);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const onMouseMove = (e: React.MouseEvent) => {
        if (reduce || !rootRef.current) return;
        const rect = rootRef.current.getBoundingClientRect();
        cx.set(e.clientX - rect.left);
        cy.set(e.clientY - rect.top);
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    };

    return (
        <footer ref={rootRef} className={styles.footer} onMouseMove={onMouseMove}>
            {/* animated gradient hairline along top */}
            <div className={styles.hairline} aria-hidden="true" />

            {/* cursor-following glow */}
            <motion.div
                className={styles.cursorGlow}
                aria-hidden="true"
                style={{ left: sx, top: sy }}
            />

            <div className={styles.grid} aria-hidden="true" />

            <div className={styles.inner}>
                <div className={styles.top}>
                    <div className={styles.brandCol}>
                        <h2 className={styles.wordmark} aria-label={COMPANY_NAME}>
                            <span className={styles.wordmarkText}>{COMPANY_NAME}</span>
                        </h2>
                        <p className={styles.brandTag}>
                            Ideas become business plans — in 24 hours or instantly with AI.
                        </p>
                        <div className={styles.socials}>
                            {COMPANY_INSTAGRAM && (
                                <a
                                    href={COMPANY_INSTAGRAM}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className={styles.socialLink}
                                >
                                    <FaInstagram />
                                </a>
                            )}
                            {COMPANY_LINKEDIN && (
                                <a
                                    href={COMPANY_LINKEDIN}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className={styles.socialLink}
                                >
                                    <FaLinkedinIn />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className={styles.linkCols}>
                        {columns.map((col, ci) => (
                            <motion.div
                                key={col.title}
                                className={styles.col}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.5, delay: ci * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className={styles.colTitle}>{col.title}</div>
                                <ul className={styles.colList}>
                                    {col.links.map((l, li) => (
                                        <motion.li
                                            key={l.label}
                                            initial={{ opacity: 0, y: 8 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.4 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: ci * 0.08 + li * 0.04,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                        >
                                            <SmartLink href={l.href} className={styles.link}>
                                                <span>{l.label}</span>
                                            </SmartLink>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}

                        <div className={styles.col}>
                            <div className={styles.colTitle}>Contact</div>
                            <ul className={styles.colList}>
                                {contact.email && (
                                    <li>
                                        <a href={`mailto:${contact.email}`} className={styles.link}>
                                            <span>{contact.email}</span>
                                        </a>
                                    </li>
                                )}
                                {contact.phone && (
                                    <li>
                                        <a href={`tel:${contact.phone}`} className={styles.link}>
                                            <span>{contact.phone}</span>
                                        </a>
                                    </li>
                                )}
                                {contact.address && (
                                    <li className={styles.addr}>{contact.address}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.wordmarkBig} aria-hidden="true">
                    <span>{COMPANY_NAME.toLowerCase()}</span>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.legal}>
                        <span>
                            © {new Date().getFullYear()}{" "}
                            {COMPANY_LEGAL_NAME || legal?.companyName || COMPANY_NAME}. All rights reserved.
                        </span>
                        {COMPANY_NUMBER && (
                            <span className={styles.legalSep}>· Company № {COMPANY_NUMBER}</span>
                        )}
                        {COMPANY_ADDRESS && (
                            <span className={styles.legalSep}>· {COMPANY_ADDRESS}</span>
                        )}
                    </div>

                    <div className={styles.payments} aria-label="Accepted payment methods">
                        <Image src={visa} alt="Visa" className={styles.paymentIcon} />
                        <Image src={mastercard} alt="Mastercard" className={styles.paymentIcon} />
                        <Image src={pciDss} alt="PCI DSS Compliant" className={styles.paymentIcon} />
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={scrollTop}
                aria-label="Back to top"
                className={`${styles.toTop} ${showTop ? styles.toTopVisible : ""}`}
            >
                <FaArrowUp />
            </button>
        </footer>
    );
};

export default Footer;
