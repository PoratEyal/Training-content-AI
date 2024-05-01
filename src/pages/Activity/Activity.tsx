import styles from "./Activity.module.css";
import { useContentContext } from "../../context/ContentContext";
import ActivityOutput from "../../components/ActivityOutput/ActivityOutput";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { PathActivity } from "../../models/constants/path";

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
                <strong>שימו לב</strong> מקור הפעולות הוא מערכת בינה מלאכותית, <br></br>ייתכן ותמצאו
                בהן אי דיוקים וטעויות. אנא בדקו את התוכן לפני כל הפעלה
            </div>

            {data?.pointOfView?.use && (
                <ActivityOutput pathType={PathActivity.pointOfView} path={data.pointOfView} />
            )}

            {data?.contentActivity?.use && (
                <ActivityOutput
                    pathType={PathActivity.contentActivity}
                    path={data.contentActivity}
                />
            )}

            {data?.scoutingTime?.use && (
                <ActivityOutput pathType={PathActivity.scoutingTime} path={data.scoutingTime} />
            )}

            {data?.playingTime?.use && (
                <ActivityOutput pathType={PathActivity.playingTime} path={data.playingTime} />
            )}
        </div>
    );
}

export default Activity;
