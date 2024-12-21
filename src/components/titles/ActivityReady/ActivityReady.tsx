import styles from "./ActivityReady.module.css";

type ActivityReadyProps = {
    subject: string;
    isMany?: boolean;
};

function ActivityReady({ subject, isMany = false }: ActivityReadyProps) {
    return (
        <h1 className={styles.activity_title}>
            {isMany ? <span>פעולות בנושא</span> : null}
            <div>{subject}</div>
        </h1>
    );
}

export default ActivityReady;
