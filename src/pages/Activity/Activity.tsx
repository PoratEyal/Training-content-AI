import styles from "./Activity.module.css";
import { useRef, useState } from "react";
import { useContentContext } from "../../context/ContentContext";
import ActivityOutput from "../../components/ActivityOutput/ActivityOutput";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";
import helmet from "../../models/resources/helmet.json";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import { useAuthContext } from "../../context/AuthContext";
import ReviewPopup from "../../components/ReviewPopup/ReviewPopup";

function Activity() {
    const { data, mainActivity } = useContentContext();
    const [newActivity, setNewActivity] = useState(false);
    const activityRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();
    const { isPopupVisible, handlePopupClose } = useAuthContext();

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

    const goBack = () => {
        navigate(route.build);
    };

    return (
        <>
          {isPopupVisible && <ReviewPopup onClose={handlePopupClose} />}
          {/* <ReviewPopup onClose={handlePopupClose} /> */}
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
