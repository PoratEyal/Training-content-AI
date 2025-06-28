//
// This is the Activity Parameters page for filling in group details (movement, grade, number of children, gender)
// It auto-fills fields on the first render from user/session data if available
// It resets fields when the language changes to avoid mismatched data
// On form submission, it saves the data to the app's context and navigates to the activity-building page
//
import MainBtn from "../../../components/MainBtn/MainBtn"
import PageLayout from "../../../components/Layout/PageLayout/PageLayout"
import SelectDetails from "../../../components/SelectDetails/SelectDetails"
import TellUsAboutYourGroup from "../../../components/titles/TellUsAboutYourGroup/TellUsAboutYourGroup"
import { useAuthContext } from "../../../context/AuthContext"
import { useContentContext } from "../../../context/ContentContext"
import { ProductType } from "../../../context/ProductType"
import { useLanguage } from "../../../i18n/useLanguage"
import { YOUTH_DETAILS_AD_SLOT } from "../../../models/constants/adsSlot"
import { MovmentsOptions, GradeOptions, AmountOptions, GenderOptions } from "../../../models/resources/select"
import route from "../../../router/route.json"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from "./Details.module.css"
import { ProductPages } from "../../../models/enum/pages"
import { enforcePageAccess } from "../../../utils/navigation"


function Details() {

  const { t, isRTL, dir, lang } = useLanguage();
  const { currentPage, setCurrentPage, data, updateDetails } = useContentContext();
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const [movement, setMovement] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [numberOfChildren, setNumberOfChildren] = useState("");
  const [gender, setGender] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const youthBuildPath = route[`youthBuild${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthBuildEn;
  const youthHomePagePath = route[`youthHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthHomePageEn;

  const goBack = () => { navigate(youthHomePagePath); };

  useEffect(() => { // Prevent direct access via URL
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_YouthDetails, navigate, youthHomePagePath);
  }, []);

  useEffect(() => { // Set default values from session data or current user
    setMovement(data?.movement?.name || currentUser?.movement?.movement || "");
    setClassLevel(data?.grade || currentUser?.movement?.grade || "");
    setNumberOfChildren(data?.amount || currentUser?.movement?.amount || "");
    setGender(data?.gender || currentUser?.movement?.gender || "");
  }, [data, currentUser]);

  useEffect(() => { // Enable/Disable "Continue" button based on whether fields are filled
    setIsDisabled(!(movement && classLevel && numberOfChildren && gender));
  }, [movement, classLevel, numberOfChildren, gender]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDetails(movement, classLevel, numberOfChildren, gender);
    navigate(youthBuildPath);
  };

  return (
    <PageLayout
      id="details"
      productType={ProductType.Youth}
      hasGreenBackground
      hasHeader={{ goBack }}
      hasAds={YOUTH_DETAILS_AD_SLOT}
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
          src="/Youth/lamp.svg"
          loading="lazy"
          width={105}
          height={109}
        />

        <div className={styles.selects_btn}>
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
          <div className={isRTL ? styles.RTLDir : styles.LTRDir}>
            <MainBtn
              text={t("common.btnContinue")}
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
