import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { MdTranslate } from "react-icons/md";
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
import { detectLanguage, SupportedLang } from "../../../utils/detectLanguage"
import { translateWord } from "../../../utils/translateWord"
import { useContentContext } from "../../../context/ContentContext"

function WordsVocab() {

  const originalRef = useRef<HTMLTextAreaElement>(null)
  const translatedRef = useRef<HTMLTextAreaElement>(null)

  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const navigate = useNavigate()
  const { currentPage, setCurrentPage } = useContentContext()
  const { handleAlert } = useNotificationContext();

  const wordsHomePagePath =
    route[`wordsHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsHomePageEn
  const wordsQuizPath =
    route[`wordsQuiz${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsQuizEn

  const [originalText, setOriginalText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [detectedLang, setDetectedLang] = useState<SupportedLang>("unknown")
  const [loading, setLoading] = useState(false)
  const [translating, setTranslating] = useState(false)

  useEffect(() => {
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_WordsVocab, navigate, wordsHomePagePath)

    const saved = localStorage.getItem("wordsInput")
    if (saved) {
      setOriginalText(saved)
      setDetectedLang(detectLanguage(saved))
    }

    const savedTranslated = localStorage.getItem("wordsTranslated")
    if (savedTranslated) {
      setTranslatedText(savedTranslated)
    }
  }, [])

  useEffect(() => {
    const original = originalRef.current
    const translated = translatedRef.current

    const isSyncing = { current: false }

    const syncScroll = (source: HTMLTextAreaElement, target: HTMLTextAreaElement) => {
      if (isSyncing.current) return
      isSyncing.current = true
      const ratio = source.scrollTop / (source.scrollHeight - source.clientHeight)
      target.scrollTop = ratio * (target.scrollHeight - target.clientHeight)
      // תן זמן לרנדר ואז אפס את הדגל
      setTimeout(() => {
        isSyncing.current = false
      }, 10)
    }

    if (original && translated) {
      const onOriginalScroll = () => syncScroll(original, translated)
      const onTranslatedScroll = () => syncScroll(translated, original)

      original.addEventListener("scroll", onOriginalScroll)
      translated.addEventListener("scroll", onTranslatedScroll)

      return () => {
        original.removeEventListener("scroll", onOriginalScroll)
        translated.removeEventListener("scroll", onTranslatedScroll)
      }
    }
  }, [])


  // Replaces the AI-generated correct Q&A in the quiz text with the accurate translations
  // LIOR: to improve and handle also replace of originalText in the AI generated quiz
  const applyTheOriginalQuestionsAnswersToAIresult = (quizRaw: string, originalText: string, translatedText: string): string => {

    const lines = quizRaw.split("\n")
    const correctAnswers = translatedText.split("\n").map((line) => line.trim())
    let currentQuestionIndex = -1

    const cleanedLines = lines.map((line) => {

      if (/^~\d+~/.test(line) && !line.includes("**")) {
        currentQuestionIndex++
      }

      if (!line.includes("**")) {            // If no **...** found, return line as is      
        return line
      }

      if (currentQuestionIndex < 0 || currentQuestionIndex >= correctAnswers.length) {  // If index is invalid, return line as is
        return line
      }

      // Replace text between **...** with accurate translation
      if (line.includes("**")) {
        const start = line.indexOf("**")
        const end = line.indexOf("**", start + 2)

        if (start !== -1 && end !== -1) {
          const accurate = correctAnswers[currentQuestionIndex] || line.slice(start + 2, end)
          const before = line.slice(0, start + 2)
          const after = line.slice(end)
          const replacedLine = `${before}${accurate}${after}`
          return replacedLine
        }
      }

      return line


    })

    return cleanedLines.join("\n")
  }

  // Cleans and filters out malformed questions from AI quiz output
  const sanitizeAIQuizOutput = (quizRaw: string, expectedQuestionCount: number): string => {

    const lines = quizRaw.split("\n")
    const sanitized: string[] = []

    let currentQuestion: string | null = null
    let currentAnswers: string[] = []
    let questionIndex = 0

    const flushQuestion = () => {
      if (!currentQuestion) return

      // --- validation ---
      const hasCorrectAnswer = currentAnswers.filter((l) => l.includes("**")).length === 1
      const hasFourAnswers = currentAnswers.length === 4
      const uniqueLabels = new Set(currentAnswers.map((line) => {
        const match = line.match(/^~([א-ת])~/)
        return match?.[1]
      }))

      const allHaveValidLabel = currentAnswers.every((line) => /^~[א-ת]~/.test(line))
      const allAnswersDifferent = new Set(currentAnswers.map((line) => line.replace(/\*\*/g, "").trim())).size === 4

      const isValid =
        hasCorrectAnswer &&
        hasFourAnswers &&
        allHaveValidLabel &&
        uniqueLabels.size === 4 &&
        allAnswersDifferent

      if (isValid) {
        sanitized.push(currentQuestion, ...currentAnswers)
        questionIndex++
      }

      currentQuestion = null
      currentAnswers = []
    }

    for (const line of lines) {
      if (/^~\d+~/.test(line)) {
        flushQuestion()
        currentQuestion = line.trim()
      } else if (/^~[א-ת]~/.test(line)) {
        currentAnswers.push(line.trim())
      }
    }

    flushQuestion() // flush last block

    return sanitized.join("\n")
  }

  const shuffleQuestions = (quizRaw: string): string => {
    const lines = quizRaw.split("\n")
    const questions: string[][] = []

    let currentBlock: string[] = []

    for (const line of lines) {
      if (/^~\d+~/.test(line)) {
        if (currentBlock.length > 0) {
          questions.push(currentBlock)
        }
        currentBlock = [line]
      } else if (line.trim() !== "") {
        currentBlock.push(line)
      }
    }

    if (currentBlock.length > 0) {
      questions.push(currentBlock)
    }

    // Fisher-Yates shuffle
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[questions[i], questions[j]] = [questions[j], questions[i]]
    }

    return questions.map((q) => q.join("\n")).join("\n")
  }

  const handleClearAll = () => {
    setOriginalText("")
    setTranslatedText("")
    localStorage.removeItem("wordsInput")
    localStorage.removeItem("wordsTranslated")
  }

  // Handle form submission and create Words Quiz
  const handleSubmit = async (e) => {
    e.preventDefault()

    const originalLines = originalText.split("\n").filter(line => line.trim() !== "")
    if (originalLines.length > 35) {
      handleAlert(t("wordsVocab.tooManyLines"));
      return
    }

    setLoading(true)
    const AI_quizFull = await createWordsQuiz(originalText, detectedLang, lang)
    setLoading(false)

    if (AI_quizFull) {
      localStorage.setItem("wordsInput", originalText)
      localStorage.setItem("wordsTranslated", translatedText)

      const sanitaizedText = sanitizeAIQuizOutput(AI_quizFull, originalText.split("\n").length)
      const textWithCorrcectAnswers = applyTheOriginalQuestionsAnswersToAIresult(sanitaizedText, originalText, translatedText)
      const shuffled = shuffleQuestions(textWithCorrcectAnswers)
      sessionStorage.setItem("wordsQuizRaw", shuffled)

      navigate(wordsQuizPath)
    } else {
      alert(t("topic.error"))
    }
  }


  const handleTranslateClick = async () => {
    setTranslating(true)

    const originalLines = originalText.split("\n").map((line) => line.trim())
    const currentTranslations = translatedText.split("\n")
    const detected = detectLanguage(originalText)

    const newTranslations: string[] = []

    for (let i = 0; i < originalLines.length; i++) {
      const original = originalLines[i]
      if (!original) {
        newTranslations.push("")
        continue
      }

      const existing = currentTranslations[i]?.trim()
      if (existing) {
        newTranslations.push(existing)
      } else {
        const translated = await translateWord(original, detected, lang)
        newTranslations.push(translated || "")
      }
    }

    const trimmedTranslations = newTranslations.slice(0, originalLines.length)

    setTranslatedText(trimmedTranslations.join("\n"))
    setOriginalText(originalLines.join("\n"))
    localStorage.setItem("wordsInput", originalLines.join("\n"))

    setTranslating(false)
  }



  return (
    <>
      <PageLayout
        id="wordsVocab"
        productType={ProductType.Words}
        hasGreenBackground
        hasHeader={{ goBack: () => navigate(wordsHomePagePath), hasTitle: t("wordsVocab.title") }}
        hasAds={WORDS_AD_SLOT}
        hasNavBar
        index={false}
      >
        <form onSubmit={handleSubmit} className={styles.topic_form_container}>
          <label htmlFor="wordsInput" className={styles.instructionsLabel}>
            {t("wordsVocab.instructions")}
          </label>
          <div className={styles.sideBySideWrapper}>
            <textarea
              ref={originalRef}
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className={styles.textarea}
              rows={14}
              placeholder={t("wordsVocab.Words2Translate")}
            />

            <div className={styles.translateControls}>
              <button
                type="button"
                className={`${styles.translateButton} ${translating ? styles.loading : ""}`}
                onClick={handleTranslateClick}
                disabled={translating || !originalText.trim()}
              >
                {translating ? "⏳" : <MdTranslate size={20} />}
              </button>

              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClearAll}
                disabled={translating || !originalText.trim()}
              >
                ❌
              </button>
            </div>


            <textarea
              ref={translatedRef}
              value={translatedText}
              onChange={(e) => setTranslatedText(e.target.value)}
              className={styles.textarea}
              rows={14}
              placeholder={t("wordsVocab.WordsTranslated")}
            />
          </div>

          <div className={styles.button_wrapper}>
            <MainBtn
              text={loading ? t("wordsVocab.btnCreating") : t("wordsVocab.btnCreate")}
              isDisabled={!originalText.trim() || !translatedText.trim() || loading}
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
