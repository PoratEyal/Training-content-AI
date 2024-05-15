import styles from "./Activity.module.css";
import { useContentContext } from "../../context/ContentContext";
import ActivityOutput from "../../components/ActivityOutput/ActivityOutput";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Activity() {
    const { data } = useContentContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!data || !data.grade || !data.movement || data.movement.path.length === 0) {
            navigate("/choosePath");
        }
    }, []);

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

            {data?.movement?.path.map((path, i) => (
                <ActivityOutput key={i} index={i} movementPath={path} />
            ))}
        </div>
    );
}

export default Activity;
