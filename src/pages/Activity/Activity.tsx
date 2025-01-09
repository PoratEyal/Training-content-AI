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
import MoreBtn from "../../components/ActivityMoreOptions/MoreBtn/MoreBtn";

function Activity() {
  const { data, mainActivity } = useContentContext();
  const { isLoggedIn } = useAuthContext();
  const [newActivity, setNewActivity] = useState(false);
  const activityRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(route.build);
  };

  useEffect(() => {
    if (!data || !data.grade || !data.movement || !mainActivity) {
      goBack();
    }
  }, [data, mainActivity]);

  useEffect(() => {
    if (newActivity && activityRef.current) {
      activityRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setNewActivity(false);
    }
  }, [newActivity]);

  return (
    <>
      <PageLayout
        path={route.activity}
        hasGreenBackground
        hasHeader={{ goBack }}
        title={helmet.activity.title}
        content={helmet.home.content}
        hesAds={ACTIVITY_AD_SLOT}
        hasNavBar
        index={false}
      >
        <ActivityReady subject={mainActivity.subject} />
        <section className={styles.activity_data_container}>
          <article>
            <ActivityOutput activity={mainActivity.activity} activityRef={activityRef} />
            {isLoggedIn ? <MoreBtn edit={false} save={true} activity={mainActivity} /> : null}
          </article>
          <div className={styles.padding} />
        </section>
      </PageLayout>
    </>
  );
}

export default Activity;
