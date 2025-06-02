import { useLanguage } from "../../../i18n/useLanguage";
import styles from "./ReadyContentName.module.css";

type ActivityReadyProps = {
    subject: string;
    type?: "many" | "one" | "none";
    isLoading?: boolean;
};

const ReadyContentName: React.FC<ActivityReadyProps> = ({
    subject,
    type = "none",
    isLoading = false,
}) => {
    const { dir } = useLanguage();
    const setAdditionSpan = (type: "many" | "one" | "none") => {
        switch (type) {
            case "many":
                return <span>פעולות בנושא</span>;
            case "one":
                return <span>פעולה בנושא</span>;
            default:
                return null;
        }
    };

    return (
        <h1 className={styles.activity_title} dir={dir}>
            {isLoading ? (
                <span>פעולות בנושא בטעינה...</span>
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
