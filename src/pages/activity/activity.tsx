import styles from "./activity.module.css";
import { useContentContext } from "../../context/ContentContext";
import BackBtn from "../../components/backBtn/backBtn";
import ActivityOutput from "../../components/activityOutput/activityOutput";

function Activity() {
    const { data } = useContentContext();

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <BackBtn path={"/choosePath"} />
            </div>

            {data.pointOfView.use && (
                <ActivityOutput
                    index={1}
                    title={"נקודת מבט"}
                    path={data.pointOfView}
                    contextData={data}
                />
            )}

            {data.contentActivity.use && (
                <ActivityOutput
                    index={2}
                    title={"פעילות תוכן"}
                    path={data.contentActivity}
                    contextData={data}
                />
            )}

            {data.scoutingTime.use && (
                <ActivityOutput
                    index={3}
                    title={"זמן תנועת נוער"}
                    path={data.scoutingTime}
                    contextData={data}
                />
            )}

            {data.playingTime.use && (
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
