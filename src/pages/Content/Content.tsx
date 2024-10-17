import React from 'react';
import "../../components/ActivityOutput/Markdown.css";
import styles from "./Content.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate } from "react-router-dom";
import { Activities } from "../../models/resources/activities";
import UnderBar from "../../components/UnderBar/UnderBar";
import ReadyContent from '../../components/titles/ReadyContent/ReadyContent';
import helmet from "../../models/resources/helmet.json";
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
import { FaRibbon } from "react-icons/fa";

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
    MdOutlineSportsKabaddi: MdOutlineSportsKabaddi,
    FaRibbon: FaRibbon
};

function Content() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(route.home);
    };

    return (
        <PageLayout 
            path={route.content}
            hasHeader={{ goBack }}
            hasGreenBackground
            title={helmet.content.title}
            content={helmet.content.content}
        >
            <ReadyContent></ReadyContent>
            
            <article className={styles.content_article}>
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

            <div className={styles.underBar}>
                <UnderBar/>
            </div>
        </PageLayout>
    );
}

export default Content;
