import styles from "./Activity.module.css";
import { useContentContext } from "../../context/ContentContext";
import ActivityOutput from "../../components/ActivityOutput/ActivityOutput";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PathActivity } from "../../models/constants/path";

function Activity() {
    const { data, resetAllUseFields } = useContentContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (
            !data ||
            !data.grade
            // (!data.pointOfView && !data.contentActivity && !data.scoutingTime && !data.playingTime)
        ) {
            navigate("/choosePath");
        }
    }, []);

    const goingBack = () => {
        resetAllUseFields();
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

            {/* {data?.pointOfView ? <ActivityOutput pathActivity={PathActivity.pointOfView} /> : null}

            {data?.contentActivity ? (
                <ActivityOutput pathActivity={PathActivity.contentActivity} />
            ) : null}

            {data?.scoutingTime ? (
                <ActivityOutput pathActivity={PathActivity.scoutingTime} />
            ) : null}

            {data?.playingTime ? <ActivityOutput pathActivity={PathActivity.playingTime} /> : null} */}
        </div>
    );
}

export default Activity;
