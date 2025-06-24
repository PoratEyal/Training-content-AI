import MainBtn from "../../../components/MainBtn/MainBtn"
import PageLayout from "../../../components/Layout/PageLayout/PageLayout"
import LoadingQuiz from "../../../components/Loading/LoadingQuiz/LoadingQuiz"
import { useAuthContext } from "../../../context/AuthContext"
import { ProductType } from "../../../context/ProductType"
import { PRACTICE_TOPIC_AD_SLOT } from "../../../models/constants/adsSlot"
import { createQuiz } from "../../../hooks/useQuestions"
import { logEvent } from "../../../utils/logEvent"
import route from "../../../router/route.json"
import { getAuth } from "firebase/auth"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from "./Topic.module.css"

function Topic() {

  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { currentUser} = useAuthContext();

  const practiceHomePagePath = route[`practiceHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceHomePageEn;
  const practiceQuizPath = route[`practiceQuiz${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceQuizEn;
  const goBack = () => { navigate(practiceHomePagePath); };

//  useEffect(() => { // Prevent direct access via URL
//    if (!currentUser) {
//      navigate(practiceHomePagePath);
//    }
//  }, [currentUser, navigate]);

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
    if (!topic.trim()) return

    setLoading(true)
    const result = await createQuiz(topic, lang, 10)
    setLoading(false)

    if (result) {
      if (!isValidQuiz(result)) {
        alert(t("topic.topicError"));
        return
      }

      sessionStorage.setItem("practiceQuestions", result)
      sessionStorage.setItem("practiceTopic", topic)

      navigate(practiceQuizPath)
    } else {
      const auth = getAuth();
      const user = auth.currentUser;
      const userEmail = user?.email || "guest";
      logEvent(`[Practice.Topic]: createQuiz failed, topic: ${topic}`, userEmail);
      alert(t("topic.error"));
    }
  }

  return (
    <>
      <PageLayout
        id="practiceTopic"
        productType={ProductType.Practice}
        hasGreenBackground
        hasHeader={{ goBack, hasTitle: t("topic.title") }}
        hasAds={PRACTICE_TOPIC_AD_SLOT}
        hasNavBar
        index={false}
      >
        <form onSubmit={handleSubmit} className={styles.topic_form_container}>
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
