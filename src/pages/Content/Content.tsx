import React from "react";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./Content.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import route from "../../router/route.json";
import { Link, useNavigate } from "react-router-dom";
import ReadyContent from "../../components/titles/ReadyContent/ReadyContent";
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
import { FaStarOfDavid } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { FaRibbon } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";
import { GiPodium } from "react-icons/gi";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { useStaticContentContext } from "../../context/StaticContentContext";

const iconMap = {
    FaGamepad: FaGamepad,
    FaBookOpen: FaBookOpen,
    BsCalendar2DateFill: BsCalendar2DateFill,
    FaHandsHelping: FaHandsHelping,
    FaUserFriends: FaUserFriends,
    AiFillEnvironment: AiFillEnvironment,
    FaListCheck: FaListCheck,
    FaStarOfDavid: FaStarOfDavid,
    FaCloudSunRain: FaCloudSunRain,
    BiSolidCameraMovie: BiSolidCameraMovie,
    FaTrafficLight: FaTrafficLight,
    FaDog: FaDog,
    FaTrophy: FaTrophy,
    PiShootingStarFill: PiShootingStarFill,
    MdOutlineSportsKabaddi: MdOutlineSportsKabaddi,
    FaRibbon: FaRibbon,
    MdEmojiPeople: MdEmojiPeople,
    GiPodium: GiPodium,
};

function Content() {
    const navigate = useNavigate();
    const { subjects, isLoading } = useStaticContentContext();

    const goBack = () => {
        navigate(route.home);
    };

    return (
        <PageLayout
            path={route.content}
            hasHeader={{ goBack }}
            hasNavBar
            hesAds={ACTIVITY_AD_SLOT}
            noIndex
            hasGreenBackground
            title={helmet.content.title}
            content={helmet.content.content}
        >
            <ReadyContent />

            <article className={styles.content_article}>
                {isLoading ? (
                    <section className={styles.grid_container}>
                        <SmallLoading />
                    </section>
                ) : (
                    <section className={styles.grid_container}>
                        {subjects.length > 0 ? (
                            <>
                                <Link to={route.popularActivities} className={styles.grid_item}>
                                    <h2 className={styles.item_title}>10 הפעולות הפופולריות</h2>
                                    <div className={styles.icon}>
                                        {iconMap["GiPodium"] &&
                                            React.createElement(iconMap["GiPodium"], {
                                                className: styles.icon,
                                            })}
                                    </div>
                                </Link>
                                {subjects.map((subject, index) => (
                                    <Link
                                        to={`${route.content}/${subject.name}`}
                                        key={index}
                                        className={styles.grid_item}
                                    >
                                        <h2 className={styles.item_title}>{subject.metaTitle}</h2>
                                        <div className={styles.icon}>
                                            {iconMap[subject.icon] &&
                                                React.createElement(iconMap[subject.icon], {
                                                    className: styles.icon,
                                                })}
                                        </div>
                                    </Link>
                                ))}
                            </>
                        ) : (
                            <div>לא נבחר נושא פעולה</div>
                        )}
                    </section>
                )}
            </article>
        </PageLayout>
    );
}

export default Content;
