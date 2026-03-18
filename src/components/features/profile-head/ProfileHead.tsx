"use client";

import { FaUserCircle, FaRegFileAlt } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { useUser } from "@/context/UserContext";
import styles from "./ProfileHead.module.scss";

const ProfileHead = () => {
    const user = useUser();

    return (
        <header className={styles.hero}>
            <FaUserCircle className={styles.avatar} />
            <div className={styles.text}>
                <h1>
                    Welcome back
                </h1>
                <p>
                    Manage your AI business tools, documents, and insights in one place.
                </p>

            </div>
        </header>
    );
};

export default ProfileHead;
