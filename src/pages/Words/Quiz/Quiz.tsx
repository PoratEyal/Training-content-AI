import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import route from "../../../router/route.json"
import styles from "./Quiz.module.css"
import PageLayout from "../../../components/Layout/PageLayout/PageLayout"
import LoadingQuiz from "../../../components/Loading/LoadingQuiz/LoadingQuiz"
import QuizContainer from "../../../components/SmartPractice/QuizContainer/QuizContainer"
import { ProductType } from "../../../context/ProductType"
import { useContentContext } from "../../../context/ContentContext"
import { enforcePageAccess } from "../../../utils/navigation"
import { speakText } from "../../../utils/speak"
import { WORDS_AD_SLOT } from "../../../models/constants/adsSlot"
import { ProductPages } from "../../../models/enum/pages"

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type Question = {
  question: string
  pronunciation?: string
  options: string[]
  correctAnswer: string
}

function Quiz() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const lang = (i18n.language || "en").slice(0, 2)
  const { currentPage, setCurrentPage } = useContentContext()

  const wordsHomePagePath = route[`wordsHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsHomePageEn
  const wordstopicPath = route[`wordsTopic${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsTopicEn

  const [fullCycle, setFullCycle] = useState<Question[]>([])
  const [currentCycle, setCurrentCycle] = useState<Question[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([])
  const [done, setDone] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  useEffect(() => {
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_WordsQuiz, navigate, wordsHomePagePath)
  }, [])

  useEffect(() => {
    const raw = sessionStorage.getItem("wordsQuizRaw")
    if (!raw) {
      navigate(wordsHomePagePath)
      return
    }
    const parsedRaw = JSON.parse(raw)
    const prepared: Question[] = parsedRaw
      .filter((item: any) => item.correct && item.text)
      .map((item: any) => {
        const allOptions = shuffleArray([
          item.correct,
          item.dist1,
          item.dist2,
          item.dist3
        ].filter(Boolean))
        return {
          question: item.text,
          pronunciation: item.pronunciation,
          correctAnswer: item.correct,
          options: allOptions
        }
      })

    const shuffled = shuffleArray(prepared)
    setFullCycle(shuffled)
    setCurrentCycle(shuffled)
    setCurrentIdx(0)
    setSelected(null)
    setWrongQuestions([])
    setCorrectCount(0)
    setDone(false)
  }, [lang])

const handleSelect = (idx: number) => {
  if (selected !== null) return

  setSelected(idx)

  const currentQ = currentCycle[currentIdx]
  const selectedAnswer = currentQ.options[idx]
  const isCorrect = selectedAnswer === currentQ.correctAnswer

  if (isCorrect) {
    setCorrectCount(prev => prev + 1)
  }
}

const handleNext = () => {

  const currentQ = currentCycle[currentIdx]

  const selectedAnswer = currentQ.options[selected]
  const isWrong = selectedAnswer !== currentQ.correctAnswer

  if (isWrong) {
    setWrongQuestions(prev => [...prev, currentQ])
  }

  if (currentIdx < currentCycle.length - 1) {
    setCurrentIdx(currentIdx + 1)
    setSelected(null)
  } else {
    if (wrongQuestions.length === 0 && !isWrong) {
      setDone(true)
    } else {
      const next = isWrong ? [...wrongQuestions, currentQ] : [...wrongQuestions]
      const reshuffled = next.map(q => ({
        ...q,
        options: shuffleArray(q.options)
      }))
      setCurrentCycle(reshuffled)
      setWrongQuestions([])
      setCurrentIdx(0)
      setSelected(null)
    }
  }
}


  const handleRestart = () => {
    const reshuffled = shuffleArray(fullCycle).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }))
    setCurrentCycle(reshuffled)
    setCurrentIdx(0)
    setSelected(null)
    setWrongQuestions([])
    setCorrectCount(0)
    setDone(false)
  }

  const q = currentCycle[currentIdx]
  const letters = {
    he: ["א", "ב", "ג", "ד"],
    ar: ["أ", "ب", "ج", "د"],
    es: ["A", "B", "C", "D"],
    en: ["A", "B", "C", "D"]
  }[lang] || ["-", "-", "-", "-"]

  const progressPercent = fullCycle.length > 0 ? Math.round((correctCount / fullCycle.length) * 100) : 0
  const quizLang = sessionStorage.getItem("wordsQuizLang") || "en"

  return (
    <PageLayout
      id="wordsQuiz"
      productType={ProductType.Words}
      hasHeader={{ goBack: () => navigate(wordstopicPath), hasTitle: t("words.quiz.pageTitle") }}
      hasAds={WORDS_AD_SLOT}
      hasGreenBackground
      hasNavBar
      index={false}
    >
      {!q && !done ? (
        <LoadingQuiz />
      ) : done ? (
        <QuizContainer>
          <div className={styles.retryFabContainer}>
            <button onClick={handleRestart} className={`${styles.retryFab} ${styles.retryBtn}`}>
              {t("words.quiz.newPractice")}
            </button>
            <button onClick={() => navigate(wordsHomePagePath)} className={`${styles.retryFab} ${styles.doneBtn}`}>
              {t("words.quiz.donePractice")}
            </button>
          </div>
        </QuizContainer>
      ) : (
        <QuizContainer>
          <div className={styles.questionBlock}>
            <div className={styles.questionText}>
              <span
                onClick={() => speakText(q.question, quizLang)}
                className={styles.speakerIcon}
                role="button"
                title={t("words.quiz.speak")}
              >
                🔊
              </span>{" "}
              {q.question}
              {q.pronunciation && (
                <span className={styles.pronunciation}> ({q.pronunciation})</span>
              )}
            </div>
            <ul className={styles.optionList}>
              {q.options.map((opt, idx) => {
                const isSelected = selected === idx
                const isCorrect = opt === q.correctAnswer
                const isWrong = isSelected && !isCorrect

                return (
                  <li
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`${styles.optionItem} ${isCorrect && selected !== null ? styles.optionCorrect : ""} ${isWrong ? styles.optionWrong : ""} ${isSelected ? styles.optionSelected : ""}`}
                  >
                    <span className={isCorrect && selected !== null ? styles.correctBold : ""}>
                      {`${letters[idx]}. ${opt}`}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className={styles.circularProgressWrapper}>
            <svg className={styles.circularProgress} viewBox="0 0 36 36">
              <path
                className={styles.bg}
                d="M18 2.0845         a 15.9155 15.9155 0 0 1 0 31.831         a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={styles.fg}
                strokeDasharray={`${progressPercent}, 100`}
                d="M18 2.0845         a 15.9155 15.9155 0 0 1 0 31.831         a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className={styles.percentage}>
                {progressPercent}%
              </text>
            </svg>
          </div>

          <div className={styles.continueBtnContainer}>
            <button onClick={handleNext} className={styles.continueBtn}>
              {t("common.btnContinue")}
            </button>
          </div>

        </QuizContainer>
      )}
    </PageLayout>
  )
}

export default Quiz
