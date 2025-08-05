//
// This is the Activity Parameters page
// It loads default values from session or user data, and allows filling in activity parameters
//
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainBtn from "../../../components/MainBtn/MainBtn";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import LoadingActivity from "../../../components/Loading/LoadingActivity/LoadingActivity";
import MoreDetailsInput from "../../../components/MoreDetailsInput/MoreDetailsInput";
import MoreOptionsCollapse from "../../../components/MoreOptionsCollapse/MoreOptionsCollapse";
import SelectDetails from "../../../components/SelectDetails/SelectDetails";
import SubjectInput from "../../../components/SubjectInput/SubjectInput";
import CreateYourActivity from "../../../components/titles/CreateYourActivity/CreateYourActivity";
import { useAuthContext } from "../../../context/AuthContext";
import { useContentContext } from "../../../context/ContentContext";
import { ProductType } from "../../../context/ProductType";
import { useNotificationContext } from "../../../context/NotificationContext";
import { useLanguage } from "../../../i18n/useLanguage";
import { YOUTH_BUILD_AD_SLOT } from "../../../models/constants/adsSlot";
import { ActivityTimeOptions, CategoryOptions, ContestOptions, PlaceOptions, ReligionOptions, ToolsOptions } from "../../../models/resources/productYouth/select";
import { Activity } from "../../../models/types/activity";
import { CategoryName } from "../../../models/types/movement";
import { StorageKey } from "../../../models/enum/storage";
import Session from "../../../utils/sessionStorage";
import { fetchGetActivity, fetchUpdateUser } from "../../../utils/fetch";
import route from "../../../router/route.json";
import { isYouthDetailsChanged, updateUserMovement } from "../../../utils/user";
import { ProductPages } from "../../../models/enum/pages";
import { enforcePageAccess } from "../../../utils/navigation";
import { logEvent } from "../../../utils/logEvent";
import styles from "./BuildActivity.module.css"


