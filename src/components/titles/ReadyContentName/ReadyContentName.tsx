import styles from "../ReadyContentName/ReadyContentName.module.css";

type ActivityReadyProps = {
    subject: string;
    isMany?: boolean;
    isLoading?: boolean;
};

function ReadyContentName({ subject, isMany = false, isLoading = false }: ActivityReadyProps) {
    return (
        <h1 className={styles.activity_title}>
            {isLoading ? (
                <span>פעולות בנושא בטעינה...</span>
            ) : (
                <>
                    {isMany ? <span>פעולות בנושא</span> : <span>פעולה בנושא</span>}
                    <div>{subject}</div>
                </>
            )}
        </h1>
    );
}

export default ReadyContentName;