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
import { ProductType } from "../../../context/ProductType"
import { Icons } from "../../../components/Icons";

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
  const goBack = () => {navigate(topicPath)}

  const [questions, setQuestions] = useState<Question[]>([])
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const topic = sessionStorage.getItem("practiceTopic") || ""

  // Takes the raw text of the AI answer, extracts the questions and answers, and saves them to display in the quiz.
  const loadQuestionsFromRaw = (raw: string) => {

    const blocks = raw.split(/~\d+~/).map(b => b.trim()).filter(Boolean)

    const parsed: Question[] = blocks.map((block) => {
      const lines = block.split(/\n/).map(line => line.trim()).filter(Boolean)

      const question = lines[0]

      const options: string[] = []
      let correctIndex = -1

      lines.slice(1).forEach((line, index) => {
        const match = line.match(/~[א-דA-Dأ-د]~\s*(.*)/)
        if (!match) return

        const text = match[1].trim()
        const clean = text.replace(/\*\*/g, "")
        options.push(clean)

        if (text.includes("**")) {
          correctIndex = index
        }
      })

      return { question, options, correctIndex }
    }).filter(q => q.options?.length === 4 && q.correctIndex >= 0)

    setQuestions(parsed)
    setUserAnswers(new Array(parsed.length).fill(null))
    setSubmitted(false)
  }

  // On component load, get the quiz from sessionStorage and display it. If missing, redirect to the home page.
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

  //
  // Explanations about the Sessions Storage keys:
  // - "practiceQuestions": the current set of questions displayed to the user in the quiz
  // - "prevPracticeQuestions": the previous set of questions used before clicking "new"
  //
  const handleRegenerate = async () => {

    const current = sessionStorage.getItem("practiceQuestions");  // Copy current questions to: prevPracticeQuestions
    if (current) {
      sessionStorage.setItem("prevPracticeQuestions", current);
    }

    setLoading(true);
    const result = await createQuiz(topic, lang, 10);
    setLoading(false);


    if (result) {
      const blocks = result.split(/~\d+~/).map(b => b.trim()).filter(Boolean)
      const prevRaw = sessionStorage.getItem("prevPracticeQuestions") || ""
      const prevQuestions = extractQuestionsFromRaw(prevRaw)

      const uniqueBlocks: string[] = []
      const duplicateBlocks: string[] = []

      blocks.forEach((block) => {
        const lines = block.split(/\n/).map(line => line.trim()).filter(Boolean)
        const question = lines[0]?.toLowerCase().trim()
        if (prevQuestions.includes(question)) {
          duplicateBlocks.push(block)
        } else {
          uniqueBlocks.push(block)
        }
      })

      const missingCount = duplicateBlocks.length

      if (missingCount > 0) {
        const additionalRaw = await createQuiz(topic, lang, missingCount)
        const additionalBlocks = additionalRaw
          .split(/~\d+~/)
          .map(b => b.trim())
          .filter(Boolean)

        // make sure the additional questions also don't include duplicates
        const additionalUnique = additionalBlocks.filter((block) => {
          const question = block.split(/\n/)[0]?.toLowerCase().trim()
          return !prevQuestions.includes(question) && !uniqueBlocks.some(b => b.split(/\n/)[0]?.toLowerCase().trim() === question)
        })

        const finalBlocks = [...uniqueBlocks, ...additionalUnique].slice(0, 10)
        const finalRaw = finalBlocks.map((b, idx) => `~${idx + 1}~\n${b}`).join("\n\n")

        sessionStorage.setItem("practiceQuestions", finalRaw)
        loadQuestionsFromRaw(finalRaw)
      } else {
        sessionStorage.setItem("practiceQuestions", result)
        loadQuestionsFromRaw(result)
      }
    } else {
      alert(t("quiz.FailMsg"))
    }

  };

  const extractQuestionsFromRaw = (raw: string): string[] => {
    const blocks = raw.split(/~\d+~/).map(b => b.trim()).filter(Boolean)
    const questions = blocks.map(block => {
      const lines = block.split(/\n/).map(line => line.trim()).filter(Boolean)
      return lines[0].toLowerCase().trim()
    })
    return questions
  }


  const correctCount = questions.reduce((sum, q, idx) => {
    return sum + (userAnswers[idx] === q.correctIndex ? 1 : 0)
  }, 0)

  return (
    <PageLayout
      id="practiceQuiz"
      productType={ProductType.Practice}
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
              <div
                className={`${styles.scoreStar} ${correctCount / questions.length < 0.5 ? styles.scoreRed : correctCount / questions.length < 0.7 ? styles.scoreYellow : styles.scoreGreen}`}
                onClick={(e) => {
                  (e.currentTarget as HTMLDivElement).style.visibility = "hidden"
                }}
              >
                <Icons.cancel className={styles.scoreCloseIcon} />

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
              <div className={styles.questionText}>
                {`${qIdx + 1}. ${q.question}`}
              </div>
              <ul className={styles.optionList}>
                {q.options.map((opt, optIdx) => {
                  const selectedIndex = userAnswers[qIdx]
                  const isSelected = selectedIndex === optIdx
                  const isAnswered = selectedIndex !== null
                  const isCorrectAnswer = submitted && q.correctIndex === optIdx
                  const isCorrectSelection = submitted && isAnswered && isSelected && optIdx === q.correctIndex
                  const isWrongSelection = submitted && isAnswered && isSelected && optIdx !== q.correctIndex

                  const lettersMap: Record<string, string[]> = {
                    he: ['א', 'ב', 'ג', 'ד'],
                    ar: ['أ', 'ب', 'ج', 'د'],
                    es: ['A', 'B', 'C', 'D'],
                    en: ['A', 'B', 'C', 'D']
                  }
                  const letters = lettersMap[lang] || ['-', '-', '-', '-']

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
