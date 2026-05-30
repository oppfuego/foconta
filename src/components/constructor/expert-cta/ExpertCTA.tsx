"use client";

import React from "react";
import Link from "next/link";
import ButtonUI from "@/components/ui/button/ButtonUI";
import styles from "./ExpertCTA.module.scss";

interface ExpertCTAProps {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
}

const ExpertCTA: React.FC<ExpertCTAProps> = ({
    title = "Are You a Business Expert?",
    description = "Join our platform, help entrepreneurs build their business plans, and earn money for your expertise.",
    buttonText = "Become an Expert",
    buttonLink = "/sign-up?role=expert",
}) => {
    return (
        <section className={styles.cta}>
            <div className={styles.inner}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
                <Link href={buttonLink}>
                    <ButtonUI
                        color="backgroundLight"
                        textColor="primary"
                        size="lg"
                        shape="rounded"
                        hoverEffect="shadow"
                    >
                        {buttonText}
                    </ButtonUI>
                </Link>
            </div>
        </section>
    );
};

export default ExpertCTA;
