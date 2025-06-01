//
// This is the AI Generated Activity page, which displays a single activity article or the activity editor (if in edit mode).
// It validates that all required activity data is present (grade, movement, main activity) before rendering.
// If no data is found, it navigates back to the activity parameters page.
//
import { useRef, useState, useEffect } from "react";
import { useContentContext } from "../../context/ContentContext";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";
import { ACTIVITY_AD_SLOT } from "../../models/constants/adsSlot";
import ActivityArticle from "../../components/ActivityArticle/ActivityArticle";
import { useAuthContext } from "../../context/AuthContext";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import { useEditorContext } from "../../context/EditorContext";
import { helmetJson } from "../../models/resources/helmet";
import route from "../../router/route.json";
import { useLanguage } from "../../i18n/useLanguage";

function Activity() {
  const { data, mainActivity } = useContentContext();
  const { isEdit, readOnlyMode } = useEditorContext();
  const { isLoggedIn } = useAuthContext();
  const [newActivity, setNewActivity] = useState(false);
  const activityRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { lang } = useLanguage();

  // Determine language-specific paths (fallback to He if missing)
  const AI_activityContentPath = route[`AI_activityContent${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.AI_activityContentHe;
  const AI_activityParamsPath = route[`AI_activityParams${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.AI_activityParamsHe;


  const goBack = () => {
    if (isEdit) {
      readOnlyMode();
    } else {
      navigate(AI_activityParamsPath);
    }
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
    <PageLayout
      id="activity"
      path={AI_activityContentPath}
      hasGreenBackground
      hasHeader={{ goBack, hasTitle: mainActivity?.subject || undefined }}
      title={helmetJson[lang].activity.title}
      hasAds={ACTIVITY_AD_SLOT}
      hasNavBar
      index={false}
    >
      {isEdit ? (
        <RichTextEditor activity={mainActivity} />
      ) : (
        <ActivityArticle
          activity={mainActivity}
          activityRef={activityRef}
          hasSave={isLoggedIn}
          hasEdit={isLoggedIn}
          hasCopy
          hasShare
        />
      )}
    </PageLayout>
  );
}

export default Activity;