function BuildActivity() {

  const { t, isRTL, lang } = useLanguage();
  const { notifyAlert: notifyAlert } = useNotificationContext();
  const { data, updateMainActivity, currentPage, setCurrentPage } = useContentContext();
  const { isLoggedIn, currentUser, setCurrentUser } = useAuthContext();

  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [religion, setReligion] = useState<string>("");
  const [contest, setContest] = useState<string>("");
  const [tools, setTools] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  const [clicked, setClicked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const lockRef = useRef(true);

  const [hasAlert, setHasAlert] = useState(false);

  const youthHomePagePath = route[`youthHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthHomePageEn;
  const youthActivityAIPath = route[`youthActivityAI${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthActivityAIEn;

  const goBack = () => {
    const youthDetailsPath = route[`youthDetails${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthDetailsEn;
    navigate(youthDetailsPath);
  };

  useEffect(() => { // Prevent direct access via URL
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_YouthBuild, navigate, youthHomePagePath);
  }, []);

  useEffect(() => { // Initialize form: validate data, set defaults, update user if needed, load session activity

    const updateUser = async () => {
      lockRef.current = false;
      if (isLoggedIn && currentUser && data?.movement) {
        if (isYouthDetailsChanged(currentUser.movement, data)) {
          const { movement, grade, gender, amount } = data;
          const { name } = movement;
          const user = updateUserMovement(currentUser, name, grade, gender, amount);
          await fetchUpdateUser({ user });
          setCurrentUser(user);
        }
      }
    };

    const setStateFromSession = () => {
      try {
        if (!subject || subject === "") {
          const sessionActivity: Activity | undefined = Session.get(StorageKey.YOUTH_ACTIVITY);
          if (sessionActivity) {
            setCategory(sessionActivity.category);
            setSubject(sessionActivity.subject);
            setPlace(sessionActivity.place);
            setTime(sessionActivity.time);
            if (sessionActivity.religion) setReligion(sessionActivity.religion);
            if (sessionActivity.contest) setContest(sessionActivity.contest);
            if (sessionActivity.tools) setTools(sessionActivity.tools);
            if (sessionActivity.info) setInfo(sessionActivity.info);
          }
        }
      } catch (error) { }
    };

    if (!data || !data.movement) {  // Backup code although it should not be needed
      navigate(youthHomePagePath);
      return;
    }

    if (data?.movement?.categories && data.movement.categories.length > 0) {
      setCategory(data.movement.categories[0].name);
    }

    if (lockRef.current) {
      updateUser();
      setStateFromSession();
    }
  }, [currentUser, data, isLoggedIn, navigate]);

  useEffect(() => { // Enable/Disable "Continue" button based on whether fields are filled
    setIsDisabled(subject === "" || place === "" || time === "");
  }, [subject, place, time]);

  const submitHandler = async () => {

    setClicked(true);
    const { movement, ...detailsData } = data;
    try {
      const response = await fetchGetActivity({ category: category as CategoryName, movement: movement.name, ...detailsData, subject, time, place, religion, contest, tools, info, lang, });
      if (response.result === "success" && response.activity) {
        updateMainActivity({ ...response.activity });
        navigate(youthActivityAIPath);
      } else {
        notifyAlert(t("common.errorMsg"));
        logEvent(`[BuildActivity.else]: serverMessage: ${String(response.message)}`, currentUser?.email);
      }
    } catch (error) {
      notifyAlert(t("common.errorMsg"));
      const errorMessage = error instanceof Error && typeof error.message === "string" ? error.message : "Unknown error";
      const logMessage = `[BuildActivity.catch]: Error: ${errorMessage} | subject: ${String(subject)} | category: ${String(category)} | place: ${String(place)} | time: ${String(time)} | religion: ${String(religion)} | contest: ${String(contest)} | tools: ${String(tools)} | info: ${String(info)} | lang: ${String(lang)}`;
      logEvent(logMessage, currentUser?.email);
    }
    finally {
      setClicked(false);
    }
  };

  return (
    <PageLayout
      id="build"
      productType={ProductType.Youth}
      hasGreenBackground
      hasHeader={{ goBack }}
      hasAds={YOUTH_BUILD_AD_SLOT}
      index={false}
      hasNavBar
    >
      <CreateYourActivity />

      <div className={styles.build_form_container}>
        <img
          className={isRTL ? styles.path_img : `${styles.path_img} ${styles.ltr_path}`}
          title="Yellow sign with heart"
          alt="Yellow sign with heart"
          src={"/Youth/path.svg"}
          width={80}
          height={110}
        />

        <div className={styles.selects_btn}>
          <section className={styles.build_container}>
            <section className={styles.build_content}>
              <SelectDetails
                placeholder={t("youthBuildActivity.category.label")}
                obj={category}
                setObj={setCategory}
                data={CategoryOptions(data?.movement?.categories || [])}
              />

              <SubjectInput
                placeholder={t("youthBuildActivity.subject.label")}
                setSubject={setSubject}
                subject={subject}
                category={category as CategoryName}
                setHasAlert={setHasAlert}
              />

              <SelectDetails
                placeholder={t("youthBuildActivity.place.label")}
                obj={place}
                setObj={setPlace}
                data={PlaceOptions[lang]}
              />

              <SelectDetails
                placeholder={t("youthBuildActivity.time.label")}
                obj={time}
                setObj={setTime}
                data={ActivityTimeOptions[lang]}
              />

              <MoreOptionsCollapse text={t("youthBuildActivity.moreOptions.title")}>
                <SelectDetails
                  placeholder={t("youthBuildActivity.tools.label")}
                  obj={tools}
                  setObj={setTools}
                  data={ToolsOptions[lang]}
                />

                <SelectDetails
                  placeholder={t("youthBuildActivity.contest.label")}
                  obj={contest}
                  setObj={setContest}
                  data={ContestOptions[lang]}
                />

                {lang === "he" && (
                  <SelectDetails
                    placeholder={t("youthBuildActivity.religion.label")}
                    obj={religion}
                    setObj={setReligion}
                    data={ReligionOptions}
                  />
                )}

                <MoreDetailsInput
                  placeholder={t("youthBuildActivity.moreDetails.label")}
                  text={info}
                  setText={setInfo}
                />
              </MoreOptionsCollapse>

              <div
                className={
                  isRTL
                    ? `${styles.btn_div} ${styles.rtl_btn}`
                    : styles.btn_div
                }
              >
                <MainBtn
                  isDisabled={isDisabled}
                  height={42}
                  text={t("youthBuildActivity.submit")}
                  func={submitHandler}
                />
                {hasAlert && (
                  <div className={styles.input_alert}>
                    {t("youthBuildActivity.alert")}
                  </div>
                )}
              </div>
            </section>
          </section>
        </div>
      </div>
      {clicked && <LoadingActivity />}
    </PageLayout>
  );
}

export default BuildActivity;
