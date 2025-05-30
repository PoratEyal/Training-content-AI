import styles from "./TSCs.module.css";
import policyHe from "../../models/resources/he/policy.json";
import policyEn from "../../models/resources/en/policy.json";
import Popup from "../core/Popup/Popup";
import MainBtn from "../MainBtn/MainBtn";
import { useLanguage } from "../../i18n/useLanguage";

function TSCs({ handleAccept }) {
  const { isHebrew, dir, t } = useLanguage();
  const currentPolicy = isHebrew ? policyHe : policyEn;

  const policyItems = [
    currentPolicy.p0,
    currentPolicy.p1,
    currentPolicy.p2,
    currentPolicy.p3,
    currentPolicy.p4,
    currentPolicy.p5,
    currentPolicy.p6,
    currentPolicy.p7,
    currentPolicy.p8
  ];

  return (
    <Popup>
      <div dir={dir}>
        <article className={styles.privacy}>
          <h3 className={styles.h3_privacy}>{t("privacyPolicy.title")}</h3>

          {policyItems.map((item, index) => (
            <div key={index} className={styles.space_div}>
              <label>{item.label}</label> {item.text}
            </div>
          ))}

          <div className={styles.space_div_end}>
            <label>{currentPolicy.p9.label}</label> {currentPolicy.p9.text}
          </div>
        </article>

        <div className={styles.fixed_btn}>
          <MainBtn
            type="submit"
            isDisabled={false}
            height={38}
            text={t("privacyPolicy.acceptButton")}
            func={handleAccept}
          />
        </div>
      </div>
    </Popup>
  );
}

export default TSCs;
