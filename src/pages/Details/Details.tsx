import { useEffect, useState, useRef } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import styles from "./Details.module.css";
import {
  MovmentsOptions,
  GradeOptions,
  AmountOptions,
  GenderOptions,
} from "../../models/resources/select";
import SelectDetails from "../../components/SelectDetails/SelectDetails";
import MainBtn from "../../components/MainBtn/MainBtn";
import { useAuthContext } from "../../context/AuthContext";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import PageLoading from "../../components/Loading/PageLoading/PageLoading";
import TellUsAboutYourGroup from "../../components/titles/TellUsAboutYourGroup/TellUsAboutYourGroup";
import { DETAILS_AD_SLOT } from "../../models/constants/adsSlot";
import { useLanguage } from "../../i18n/useLanguage";

function Details() {
  const { t, isHebrew, dir, lang } = useLanguage();
  const { data, updateDetails } = useContentContext();
  const { currentUser, loading } = useAuthContext();
  const navigate = useNavigate();

  const [movement, setMovment] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [numberOfChildren, setNumberOfChildren] = useState("");
  const [gender, setGender] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);

  const initialLangRef = useRef(lang);

  // Populate fields only on first render (same language)
  useEffect(() => {
    if (lang === initialLangRef.current) {
      setMovment(data?.movement?.name || currentUser?.movement?.movement || "");
      setClassLevel(data?.grade || currentUser?.movement?.grade || "");
      setNumberOfChildren(data?.amount || currentUser?.movement?.amount || "");
      setGender(data?.gender || currentUser?.movement?.gender || "");
    }
  }, [data, currentUser]);

  // Reset fields only when language changes
  useEffect(() => {
    if (lang !== initialLangRef.current) {
      setMovment("");
      setClassLevel("");
      setNumberOfChildren("");
      setGender("");
    }
  }, [lang]);

  useEffect(() => {
    if (loading) setIsDisabled(true);
    else {
      if (movement && classLevel && numberOfChildren && gender) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [movement, classLevel, numberOfChildren, gender, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateDetails(movement, classLevel, numberOfChildren, gender);
    sessionStorage.setItem("currentLanguage", lang);
    navigate(route.build);
  };

  return (
    <PageLayout
      id="details"
      path={route.details}
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
          className={`${styles.lamp_img} ${isHebrew ? styles.lamp_img_rtl : styles.lamp_img_ltr}`}
          title={t("details.lampAlt")}
          alt={t("details.lampAlt")}
          src={"/lamp.svg"}
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
                setObj={setMovment}
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
          <div className={isHebrew ? styles.hebrewDir : styles.nonHebrewDir}>
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
