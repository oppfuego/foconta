"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { LogoutButton } from "@/components/ui/logout-button/LogoutButton";
import styles from "./BalanceCard.module.scss";
import { GiTwoCoins } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";
import ButtonUI from "@/components/ui/button/ButtonUI";
import React from "react";

export default function BalanceCard() {
    const user = useUser();

    return (
        <section className={styles.balanceCard}>
            <div>
                <div className={styles.header}>
                    <GiTwoCoins className={styles.icon} />
                    <div>
                        <h3>Token Balance</h3>
                        <p>{user?.tokens ?? 0}<span> TOK</span></p>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Link href="/pricing" className={styles.link}>
                        <ButtonUI
                            variant="solid"
                            color="primary"
                            size="lg"
                            hoverEffect="none"
                        >
                            Add Tokens
                        </ButtonUI>
                    </Link>
                    <LogoutButton/>
                </div>
            </div>

            <Link href="/dashboard">
                <ButtonUI text="Create My Plan"/>
            </Link>
        </section>
    );
}
