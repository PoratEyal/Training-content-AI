import React, { useEffect, useState } from "react";
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
import { fetchStaticSubjects } from "../../utils/staticActivitiesAPI";
import { StaticSubjects } from "../../models/interface/staticSubjects";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";

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
};

function Content() {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<StaticSubjects[]>([]);

    const goBack = () => {
        navigate(route.home);
    };

    useEffect(() => {
        const getSubjects = async () => {
            try {
                const response = await fetchStaticSubjects();

                if (response.result === "success" && response.data) {
                    setSubjects(response.data);
                } else {
                    console.error("Error fetching static subjects:", response.message);
                }
            } catch (error) {
                console.error("Error in getSubjects:", error);
            }
        };

        getSubjects();
    }, []);

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
                <section className={styles.grid_container}>
                    {subjects.length === 0 ? (
                        <SmallLoading></SmallLoading>
                    ) : (
                        subjects.map((subject, index) => (
                            <Link to={`${route.content}/${subject.name}`} key={index} className={styles.grid_item}>
                                <h2 className={styles.item_title}>{subject.metaTitle}</h2>
                                <div className={styles.icon}>
                                    {iconMap[subject.icon] &&
                                        React.createElement(iconMap[subject.icon], {
                                            className: styles.icon,
                                        })}
                                </div>
                            </Link>
                        ))
                    )}
                </section>
            </article>
        </PageLayout>
    );
}

export default Content;
