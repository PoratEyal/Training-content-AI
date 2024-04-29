import styles from "./Activity.module.css";
import { useContentContext } from "../../context/ContentContext";
import ActivityOutput from "../../components/activityOutput/activityOutput";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Activity() {
    const { data } = useContentContext();
    const navigate = useNavigate();

    const goingBack = () => {
        navigate("/choosePath");
    };

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <IoArrowForward onClick={goingBack} className={styles.back_icon}></IoArrowForward>
            </div>

            <div className={styles.ai_text}>
                שימו לב, מקור הפעולות הוא מערכת בינה מלאכותית,  <br></br>ייתכן ותמצאו בהן אי דיוקים וטעויות. אנא בדקו את התוכן לפני כל הפעלה
            </div>

            {data?.pointOfView?.use && (
                <ActivityOutput
                    index={1}
                    title={"נקודת מבט"}
                    path={data.pointOfView}
                    contextData={data}
                />
            )}

            {data?.contentActivity?.use && (
                <ActivityOutput
                    index={2}
                    title={"פעילות תוכן"}
                    path={data.contentActivity}
                    contextData={data}
                />
            )}

            {data?.scoutingTime?.use && (
                <ActivityOutput
                    index={3}
                    title={"זמן תנועת נוער"}
                    path={data.scoutingTime}
                    contextData={data}
                />
            )}

            {data?.playingTime?.use && (
                <ActivityOutput
                    index={4}
                    title={"זמן משחק"}
                    path={data.playingTime}
                    contextData={data}
                />
            )}
        </div>
    );
}

export default Activity;
