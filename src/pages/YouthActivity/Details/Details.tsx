//
// This is the Activity Parameters page for filling in group details (movement, grade, number of children, gender)
// It auto-fills fields on the first render from user/session data if available
// It resets fields when the language changes to avoid mismatched data
// On form submission, it saves the data to the app's context and navigates to the activity-building page
//
import styles from "./Details.module.css";
import { useEffect, useState, useRef } from "react";
import { useContentContext } from "../../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import {
  MovmentsOptions,
  GradeOptions,
  AmountOptions,
  GenderOptions,
} from "../../../models/resources/select";
import SelectDetails from "../../../components/SelectDetails/SelectDetails";
import MainBtn from "../../../components/MainBtn/MainBtn";
import { useAuthContext } from "../../../context/AuthContext";
import route from "../../../router/route.json";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import PageLoading from "../../../components/Loading/PageLoading/PageLoading";
import { DETAILS_AD_SLOT } from "../../../models/constants/adsSlot";
import { useLanguage } from "../../../i18n/useLanguage";
import TellUsAboutYourGroup from "../../../components/titles/TellUsAboutYourGroup/TellUsAboutYourGroup";

function Details() {
  
  const { t, isRTL, dir, lang } = useLanguage();
  const { data, updateDetails } = useContentContext();  // Session Storage
  const { currentUser, loading } = useAuthContext();    // Current User DB Data
  const navigate = useNavigate();

  const [movement, setMovement] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [numberOfChildren, setNumberOfChildren] = useState("");
  const [gender, setGender] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  
  const initialLangRef = useRef(lang);

  // Determine language-specific paths
  const groupDetailsPath = route[`GroupDetails${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.GroupDetailsHe;
  const activityParamsPath = route[`activityParams${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.activityParamsHe;

  useEffect(() => {

    if (lang === initialLangRef.current) {
      setMovement(data?.movement?.name || currentUser?.movement?.movement || "");
      setClassLevel(data?.grade || currentUser?.movement?.grade || "");
      setNumberOfChildren(data?.amount || currentUser?.movement?.amount || "");
      setGender(data?.gender || currentUser?.movement?.gender || "");
    }
  }, [data, currentUser]);

  useEffect(() => {
    if (loading) {
      setIsDisabled(true);
    } else {
      setIsDisabled(!(movement && classLevel && numberOfChildren && gender));
    }
  }, [movement, classLevel, numberOfChildren, gender, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDetails(movement, classLevel, numberOfChildren, gender);
    sessionStorage.setItem("currentLanguage", lang);
    navigate(activityParamsPath);
  };

  return (
    <PageLayout
      id="details"
      path={groupDetailsPath}
      hasGreenBackground
      hasHeader={{}}
      hasAds={DETAILS_AD_SLOT}
      hasNavBar
      index={false}
    >
      <TellUsAboutYourGroup />

      <form
        onSubmit={handleSubmit}
        className={styles.details_form_container}
        style={{ direction: dir }}
      >
        <img
          className={`${styles.lamp_img} ${isRTL ? styles.lamp_img_rtl : styles.lamp_img_ltr}`}
          title={t("details.lampAlt")}
          alt={t("details.lampAlt")}
          src="/lamp.svg"
          loading="lazy"
          width={105}
          height={109}
        />

        <div className={styles.selects_btn}>
          {loading ? (
            <div className={styles.loading_mock_selection_container}>
              <PageLoading />
            </div>
          ) : (
            <div className={styles.details_content}>
              <SelectDetails
                data={MovmentsOptions[lang]}
                placeholder={t("details.youthMovement")}
                obj={movement}
                setObj={setMovement}
              />
              <SelectDetails
                data={GradeOptions[lang]}
                placeholder={t("details.grade")}
                obj={classLevel}
                setObj={setClassLevel}
              />
              <SelectDetails
                data={AmountOptions[lang]}
                placeholder={t("details.numberOfChildren")}
                obj={numberOfChildren}
                setObj={setNumberOfChildren}
              />
              <SelectDetails
                data={GenderOptions[lang]}
                placeholder={t("details.gender")}
                obj={gender}
                setObj={setGender}
              />
            </div>
          )}
          <div className={isRTL ? styles.RTLDir : styles.LTRDir}>
            <MainBtn
              text={t("details.submit")}
              isDisabled={isDisabled}
              type="submit"
              func={handleSubmit}
              height={42}
            />
          </div>
        </div>
      </form>
    </PageLayout>
  );
}

export default Details;
