import styles from "./Activity.module.css";
import { useRef, useState, useEffect } from "react";
import { useContentContext } from "../../context/ContentContext";
import ActivityOutput from "../../components/ActivityOutput/ActivityOutput";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";
import helmet from "../../models/resources/helmet.json";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import { useAuthContext } from "../../context/AuthContext";
import { useCookies } from "react-cookie";
import {
  POPUP_REVIEW,
  VISIT_COUNT_KEY,
  CookieOptions,
} from "../../models/constants/cookie";
import ReviewPopup from "../../components/ReviewPopup/ReviewPopup";

function Activity() {
  const { data, mainActivity } = useContentContext();
  const [newActivity, setNewActivity] = useState(false);
  const activityRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const { isPopupVisible, handlePopupClose, setIsPopupVisible } = useAuthContext();
  const [cookies, setCookie] = useCookies([POPUP_REVIEW, VISIT_COUNT_KEY]);

  useEffect(() => {
    if (!data || !data.grade || !data.movement || !mainActivity) {
      goBack();
    }
  }, [data]);

  useEffect(() => {
    if (newActivity && activityRef.current) {
      activityRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setNewActivity(false);
    }
  }, [newActivity]);

  useEffect(() => {
    let visitCount = parseInt(cookies[VISIT_COUNT_KEY] || "0", 10);
    if (isNaN(visitCount)) {
      visitCount = 0;
    }
    visitCount += 1;
    setCookie(VISIT_COUNT_KEY, visitCount.toString(), CookieOptions);

    if (!cookies[POPUP_REVIEW] && visitCount >= 5) {
      const timer = setTimeout(() => {
        setIsPopupVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const goBack = () => {
    navigate(route.build);
  };

  return (
    <>
      <PageLayout
        path={route.activity}
        hasGreenBackground
        hasHeader={{ goBack }}
        title={helmet.activity.title}
        content={helmet.activity.content}
        hesAds={ACTIVITY_AD_SLOT}
        hasNavBar
        noIndex
      >
        {isPopupVisible && <ReviewPopup onClose={handlePopupClose} />}
        <ActivityReady subject={mainActivity.subject} />
        <section className={styles.activity_data_container}>
          <article>
            <ActivityOutput activity={mainActivity.activity} activityRef={activityRef} />
          </article>
          <div className={styles.padding} />
        </section>
      </PageLayout>
    </>
  );
}

export default Activity;
