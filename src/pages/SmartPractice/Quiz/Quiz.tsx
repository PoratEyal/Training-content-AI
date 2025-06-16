import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import route from "../../../router/route.json"
import { useTranslation } from "react-i18next"
import PageLayout from "../../../components/Layout/PageLayout/PageLayout"
import QuizContainer from "../../../components/SmartPractice/QuizContainer/QuizContainer"
import { createQuiz } from "../../../hooks/useQuestions"
import LoadingQuiz from "../../../components/Loading/LoadingQuiz/LoadingQuiz"
import styles from "./Quiz.module.css"
import { PRACTICE_QUIZ_AD_SLOT } from "../../../models/constants/adsSlot"

type Question = {
  question: string
  options: string[]
  correctIndex: number
}

function Quiz() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const rawLang = i18n.language || "en"
  const lang = rawLang.slice(0, 2)

  const practiceHomePagePath = route[`practiceHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceHomePageEn
  const topicPath = route[`practiceTopic${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceTopicEn

  const goBack = () => {
    navigate(topicPath)
  }

  const [questions, setQuestions] = useState<Question[]>([])
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const topic = sessionStorage.getItem("practiceTopic") || ""

  const loadQuestionsFromRaw = (raw: string) => {
    const blocks = raw.split(/\n\s*\n/)
    const parsed: Question[] = blocks.map((block) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean)
      const question = lines[0]
      const rawOptions = lines.slice(1)
      const options = rawOptions.map((opt) => opt.replace(/\*\*/g, "").trim())
      const correctIndex = rawOptions.findIndex((opt) => opt.includes("**"))
      return { question, options, correctIndex }
    })

    setQuestions(parsed)
    setUserAnswers(new Array(parsed.length).fill(null))
    setSubmitted(false)
  }

  useEffect(() => {
    const raw = sessionStorage.getItem("practiceQuestions")
    if (!raw) {
      navigate(practiceHomePagePath)
      return
    }
    loadQuestionsFromRaw(raw)
  }, [navigate, lang])

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted) return
    const updated = [...userAnswers]
    updated[qIdx] = optIdx
    setUserAnswers(updated)
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleRegenerate = async () => {
    setLoading(true)
    const result = await createQuiz(topic, lang)
    setLoading(false)

    if (result) {
      sessionStorage.setItem("practiceQuestions", result)
      loadQuestionsFromRaw(result)
    } else {
      alert(t("quiz.FailMsg"))
    }
  }

  const correctCount = questions.reduce((sum, q, idx) => {
    return sum + (userAnswers[idx] === q.correctIndex ? 1 : 0)
  }, 0)

  return (
    <PageLayout
      id="practiceQuiz"
      projectType={"practice"}
      hasHeader={{ goBack, hasTitle: topic }}
      hasAds={PRACTICE_QUIZ_AD_SLOT}
      hasGreenBackground
      hasNavBar
      index={false}
    >
      {loading ? (
        <LoadingQuiz />
      ) : (
        <QuizContainer>
          {submitted && (
            <>
              <div className={`${styles.scoreStar} ${correctCount / questions.length < 0.5 ? styles.scoreRed : correctCount / questions.length < 0.7 ? styles.scoreYellow : styles.scoreGreen}`}>
                <div>{t("quiz.score")} {Math.round((correctCount / questions.length) * 100)}%</div>
              </div>

              <div className={styles.retryFabContainer}>
                <button onClick={handleRegenerate} className={styles.retryFab}>
                  {t("quiz.newPractice")}
                </button>
              </div>
            </>
          )}

          {questions.map((q, qIdx) => (
            <div key={qIdx} className={styles.questionBlock}>
              <div className={styles.questionText}>{q.question}</div>
              <ul className={styles.optionList}>
                {q.options.map((opt, optIdx) => {
                  const selectedIndex = userAnswers[qIdx]
                  const isSelected = selectedIndex === optIdx
                  const isAnswered = selectedIndex !== null
                  const isCorrectAnswer = submitted && q.correctIndex === optIdx
                  const isCorrectSelection = submitted && isAnswered && isSelected && optIdx === q.correctIndex
                  const isWrongSelection = submitted && isAnswered && isSelected && optIdx !== q.correctIndex

                  return (
                    <li
                      key={optIdx}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`${styles.optionItem} ${isCorrectSelection
                        ? styles.optionCorrect
                        : isWrongSelection
                          ? styles.optionWrong
                          : isSelected
                            ? styles.optionSelected
                            : ""
                        }`}
                    >
                      <span className={isCorrectAnswer ? styles.correctBold : ""}>
                        {opt}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {!submitted && (
            <div className={styles.checkBtnContainer}>
              <button onClick={handleSubmit} className={styles.checkBtn}>{t("quiz.check")}</button>
            </div>
          )}
        </QuizContainer>
      )}
    </PageLayout>
  )
}

export default Quiz
