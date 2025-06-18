import { useLanguage } from "../../../i18n/useLanguage";
import styles from "./ReadyContentName.module.css";

type ActivityReadyProps = {
    subject: string;
    type?: "many" | "none";
    isLoading?: boolean;
};

const ReadyContentName: React.FC<ActivityReadyProps> = ({
    subject,
    type = "none",
    isLoading = false,
}) => {
    const { dir } = useLanguage();
    const setAdditionSpan = (type: "many" | "none") => {
        switch (type) {
            case "many":
                return <span>פעולות בנושא</span>;
            default:
                return null;
        }
    };

    return (
        <h1 className={styles.activity_title} dir={dir}>
            {isLoading ? (
                <span>פעולות בטעינה...</span>
            ) : (
                <>
                    {setAdditionSpan(type)}
                    <div>{subject}</div>
                </>
            )}
        </h1>
    );
};

export default ReadyContentName;
