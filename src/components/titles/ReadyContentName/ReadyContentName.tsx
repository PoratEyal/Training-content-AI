import styles from "../ReadyContentName/ReadyContentName.module.css";

type ActivityReadyProps = {
    subject: string;
    isMany?: boolean;
};

function ReadyContentName({ subject, isMany = false }: ActivityReadyProps) {
    return (
        <h1 className={styles.activity_title}>
            {isMany ? <span>פעולות בנושא</span> : <span>פעולה בנושא</span>}
            <div>{subject}</div>
        </h1>
    );
}

export default ReadyContentName;
