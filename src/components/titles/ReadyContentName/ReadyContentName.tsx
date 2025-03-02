import { useTranslation } from "react-i18next";
import styles from "../ReadyContentName/ReadyContentName.module.css";

type ActivityReadyProps = {
  subject: string;
  isMany?: boolean;
  isLoading?: boolean;
};

function ReadyContentName({ subject, isMany = false, isLoading = false }: ActivityReadyProps) {
  const { t } = useTranslation();

  return (
    <h1 className={styles.activity_title}>
      {isLoading ? (
        <span>{t("contentActivities.readyContentName.loading")}</span>
      ) : (
        <>
          {isMany ? (
            <span>{t("contentActivities.readyContentName.many")}</span>
          ) : (
            <span>{t("contentActivities.readyContentName.single")}</span>
          )}

          <div>{subject}</div>
        </>
      )}
    </h1>
  );
}

export default ReadyContentName;
