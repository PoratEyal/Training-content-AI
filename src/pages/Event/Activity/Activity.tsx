import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActivityArticle from "../../../components/ActivityArticle/ActivityArticle";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import { ProductType } from "../../../context/ProductType";
import { useContentContext } from "../../../context/ContentContext"
import { useLanguage } from "../../../i18n/useLanguage";
import { EVENT_AD_SLOT } from "../../../models/constants/adsSlot";
import { helmetJson } from "../../../models/resources/helmet";
import route from "../../../router/route.json";
import { StorageKey } from "../../../models/enum/storage";
import { ProductPages } from "../../../models/enum/pages";
import { enforcePageAccess } from "../../../utils/navigation";
import { logEvent } from "../../../utils/logEvent";
import { useAuthContext } from "../../../context/AuthContext"

const jsonToMarkdownEvent = (raw: string, t: (key: string) => string): string => {
  try {
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    const data = JSON.parse(cleaned);

    let result = `### ${data.title}\n\n`;
    result += `### ${t("event.Activity.json.summary")}:\n\n${data.summary}\n\n`;

    if (Array.isArray(data.materials) && data.materials.some(item => item.trim() !== "")) {
      result += `### ${t("event.Activity.json.materials")}:\n\n`;
      for (const item of data.materials) {
        if (item.trim() !== "") {
          result += `* ${item}\n`;
        }
      }
      result += `\n`;
    }

    if (Array.isArray(data.flow)) {
      result += `### ${t("event.Activity.json.flow")}:\n\n`;
      for (const section of data.flow) {
        result += `1. **${section.title}**\n`;
        result += `   ${section.description}\n`;
        if (section.duration) {
          result += `   (${section.duration})\n`;
        }
        result += `\n`;
      }
    }

    if (Array.isArray(data.tips) && data.tips.some(tip => tip.trim() !== "")) {
      result += `### ${t("event.Activity.json.tips")}:\n\n`;
      for (const tip of data.tips) {
        if (tip.trim() !== "") {
          result += `* ${tip}\n`;
        }
      }
    }


    return result.trim();
  } catch (err) {
    logEvent(`[eventActivity]: "The result was too long and trancated by geminiAPI.ts"`, "");
    return t("common.errorMsg") || "Invalid event format.";
  }
};


function Activity() {

  const [activityData, setActivityData] = useState<any>(null);
  const activityRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const { currentPage, setCurrentPage } = useContentContext()
  const { currentUser } = useAuthContext()

  const eventHomePagePath = route[`eventHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.eventHomePageEn;
  const eventBuildPath = route[`eventBuild${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.eventBuildEn;

  const goBack = () => {
    navigate(eventBuildPath);
  };

  useEffect(() => {
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_EventActivity, navigate, eventHomePagePath);
  }, []);

  useEffect(() => {
    const rawEventDetails = sessionStorage.getItem(StorageKey.EVENT_DETAILS);
    const rawEventActivity = sessionStorage.getItem(StorageKey.EVENT_ACTIVITY);

    let eventDetails = null;
    if (rawEventDetails) {
      try {
        eventDetails = JSON.parse(rawEventDetails);
      } catch (e) {
        logEvent(`[eventActivity]: "Invalid eventDetails:", e}`, currentUser?.email);
      }
    }

    if (rawEventActivity) {
      try {
        const parsed = JSON.parse(rawEventActivity);
        const markdown = jsonToMarkdownEvent(parsed, t);
        setActivityData({ result: markdown, eventDetails });
      } catch (e) {
        logEvent(`[eventActivity]: "Invalid eventActivity:", e}`, currentUser?.email);
      }
    }
  }, []);



  return (
    <PageLayout
      id="eventActivity"
      productType={ProductType.Event}
      hasGreenBackground
      hasHeader={{ goBack, hasTitle: `${activityData?.eventDetails?.event || ""}`.trim() }}
      title={helmetJson[lang].activity.title}
      hasAds={EVENT_AD_SLOT}
      hasNavBar
      index={false}
    >
      {activityData && (
        <ActivityArticle
          activity={{
            id: "event-preview",
            activity: activityData.result,
            createdAt: new Date().toISOString(),
            savedAt: null, fetchCount: 0, category: "content",
            subject: `${t("event.Activity.activity")} ${activityData?.eventDetails?.event || ""}`.trim(),
            gender: "", amount: "",
            place: "", time: "", tools: "", religion: "", grade: "", userId: "", likes: 0,
          }}
          activityRef={activityRef}
          hasSave={false}
          hasCopy
          hasShare
          hasGame
        />
      )}
    </PageLayout>
  );
}

export default Activity;
