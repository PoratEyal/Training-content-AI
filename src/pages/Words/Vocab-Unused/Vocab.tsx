import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import route from "../../../router/route.json"
import styles from "./Vocab.module.css"
import { useNotificationContext } from "../../../context/NotificationContext";
import MainBtn from "../../../components/MainBtn/MainBtn"
import PageLayout from "../../../components/Layout/PageLayout/PageLayout"
import LoadingQuiz from "../../../components/Loading/LoadingQuiz/LoadingQuiz"
import { ProductType } from "../../../context/ProductType"
import { WORDS_AD_SLOT } from "../../../models/constants/adsSlot"
import { createWordsQuiz } from "../../../hooks/useWordsQuestions"
import { ProductPages } from "../../../models/enum/pages"
import { enforcePageAccess } from "../../../utils/navigation"
import { SupportedLang } from "../../../utils/detectLanguage"
import { logEvent } from "../../../utils/logEvent";
import { useContentContext } from "../../../context/ContentContext"

// --- Merges AI distractors and predefined jsons ---
function mergeQuizData(baseData, distractorList, lang) {
  const langKey = lang.toLowerCase()
  const translateKey = `${langKey}_Translate`
  const pronKey = `${langKey}_Pronunciation`

  return baseData
    .map((item, index) => {
      const dist = distractorList[index] || {}
      const allAnswers = [
        item[translateKey] || "",
        dist.dist1 || "",
        dist.dist2 || "",
        dist.dist3 || "",
      ]
      const uniqueAnswers = Array.from(new Set(allAnswers.filter(Boolean)))
      const correct = item[translateKey] || ""
      if (!uniqueAnswers.includes(correct)) uniqueAnswers.unshift(correct)
      return {
        text: item.text || "",
        pronunciation: item[pronKey] || "",
        correct,
        dist1: uniqueAnswers[1] || "",
        dist2: uniqueAnswers[2] || "",
        dist3: uniqueAnswers[3] || "",
      }
    })
    .filter(item => {
      const opts = [item.correct, item.dist1, item.dist2, item.dist3].filter(Boolean)
      const unique = new Set(opts)
      return unique.size >= 2
    })
}

function WordsVocab() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const navigate = useNavigate()
  const { currentPage, setCurrentPage } = useContentContext()
  const { notifyAlert } = useNotificationContext();

  const wordsHomePagePath = route[`wordsHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsHomePageEn
  const wordsTopicPath = route[`wordsTopic${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsTopicEn
  const wordsQuizPath = route[`wordsQuiz${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsQuizEn

  const location = useLocation()
  const topicValue = location.state?.topicValue

  const [originalText, setOriginalText] = useState("")
  const [detectedLang, setDetectedLang] = useState<SupportedLang>("unknown")
  const [loading, setLoading] = useState(false)
  const [topicDataJSON, setTopicData] = useState([])

  useEffect(() => {
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_WordsVocab, navigate, wordsHomePagePath)
  }, [])

  // load and display the words based on the selected topic
  useEffect(() => {
    if (!topicValue) return

    const fetchWordsFile = async () => {
      try {
        const response = await fetch(`/Words/${topicValue}.json`)
        if (!response.ok) {
          logEvent(`[Words.Vocab.useEffect]: ${topicValue} not found`, "systemError")
          return
        }

        const data = await response.json()
        const { sourceLang, items } = data

        if (!Array.isArray(items) || !sourceLang) {
          logEvent(`[Words.Vocab.useEffect]: Invalid structure in /Words/${topicValue}.json`, "systemError")
          return
        }

        const extractedText = items.map((item) => item.text).filter(Boolean).join("\n")
        setOriginalText(extractedText)
        setTopicData(items)
        setDetectedLang(sourceLang)

      } catch (err) {
        notifyAlert(t("wordsVocab.loadListError"))
      }
    }

    fetchWordsFile()
  }, [topicValue])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const originalLines = originalText.split("\n").filter(line => line.trim() !== "")
    if (originalLines.length > 35) {
      notifyAlert(t("wordsVocab.tooManyLines"));
      return
    }

    setLoading(true)
    const AI_distructors = await createWordsQuiz(originalText, detectedLang, lang)
    setLoading(false)

    if (AI_distructors && topicDataJSON.length) {
      const AI_distructorsCleaned = AI_distructors
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const distractorsJSON = JSON.parse(AI_distructorsCleaned)
      const mergedQuiz = mergeQuizData(topicDataJSON, distractorsJSON, lang)
      sessionStorage.setItem("wordsQuizRaw", JSON.stringify(mergedQuiz))
      sessionStorage.setItem("wordsQuizLang", detectedLang)

      navigate(wordsQuizPath)
    } else {
      notifyAlert(t("words.topic.generalError"))
    }
  }

  const translateKey = `${lang}_Translate`

  return (
    <>
      <PageLayout
        id="wordsVocab"
        productType={ProductType.Words}
        hasGreenBackground
        hasHeader={{ goBack: () => navigate(wordsTopicPath), hasTitle: t("words.vocab.pageTitle") }}
        hasAds={WORDS_AD_SLOT}
        hasNavBar
        index={false}
      >
        <form onSubmit={handleSubmit} className={styles.topic_form_container}>

          <label htmlFor="wordsInput" className={styles.listLabel}>
            {t("words.vocab.instructions")}
          </label>

          <div className={styles.tableWrapper}>
            <table className={styles.wordsTable}>
              <tbody>
                {topicDataJSON.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.text}</td>
                    <td>{item[translateKey]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.button_wrapper}>
            <MainBtn
              text={loading ? t("words.vocab.btnCreating") : t("words.vocab.btnCreate")}
              isDisabled={!originalText.trim() || loading}
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

export default WordsVocab
