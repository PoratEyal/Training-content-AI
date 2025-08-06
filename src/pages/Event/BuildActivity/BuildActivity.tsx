import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import styles from "./BuildActivity.module.css";
import MainBtn from "../../../components/MainBtn/MainBtn";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import LoadingActivity from "../../../components/Loading/LoadingActivity/LoadingActivity";
import SelectDetails from "../../../components/SelectDetails/SelectDetails";
import CreateYourActivity from "../../../components/titles/CreateYourActivity/CreateYourActivity";
import { useContentContext } from "../../../context/ContentContext";
import { ProductType } from "../../../context/ProductType";
import { useLanguage } from "../../../i18n/useLanguage";
import { EVENT_AD_SLOT } from "../../../models/constants/adsSlot";
import { AgeOptions, AmountOptions, GenderOptions, PlaceOptions, MaterialsOptions } from "../../../models/resources/productEvent/select";
import { StorageKey } from "../../../models/enum/storage";
import { ProductPages } from "../../../models/enum/pages";
import Session from "../../../utils/sessionStorage";
import { enforcePageAccess } from "../../../utils/navigation";
import { generateEventActivity } from "../../../hooks/generateEventActivity";
import { logEvent } from "../../../utils/logEvent";
import { useAuthContext } from "../../../context/AuthContext"


function BuildActivity() {
  const { t, isRTL, lang } = useLanguage();
  const { currentPage, setCurrentPage } = useContentContext();
  const navigate = useNavigate();

  const [event, setEvent] = useState("");
  const [moreDetails, setMoreDetails] = useState("");
  const [duration, setDuration] = useState("");
  const [age, setAge] = useState("");
  const [amount, setAmount] = useState("");
  const [gender, setGender] = useState("");
  const [place, setPlace] = useState("");
  const [materials, setMaterials] = useState("");
  const [clicked, setClicked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { currentUser } = useAuthContext()

  const eventHomePagePath = route[`eventHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.eventHomePageEn;
  const eventActivityPath = route[`eventActivityAI${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.eventActivityAIEn;

  const goBack = () => {
    const eventDetailsPath = route[`eventDetails${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.eventDetailsEn;
    navigate(eventDetailsPath);
  };

  useEffect(() => {
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_EventBuild, navigate, eventHomePagePath);
  }, []);

  useEffect(() => {
    const saved = Session.get(StorageKey.EVENT_DETAILS);
    if (saved) {
      setEvent(saved.event || "");
      setMoreDetails(saved.moreDetails || "");
      setDuration(saved.duration || "");
      setAge(saved.age || "");
      setAmount(saved.amount || "");
      setGender(saved.gender || "");
      setPlace(saved.place || "");
      setMaterials(saved.materials || "");
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      Session.set(StorageKey.EVENT_DETAILS, {
        event,
        moreDetails,
        duration,
        age,
        amount,
        gender,
        place,
        materials,
      });
    }
  }, [event, moreDetails, duration, age, amount, gender, place, materials, isInitialized]);

  useEffect(() => {
    const allFilled = event.trim() && age && amount && gender && place && materials;
    setIsDisabled(!allFilled);
  }, [event, age, amount, gender, place, materials]);


  const submitHandler = async () => {
    setClicked(true)
    try {
      const result = await generateEventActivity(event, moreDetails, duration, age, amount, gender, place, materials, lang)
      if (result) {
        sessionStorage.setItem(StorageKey.EVENT_ACTIVITY, JSON.stringify(result));
        navigate(eventActivityPath)
      } else {
        logEvent(`[Event.Build]: bad result`, currentUser?.email);
      }
    } catch (error) {
      logEvent(`[Event.Build]: catch – ${String(error?.message || error)}`, currentUser?.email);
    } finally {
      setClicked(false)
    }
  }

  return (
    <PageLayout
      id="eventBuild"
      productType={ProductType.Event}
      hasGreenBackground
      hasHeader={{ goBack }}
      hasAds={EVENT_AD_SLOT}
      index={false}
      hasNavBar
    >
      <CreateYourActivity />
      <div className={styles.build_form_container}>
        <img
          className={isRTL ? styles.path_img : `${styles.path_img} ${styles.ltr_path}`}
          title="Yellow sign with heart"
          alt="Yellow sign with heart"
          src="/Event/path.svg"
          width={80}
          height={110}
        />

        <div className={styles.selects_btn}>
          <section className={styles.build_container}>
            <section className={styles.build_content}>
              <SelectDetails
                placeholder={t("event.BuildActivity.age")}
                obj={age}
                setObj={setAge}
                data={AgeOptions[lang]}
              />
              <SelectDetails
                placeholder={t("event.BuildActivity.amount")}
                obj={amount}
                setObj={setAmount}
                data={AmountOptions[lang]}
              />
              <SelectDetails
                placeholder={t("event.BuildActivity.gender")}
                obj={gender}
                setObj={setGender}
                data={GenderOptions[lang]}
              />
              <SelectDetails
                placeholder={t("event.BuildActivity.place")}
                obj={place}
                setObj={setPlace}
                data={PlaceOptions[lang]}
              />
              <SelectDetails
                placeholder={t("event.BuildActivity.materials")}
                obj={materials}
                setObj={setMaterials}
                data={MaterialsOptions[lang]}
              />
              <div className={isRTL ? `${styles.btn_div} ${styles.rtl_btn}` : styles.btn_div}>
                <MainBtn
                  isDisabled={isDisabled}
                  height={42}
                  text={t("event.BuildActivity.submit")}
                  func={submitHandler}
                />
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
