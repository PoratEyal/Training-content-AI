import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { VscOutput } from "react-icons/vsc";
import { GoHome } from "react-icons/go";
import route from "../../router/route.json";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./UnderBar.module.css";

interface UnderBarProps {
    activityId?: string; // Define activityId as an optional prop
}

const UnderBar: React.FC<UnderBarProps> = ({ activityId }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const getIconClass = (path: string) => {
        // Check for route.content or the specific activityId
        if (
            location.pathname === path || 
            (path === route.details && location.pathname === route.build) || 
            (path === route.content && location.pathname === `/content/${activityId}`)
        ) {
            return `${styles.icon} ${styles.activeIcon}`;
        }
        return styles.icon;
    };

    return (
        <div className={styles.underbar}>
            {/* <div onClick={() => navigate(route.home)} className={styles.underbarButton1}>
                <GoHome className={getIconClass(route.home)} />
                <span>בית</span>
            </div> */}

            <div onClick={() => navigate(route.details)} className={styles.underbarButton}>
                <IoIosAddCircleOutline className={getIconClass(route.details)} />
                <span>יצירת פעולות</span>
            </div>

            <div onClick={() => navigate(route.content)} className={styles.underbarButton}>
                <VscOutput className={getIconClass(route.content)} />
                <span>פעולות מוכנות</span>
            </div>
        </div>
    );
};

export default UnderBar;