import React from 'react';
import "../../components/ActivityOutput/Markdown.css";
import styles from "./Content.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate } from "react-router-dom";
import { Activities } from "../../models/resources/activities";
import UnderBar from "../../components/UnderBar/UnderBar";

import { FaGamepad } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { AiFillEnvironment } from "react-icons/ai";
import { FaCloudSunRain } from "react-icons/fa6";
import { BiSolidCameraMovie } from "react-icons/bi";
import { FaTrafficLight } from "react-icons/fa6";
import { FaDog } from "react-icons/fa6";
import { FaTrophy } from "react-icons/fa6";
import { PiShootingStarFill } from "react-icons/pi";
import { MdOutlineSportsKabaddi } from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

const iconMap = {
    FaGamepad: FaGamepad,
    FaBookOpen: FaBookOpen,
    BsCalendar2DateFill: BsCalendar2DateFill,
    FaHandsHelping: FaHandsHelping,
    FaUserFriends: FaUserFriends,
    AiFillEnvironment: AiFillEnvironment,
    FaListCheck: FaListCheck,
    FaCloudSunRain: FaCloudSunRain,
    BiSolidCameraMovie: BiSolidCameraMovie,
    FaTrafficLight: FaTrafficLight,
    FaDog: FaDog,
    FaTrophy: FaTrophy,
    PiShootingStarFill: PiShootingStarFill,
    MdOutlineSportsKabaddi: MdOutlineSportsKabaddi
};

function Content() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(route.home);
    };

    return (
        <PageLayout 
            path={route.content}
            hasHeader={{ goBack, isBlur: true }}
            title="פעולות מוכנות"
            content="פעולות מוכנות לתנועות נוער. רעיונות לפעילויות יצירתיות, משחקים, פעולות חגים, חברות, אחריות, עונות השנה"
        >
            <article className={styles.content_article}>
                <h1 className={styles.page_title}>פעולות מוכנות</h1>
                <section className={styles.grid_container}>
                    {Object.entries(Activities).map(([key, value]) => (
                        <Link to={`/content/${value.id}`} key={key} className={styles.grid_item}>
                            <h2 className={styles.item_title}>{value.subject}</h2>
                            <div className={styles.icon}>
                                {iconMap[value.icon] && React.createElement(iconMap[value.icon], { className: styles.icon })}
                            </div>
                        </Link>
                    ))}
                </section>
            </article>

            <UnderBar></UnderBar>
        </PageLayout>
    );
}

export default Content;
