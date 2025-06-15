//
// This is the Static pre defined Activity page
// It displays a single static activity within a specific subject
// It supports both view and edit modes (RichTextEditor for edit)
//
import styles from "./ContentActivity.module.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../../components/ActivityOutput/Markdown.css";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import route from "../../../router/route.json";
import { CONTENT_ACTIVITY_AD_SLOT } from "../../../models/constants/adsSlot";
import SmallLoading from "../../../components/Loading/SmallLoading/SmallLoading";
import PageLoading from "../../../components/Loading/PageLoading/PageLoading";
import { useStaticContentContext } from "../../../context/StaticContentContext";
import { StaticActivities } from "../../../models/types/activity";
import { useCallback, useEffect, useState } from "react";
import { fetchGetStaticActivity } from "../../../utils/fetch";
import { useAuthContext } from "../../../context/AuthContext";
import { convertActivityType } from "../../../utils/activity";
import ActivityArticle from "../../../components/ActivityArticle/ActivityArticle";
import RichTextEditor from "../../../components/RichTextEditor/RichTextEditor";
import { useEditorContext } from "../../../context/EditorContext";
import { useLanguage } from "../../../i18n/useLanguage";

function ContentActivity() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { activityId, contentId } = useParams<{ activityId: string; contentId: string }>();
  const { subjects, isLoading, useFetchSubjectsData } = useStaticContentContext();
  const { isEdit, readOnlyMode } = useEditorContext();
  useFetchSubjectsData();
  const [isActivityLoading, setIsActivityLoading] = useState<boolean>(isLoading);
  const [activity, setActivity] = useState<StaticActivities | undefined>();
  const { isLoggedIn, currentUser } = useAuthContext();

  // Determine language-specific paths (fallback to Hebrew)
  const youthContentPath = route[`youthContent${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthContentEn;
  const PopularPath = route[`youthActivitiesPopular${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.youthActivitiesPopularEn;

  // Determine if coming from the popular activities page
  const fromPopular = location.state?.fromPopular ?? false;

  const goBack = () => {
    if (isEdit) {
      readOnlyMode();
    } else {
      if (fromPopular) {
        navigate(PopularPath);
      } else {
        navigate(`${youthContentPath}/${activityId}`);
      }
    }
  };

  const fetchActivity = useCallback(async () => {
    try {
      setIsActivityLoading(true);
      const response = await fetchGetStaticActivity({ contentName: contentId });
      setActivity(response.activity);
    } catch (error) {
      console.error("Failed to fetch activity:", error);
    } finally {
      setIsActivityLoading(false);
    }
  }, [contentId]);

  // Load activity either from subject context or by fallback fetching
  useEffect(() => {
    if (subjects.length > 0) {
      const foundSubject = subjects.find((subj) => subj.name === activityId);
      const foundActivity = foundSubject?.activities?.find((act) => act.name === contentId);
      setActivity(foundActivity);
    } else {
      fetchActivity();
    }
  }, [subjects, activityId, contentId, fetchActivity]);

  // Update loading state when data is fetched
  useEffect(() => {
    setIsActivityLoading(isLoading);
  }, [isLoading]);

  return (
    <PageLayout
      id="contentActivity"
      projectType={"youth"}
      hasGreenBackground
      hasHeader={{ goBack, hasTitle: activity?.title || undefined }}
      hasAds={CONTENT_ACTIVITY_AD_SLOT}
      hasNavBar
    >
      {isActivityLoading ? (
        <section className={styles.activity_data_container}>
          <PageLoading />
        </section>
      ) : activity ? (
        isEdit ? (
          <RichTextEditor
            activity={convertActivityType(activity, currentUser?.id || undefined)}
          />
        ) : (
          <ActivityArticle
            activity={convertActivityType(activity, currentUser?.id || undefined)}
            hasSave={isLoggedIn}
            hasCopy
            hasShare
          />
        )
      ) : (
        <section className={styles.activity_data_container}>
          <SmallLoading />
        </section>
      )}
    </PageLayout>
  );
}

export default ContentActivity;
