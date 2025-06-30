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


function Topic() {

  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { currentPage, setCurrentPage } = useContentContext();
  const { notifyAlert: notifyAlert } = useNotificationContext();

  const practiceHomePagePath = route[`practiceHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceHomePageEn;
  const practiceQuizPath = route[`practiceQuiz${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceQuizEn;
  const goBack = () => { navigate(practiceHomePagePath); };

  useEffect(() => { // Prevent direct access via URL
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_PracticeTopic, navigate, practiceHomePagePath);
  }, []);

  // Checks if the given text contains at least one valid multiple-choice question block.
  // Because if the request was invalid and the model returns a general message saying a quiz can't be generated, we want to display that message to the user.
  const isValidQuiz = (text: string): boolean => {
    const blocks = text.split(/~\d+~/).map(b => b.trim()).filter(Boolean)

    const validCount = blocks.filter(block => {
      const lines = block.split(/\n/).map(line => line.trim()).filter(Boolean)
      if (!lines[0]) return false

      const options = lines.slice(1).filter(line => /~[א-דA-Dأ-د]~/.test(line))
      const hasCorrect = lines.some(line => /\*\*/.test(line))

      return options.length === 4 && hasCorrect
    }).length

    return validCount > 0
  }


  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)
    const result = await createQuiz(topic, lang, 10)  // LIOR: TO MAKE IT JSON
    setLoading(false)

    if (result) {
      if (!isValidQuiz(result)) {
        notifyAlert(t("practice.topic.topicError"));
        return
      }

      sessionStorage.setItem("practiceQuestions", result)
      sessionStorage.setItem("practiceTopic", topic)

      navigate(practiceQuizPath)
    } else {
      const auth = getAuth();
      const user = auth.currentUser;
      const userEmail = user?.email || "guest";
      notifyAlert(t("practice.topic.error"));
      logEvent(`[Practice.Topic]: createQuiz failed, topic: ${topic}`, userEmail);
    }
  }

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
  )
}

export default Topic
