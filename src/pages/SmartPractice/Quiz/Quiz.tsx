import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import route from "../../../router/route.json"
import styles from "./Quiz.module.css"
import PageLayout from "../../../components/Layout/PageLayout/PageLayout"
import LoadingQuiz from "../../../components/Loading/LoadingQuiz/LoadingQuiz"
import QuizContainer from "../../../components/SmartPractice/QuizContainer/QuizContainer"
import { Icons } from "../../../components/Icons"
import { ProductType } from "../../../context/ProductType"
import { useContentContext } from "../../../context/ContentContext"
import { enforcePageAccess } from "../../../utils/navigation"
import { PRACTICE_AD_SLOT } from "../../../models/constants/adsSlot"
import { ProductPages } from "../../../models/enum/pages"

interface QuizItem {
  question: string
  correct: string
  dist1: string
  dist2: string
  dist3: string
}
interface Question {
  question: string
  options: string[]
  correctIndex: number
}

function Quiz() {

  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const rawLang = i18n.language || "en"
  const lang = rawLang.slice(0, 2)
  const { currentPage, setCurrentPage } = useContentContext()

  const practiceHomePagePath = route[`practiceHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceHomePageEn
  const practiceTopicPath = route[`practiceTopic${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.practiceTopicEn

  const goBack = () => navigate(practiceTopicPath)

  const [questions, setQuestions] = useState<Question[]>([])
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [showScore, setShowScore] = useState(true)
  const [loading, setLoading] = useState(false)

  const topic = localStorage.getItem("practiceTopic") || ""

  useEffect(() => {
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_PracticeQuiz, navigate, practiceHomePagePath)
  }, [])

  useEffect(() => {
    const raw = sessionStorage.getItem("practiceQuiz")
    if (!raw) {
      navigate(practiceHomePagePath)
      return
    }

    const items: QuizItem[] = JSON.parse(raw)
    const parsed: Question[] = items.map(({ question, correct, dist1, dist2, dist3 }) => {
      const options = shuffleArray([correct, dist1, dist2, dist3])
      return {
        question,
        options,
        correctIndex: options.indexOf(correct)
      }
    })

    setQuestions(parsed)
    setUserAnswers(new Array(parsed.length).fill(null))
  }, [lang, navigate])


  const shuffleArray = <T,>(arr: T[]): T[] => {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted) return
    const updated = [...userAnswers]
    updated[qIdx] = optIdx
    setUserAnswers(updated)
  }

  const handleSubmit = () => setSubmitted(true)

  const correctCount = questions.reduce((sum, q, idx) => {
    return sum + (userAnswers[idx] === q.correctIndex ? 1 : 0)
  }, 0)

  const lettersMap: Record<string, string[]> = {
    he: ['א', 'ב', 'ג', 'ד'],
    ar: ['أ', 'ب', 'ج', 'د'],
    es: ['A', 'B', 'C', 'D'],
    en: ['A', 'B', 'C', 'D']
  }
  const letters = lettersMap[lang] || ['-', '-', '-', '-']

  const getScoreImage = () => {
    const score = Math.round((correctCount / questions.length) * 100);
    let category = "";

    if (score <= 55) category = "Fail";
    else if (score <= 79) category = "Pass";
    else category = "Success";

    const random = Math.floor(Math.random() * 3) + 1;
    return `/Practice/score${category}${random}.png`;
  };

  return (
    <PageLayout
      id="practiceQuiz"
      productType={ProductType.Practice}
      hasHeader={{ goBack, hasTitle: topic }}
      hasAds={PRACTICE_AD_SLOT}
      hasGreenBackground
      hasNavBar
      index={false}
    >
      {loading ? (
        <LoadingQuiz />
      ) : (
        <QuizContainer>
          {submitted && showScore && (
            <div className={styles.scoreOverlay}>
              <div className={styles.scoreBoxContainer}>

                <button
                  onClick={() => setShowScore(false)}
                  className={styles.scoreCloseBtn}
                >
                  <Icons.cancel className={styles.scoreCloseIcon} />
                </button>

                <div className={styles.scoreTitle}>
                  {t("practice.quiz.score")}
                  {" "}
                  {Math.round((correctCount / questions.length) * 100)}%
                </div>

                <div className={styles.scoreImageContainer}>
                  <img
                    src={getScoreImage()}
                    alt="score result"
                    className={styles.scoreImage}
                  />
                </div>


                <div className={styles.retryBtnContainer}>
                  <button
                    onClick={() => {
                      sessionStorage.removeItem("practiceQuiz")
                      navigate(practiceTopicPath)
                    }}
                    className={styles.retryBtn}
                  >
                    {t("practice.quiz.newPractice")}
                  </button>
                </div>

              </div>
            </div>
          )}


          {questions.map((q, qIdx) => (
            <div key={qIdx} className={styles.questionBlock}>
              <div className={styles.questionText}>{`${qIdx + 1}. ${q.question}`}</div>
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
                        {`${letters[optIdx]}. ${opt}`}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          <div className={styles.checkBtnContainer}>
            <button
              onClick={() => {
                if (!submitted) {
                  handleSubmit()
                } else {
                  sessionStorage.removeItem("practiceQuiz")
                  navigate(practiceTopicPath)
                }
              }}
              className={styles.checkBtn}
            >
              {submitted ? t("practice.quiz.newPractice") : t("practice.quiz.check")}
            </button>
          </div>


        </QuizContainer>
      )}
    </PageLayout>
  )
}

export default Quiz
