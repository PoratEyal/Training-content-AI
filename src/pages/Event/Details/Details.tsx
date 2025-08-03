import MainBtn from "../../../components/MainBtn/MainBtn";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import EventInput from "../../../components/EventInput/EventInput";
import MoreDetailsInput from "../../../components/MoreDetailsInput/MoreDetailsInput";
import TellUsAboutYourEvent from "../../../components/titles/TellUsAboutYourEvent/TellUsAboutYourEvent";
import { useContentContext } from "../../../context/ContentContext";
import { ProductType } from "../../../context/ProductType";
import { useLanguage } from "../../../i18n/useLanguage";
import { EVENT_AD_SLOT } from "../../../models/constants/adsSlot";
import route from "../../../router/route.json";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Details.module.css";
import { ProductPages } from "../../../models/enum/pages";
import { StorageKey } from "../../../models/enum/storage";
import { enforcePageAccess } from "../../../utils/navigation";
import Session from "../../../utils/sessionStorage";

function Details() {
  const { t, isRTL, dir, lang } = useLanguage();
  const { currentPage, setCurrentPage } = useContentContext();
  const navigate = useNavigate();

  const [event, setEvent] = useState("");
  const [moreDetails, setMoreDetails] = useState("");
  const [hasAlert, setHasAlert] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const eventBuildPath = route[`eventBuild${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.eventBuildEn;
  const eventHomePagePath = route[`eventHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.eventHomePageEn;

  const goBack = () => { navigate(eventHomePagePath); };

  useEffect(() => {
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_EventDetails, navigate, eventHomePagePath);
  }, []);

  // Load from session
  useEffect(() => {
    const savedDetails = Session.get(StorageKey.EVENT_DETAILS);
    if (savedDetails) {
      setEvent(savedDetails.event || "");
      setMoreDetails(savedDetails.moreDetails || "");
    }
    setIsInitialized(true);
  }, []);

  // Save to session automatically
  useEffect(() => {
    if (isInitialized) {
      const existing = Session.get(StorageKey.EVENT_DETAILS) || {};
      Session.set(StorageKey.EVENT_DETAILS, {
        ...existing,
        event,
        moreDetails,
      });
    }
  }, [event, moreDetails, isInitialized]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = Session.get(StorageKey.EVENT_DETAILS) || {};
    Session.set(StorageKey.EVENT_DETAILS, {
      ...existing,
      event,
      moreDetails,
    });
    navigate(eventBuildPath);
  };


  return (
    <PageLayout
      id="eventDetails"
      productType={ProductType.Event}
      hasGreenBackground
      hasHeader={{ goBack }}
      hasAds={EVENT_AD_SLOT}
      hasNavBar
      index={false}
    >
      <TellUsAboutYourEvent />
      <form
        onSubmit={handleSubmit}
        className={styles.details_form_container}
        style={{ direction: dir }}
      >
        <img
          className={`${styles.lamp_img} ${isRTL ? styles.lamp_img_rtl : styles.lamp_img_ltr}`}
          title={t("eventDetails.lampAlt")}
          alt={t("eventDetails.lampAlt")}
          src="/Event/lamp.svg"
          loading="lazy"
          width={95}
          height={109}
        />

        <div className={styles.selects_btn}>
          <div className={styles.details_content}>
            <EventInput
              placeholder={t("eventDetails.event")}
              event={event}
              setEvent={setEvent}
              setHasAlert={setHasAlert}
            />
            <label className={styles.label}>
              {t("eventDetails.eventLable")}
            </label>
            <MoreDetailsInput
              placeholder={t("eventDetails.moreDetails")}
              text={moreDetails}
              setText={setMoreDetails}
            />
          </div>
          <div style={{ direction: isRTL ? "ltr" : "rtl" }}>
            <MainBtn
              text={t("common.btnContinue")}
              isDisabled={!event}
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
