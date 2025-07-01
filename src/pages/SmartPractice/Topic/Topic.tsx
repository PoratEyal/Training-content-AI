import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";
import route from "../../../router/route.json";
import styles from "./Topic.module.css";
import MainBtn from "../../../components/MainBtn/MainBtn";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import LoadingQuiz from "../../../components/Loading/LoadingQuiz/LoadingQuiz";
import { ProductType } from "../../../context/ProductType";
import { useNotificationContext } from "../../../context/NotificationContext";
import { PRACTICE_AD_SLOT } from "../../../models/constants/adsSlot";
import { createQuiz } from "../../../hooks/useQuestions";
import { logEvent } from "../../../utils/logEvent";
import { ProductPages } from "../../../models/enum/pages";
import { enforcePageAccess } from "../../../utils/navigation";
import { useContentContext } from "../../../context/ContentContext";

type QuizItem = {
  question: string;
  correct: string;
  dist1: string;
  dist2: string;
  dist3: string;
};

function Topic() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [topic, setTopic] = useState(() => localStorage.getItem("practiceTopic") || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentPage, setCurrentPage } = useContentContext();
  const { notifyAlert } = useNotificationContext();

  const practiceHomePagePath = route[`practiceHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceHomePageEn;
  const practiceQuizPath = route[`practiceQuiz${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceQuizEn;

  const goBack = () => {
    navigate(practiceHomePagePath);
  };

  useEffect(() => {
    // Prevent direct access via URL
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_PracticeTopic, navigate, practiceHomePagePath);
  }, []);

  useEffect(() => {
    return () => {
      localStorage.setItem("practiceTopic", topic);
    };
  }, [topic]);


  // Step 2: Clean raw Gemini JSON output
  // Cleans up code block formatting from Gemini JSON response before parsing
  function cleanJson(text: string): string {
    return text
      .replace(/^```json\s*/, "")
      .replace(/^```\s*/, "")
      .replace(/```$/, "")
      .trim();
  }

  // Step 3: Remove duplicates and normalize structure
  function removeDuplicateQ_A(items: any[]): QuizItem[] {
    const seenQuestions = new Set<string>();
    const normalize = (s: string) => s?.trim?.().toLowerCase?.();

    return items
      .filter((item) => {
        const q = item.question?.trim();
        if (!q || seenQuestions.has(q)) return false;
        seenQuestions.add(q);
        return true;
      })
      .map((item) => {
        const correct = item.correct?.trim();
        const distractors = [item.dist1, item.dist2, item.dist3]
          .map(d => d?.trim())
          .filter(d => d && normalize(d) !== normalize(correct));

        const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
        const [dist1 = "", dist2 = "", dist3 = ""] = uniqueDistractors;

        return {
          question: item.question?.trim() || "",
          correct,
          dist1,
          dist2,
          dist3
        };
      });
  }

  // Step 1: Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const raw = await createQuiz(topic, lang, 10);
      const cleanedJsonStr = cleanJson(raw);
      const parsed = JSON.parse(cleanedJsonStr);
      const final = removeDuplicateQ_A(parsed);
      setLoading(false);

      sessionStorage.setItem("practiceQuiz", JSON.stringify(final));
      navigate(practiceQuizPath);

    } catch (err) {
      setLoading(false);
      const auth = getAuth();
      const user = auth.currentUser;
      const userEmail = user?.email || "guest";
      notifyAlert(t("practice.topic.error"));
      logEvent(`[Practice.Topic]: createQuiz failed, topic: ${topic}`, userEmail);
    }
  };

  return (
    <>
      <PageLayout
        id="practiceTopic"
        productType={ProductType.Practice}
        hasGreenBackground
        hasHeader={{ goBack, hasTitle: t("practice.topic.title") }}
        hasAds={PRACTICE_AD_SLOT}
        hasNavBar
        index={false}
      >
        <form onSubmit={handleSubmit} className={styles.topic_form_container}>
          <input
            id="topicInput"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t("practice.topic.topicPlaceholder")}
            className={styles.input}
          />

          <label className={styles.examples_label}>
            {t("practice.topic.examples")}
          </label>

          <div className={styles.button_wrapper}>
            <MainBtn
              text={loading ? t("practice.topic.btnCreating") : t("practice.topic.btnCreate")}
              isDisabled={!topic.trim() || loading}
              type="submit"
              height={42}
              func={handleSubmit}
            />
          </div>
        </form>
      </PageLayout>

      {loading && <LoadingQuiz />}
    </>
  );
}

export default Topic;
