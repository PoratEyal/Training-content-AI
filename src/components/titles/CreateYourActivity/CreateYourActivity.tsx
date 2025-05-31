import styles from "./CreateYourActivity.module.css";
import { useLanguage } from "../../../i18n/useLanguage";

function CreateYourActivity() {
  const { isEnglish, t } = useLanguage();

  return (
    <div
      className={
        isEnglish
          ? `${styles.create_your_activity_title} ${styles.ltr}`
          : styles.create_your_activity_title
      }
    >
      <h1>{t("buildActivity.createTitle")}</h1>

      <img
        title="Sparks effect"
        alt="Sparks effect"
        src="/page3_effect.svg"
        loading="lazy"
        width={23}
        height={24}
      />
    </div>
  );
}

export default CreateYourActivity;
