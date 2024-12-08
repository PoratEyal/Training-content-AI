import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../components/ActivityOutput/Markdown.css";
import styles from "./MyActivityData.module.css";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import ActivityReady from "../../components/titles/ActivityReady/ActivityReady";
import route from "../../router/route.json";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import ActivityOutputStatic from "../../components/ActivityOutput/ActivityOutputStatic";
import SmallLoading from "../../components/Loading/SmallLoading/SmallLoading";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthContext } from "../../context/AuthContext";
import { Activity } from "../../models/types/activity";

function MyActivityData() {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const goBack = () => {
    navigate(route.myActivities);
  };

  useEffect(() => {
    const fetchActivity = async () => {
      if (!currentUser || !currentUser.id || !subject) {
        setError("User not logged in or invalid subject.");
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", currentUser.id);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const userActivities: Activity[] = userData.activities || [];

          // Find the activity by subject
          const foundActivity = userActivities.find((act) => act.subject === subject);
          if (!foundActivity) {
            setError("Activity not found.");
          } else {
            setActivity(foundActivity);
          }
        } else {
          setError("User document does not exist.");
        }
      } catch (error: any) {
        setError(error.message || "Failed to fetch activity.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [currentUser, subject]);

  return (
    <PageLayout
      path={`/myActivities/${subject}`}
      hasGreenBackground
      hasHeader={{ goBack }}
      hesAds={ACTIVITY_AD_SLOT}
      title={activity ? activity.subject : ""}
      content={activity ? activity.subject : ""}
      hasNavBar
      noIndex
    >
      {loading ? (
        <section className={styles.activity_data_container}>
          <SmallLoading />
        </section>
      ) : error ? (
        <section className={styles.activity_data_container}>
          <div>Error: {error}</div>
        </section>
      ) : activity ? (
        <>
          <ActivityReady subject={activity.subject} />
          <section className={styles.activity_data_container}>
            <article>
              <ActivityOutputStatic activity={activity.activity} />
            </article>
            <div className={styles.padding} />
          </section>
        </>
      ) : (
        <section className={styles.activity_data_container}>
          <div>Activity not found.</div>
        </section>
      )}
    </PageLayout>
  );
}

export default MyActivityData;
