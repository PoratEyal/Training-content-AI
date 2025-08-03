//
// This is the AI Generated Activity page, which displays a single activity article or the activity editor (if in edit mode).
//
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActivityArticle from "../../../components/ActivityArticle/ActivityArticle";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import RichTextEditor from "../../../components/RichTextEditor/RichTextEditor";
import { useAuthContext } from "../../../context/AuthContext";
import { useContentContext } from "../../../context/ContentContext";
import { useEditorContext } from "../../../context/EditorContext";
import { ProductType } from "../../../context/ProductType";
import { useLanguage } from "../../../i18n/useLanguage";
import { EVENT_AD_SLOT } from "../../../models/constants/adsSlot";
import { helmetJson } from "../../../models/resources/helmet";
import route from "../../../router/route.json";
import { ProductPages } from "../../../models/enum/pages";
import { enforcePageAccess } from "../../../utils/navigation";


function Activity() {

  const { mainActivity, currentPage, setCurrentPage } = useContentContext();
  const { isEdit, readOnlyMode } = useEditorContext();
  const { isLoggedIn, currentUser } = useAuthContext();
  const [newActivity, setNewActivity] = useState(false);
  const activityRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const eventHomePagePath = route[`eventHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.eventHomePageEn;
  const eventBuildPath = route[`eventBuild${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.eventBuildEn;

  const goBack = () => {
    navigate(eventBuildPath);
  };

  useEffect(() => { // Prevent direct access via URL
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_EventActivity, navigate, eventHomePagePath);
  }, []);

  useEffect(() => {
    if (newActivity && activityRef.current) {
      activityRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setNewActivity(false);
    }
  }, [newActivity]);

  return (
    <PageLayout
      id="eventActivity"
      productType={ProductType.Event}
      hasGreenBackground
      hasHeader={{ goBack, hasTitle: mainActivity?.subject || undefined }}
      title={helmetJson[lang].activity.title}
      hasAds={EVENT_AD_SLOT}
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
          hasCopy
          hasShare
          hasGame
        />
      )}
    </PageLayout>
  );
}

export default Activity;
