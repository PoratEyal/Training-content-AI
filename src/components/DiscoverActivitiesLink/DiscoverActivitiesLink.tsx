import styles from "./DiscoverActivitiesLink.module.css";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";

function DiscoverActivitiesLink({}) {
    const navigate = useNavigate();

    const handleClick = async () => {
        navigate(route.examplesActivities);
    };

    return (
        <div className={styles.link_div}>
            <label className={styles.btn} onClick={() => handleClick()}>
                לחצו בכדי לגלות פעולות נפוצות אצלנו  
            </label>
        </div>
    )
}

export default DiscoverActivitiesLink;
