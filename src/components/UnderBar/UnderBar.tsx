import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { VscOutput } from "react-icons/vsc";
import { GoHome } from "react-icons/go";
import route from "../../router/route.json";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./UnderBar.module.css";

const UnderBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getIconClass = (path: string) => {
        return location.pathname === path ? `${styles.icon} ${styles.activeIcon}` : styles.icon;
    };

    return (
        <div className={styles.underbar}>
            <div onClick={() => navigate(route.details)} className={styles.underbarButton}>
                <IoIosAddCircleOutline className={getIconClass(route.details)} />
                <span>יצירת פעולות</span>
            </div>

            <div onClick={() => navigate(route.home)} className={styles.underbarButton}>
                <GoHome className={getIconClass(route.home)} />
                <span>בית</span>
            </div>

            <div onClick={() => navigate(route.content)} className={styles.underbarButton}>
                <VscOutput className={getIconClass(route.content)} />
                <span>פעולות מוכנות</span>
            </div>
        </div>
    );
};

export default UnderBar;
