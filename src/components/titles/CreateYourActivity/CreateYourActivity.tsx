import styles from "./CreateYourActivity.module.css";
import { useLanguage } from "../../../i18n/useLanguage";
import { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { ProductType } from "../../../context/ProductType";

function CreateYourActivity() {
  const { isRTL, t } = useLanguage();
  const productType = useContext(ProductContext);

  const title =
    productType === ProductType.Event
      ? t("event.BuildActivity.title")
      : t("youth.BuildActivity.title");

  return (
    <div
      className={
        !isRTL
          ? `${styles.create_your_activity_title} ${styles.ltr}`
          : styles.create_your_activity_title
      }
    >
      <h1>{title}</h1>

      <img
        title="Sparks effect"
        alt="Sparks effect"
        src="/Youth/page3_effect.svg"
        loading="lazy"
        width={23}
        height={24}
      />
    </div>
  );
}

export default CreateYourActivity;
