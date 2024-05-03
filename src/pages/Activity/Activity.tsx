import styles from "./Activity.module.css";
import { useContentContext } from "../../context/ContentContext";
import ActivityOutput from "../../components/ActivityOutput/ActivityOutput";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Activity() {
    const { data } = useContentContext();
    const navigate = useNavigate();

    const goingBack = () => {
        navigate("/choosePath");
    };
    console.log("data", data)

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <IoArrowForward onClick={goingBack} className={styles.back_icon}></IoArrowForward>
            </div>

            <div className={styles.ai_text}>
                <strong>שימו לב</strong> מקור הפעולות הוא מערכת בינה מלאכותית, <br></br>ייתכן ותמצאו
                בהן אי דיוקים וטעויות. אנא בדקו את התוכן לפני כל הפעלה
            </div>

            {data?.pointOfView ? (
                <ActivityOutput
                    index={1}
                    title={"נקודת מבט"}
                    path={data.pointOfView}
                    contextData={data}
                />
            ) : null}

            {data?.contentActivity ? (
                <ActivityOutput
                    index={2}
                    title={"פעילות תוכן"}
                    path={data.contentActivity}
                    contextData={data}
                />
            ) : null}

            {data?.scoutingTime ? (
                <ActivityOutput
                    index={3}
                    title={"זמן תנועת נוער"}
                    path={data.scoutingTime}
                    contextData={data}
                />
            ) : null}

            {data?.playingTime ? (
                <ActivityOutput
                    index={4}
                    title={"זמן משחק"}
                    path={data.playingTime}
                    contextData={data}
                />
            ) : null}
        </div>
    );
}

export default Activity;
