import styles from "./Topic.module.css"
import route from "../../../router/route.json"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PageLayout from "../../../components/Layout/PageLayout/PageLayout"
import MainBtn from "../../../components/MainBtn/MainBtn"
import { createQuiz } from "../../../hooks/useQuestions"
import { useTranslation } from "react-i18next"
import { PRACTICE_TOPIC_AD_SLOT } from "../../../models/constants/adsSlot"
import LoadingQuiz from "../../../components/Loading/LoadingQuiz/LoadingQuiz"

function Topic() {

  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const topicPath = route[`practiceTopic${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceTopicEn;
  const quizPath = route[`practiceQuiz${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceQuizEn;

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!topic.trim()) return

    setLoading(true)
    const result = await createQuiz(topic, lang)
    setLoading(false)

    if (result) {
      sessionStorage.setItem("smartPracticeQuestions", result)
      sessionStorage.setItem("smartPracticeTopic", topic)
      navigate(quizPath)
    } else {
      alert(t("topic.error"))
    }
  }

  return (
    <>
      <PageLayout
        id="practiceTopic"
        path={topicPath}
        hasGreenBackground
        hasHeader={{ hasTitle: t("topic.title") }}
        hasAds={PRACTICE_TOPIC_AD_SLOT}
        title="SmartPractice"
        hasNavBar
        index={false}
      >
        <form onSubmit={handleSubmit} className={styles.topic_form_container}>
          <label htmlFor="topicInput" className={styles.label}>
            {t("topic.labelPractice")}
          </label>
          <br />
          <input
            id="topicInput"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t("topic.topicPlaceholder")}
            className={styles.input}
          />

          <label className={styles.examples_label}>
            {t("topic.examples")}
          </label>

          <div className={styles.button_wrapper}>
            <MainBtn
              text={loading ? t("topic.btnCreating") : t("topic.btnCreate")}
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
