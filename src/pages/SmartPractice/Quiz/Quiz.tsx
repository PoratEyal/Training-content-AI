import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";
import route from "../../../router/route.json";
import PageLayout from "../../../components/Layout/PageLayout/PageLayout";
import QuizContainer from "../../../components/SmartPractice/QuizContainer/QuizContainer";
import LoadingQuiz from "../../../components/Loading/LoadingQuiz/LoadingQuiz";
import { PRACTICE_QUIZ_AD_SLOT } from "../../../models/constants/adsSlot";
import { ProductType } from "../../../context/ProductType";
import { Icons } from "../../../components/Icons";
import { createQuiz } from "../../../hooks/useQuestions";
import { logEvent } from "../../../utils/logEvent";
import styles from "./Quiz.module.css";

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
  const goBack = () => { navigate(topicPath) }

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
        if (text.includes("**")) correctIndex = index
      })

      return { question, options, correctIndex }
    }).filter(q => q.options.length === 4 && q.correctIndex >= 0)

    if (parsed.length === 0) return // silently ignore bad input

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
  // Generates a new quiz with 10 valid and unique questions (max 5 attempts). Replaces current questions if successful.
  //
  const handleRegenerate = async () => {

    const prev = sessionStorage.getItem("practiceQuestions")
    if (prev) {
      sessionStorage.setItem("prevPracticeQuestions", prev)
    }

    setLoading(true)

    const tryGenerateValidQuiz = async (attempt: number): Promise<string | null> => {
      if (attempt > 5) return null

      const prevQuestions = extractQuestionsFromRaw(sessionStorage.getItem("prevPracticeQuestions") || "")
      const duplicateQuestions = new Set<string>()
      const finalBlocks: string[] = []

      // Helper function to add valid blocks to finalBlocks
      const addValidBlocks = (raw: string | null) => {
        if (!raw || raw.trim() === "") return

        const blocks = raw.split(/~\d+~/).map(b => b.trim()).filter(Boolean)

        for (const block of blocks) {
          const lines = block.split(/\n/).map(line => line.trim()).filter(Boolean)
          const question = lines[0]?.toLowerCase().trim()
          if (!question) continue
          if (prevQuestions.includes(question)) continue
          if (duplicateQuestions.has(question)) continue

          duplicateQuestions.add(question)
          finalBlocks.push(block)
        }
      }

      // first attempt
      addValidBlocks(await createQuiz(topic, lang, 10))

      // Validate question structure to ensure it's properly formatted
      const getValidQuestionCount = (blocks: string[]): number => {
        return blocks
          .map(block => {
            const lines = block.split(/\n/).map(l => l.trim()).filter(Boolean)
            if (!lines[0]) return { options: [], correctIndex: -1 }

            const options: string[] = []
            let correctIndex = -1

            lines.slice(1).forEach((line, index) => {
              const match = line.match(/~[א-דA-Dأ-د]~\s*(.*)/)
              if (!match) return
              const text = match[1].trim()
              options.push(text.replace(/\*\*/g, ""))
              if (text.includes("**")) correctIndex = index
            })

            return { options, correctIndex }
          })
          .filter(q => q.options.length === 4 && q.correctIndex >= 0)
          .length
      }

      // Request additional questions based on the actual number of valid ones
      let validCount = getValidQuestionCount(finalBlocks)
      while (validCount < 10 && attempt <= 5) {
        const needed = 10 - validCount
        addValidBlocks(await createQuiz(topic, lang, needed))
        validCount = getValidQuestionCount(finalBlocks)
        if (validCount >= 10) break
        attempt++
      }

      if (validCount >= 5) {
        const rawValidated = finalBlocks
          .slice(0, 10) // Displays up to 10 questions, even if fewer are available
          .map((b, idx) => `~${idx + 1}~\n${b}`)
          .join("\n\n")

        return rawValidated
      } else {
        return null // Only if fewer than 5 valid questions, return null to trigger error message
      }
    }


    const finalRaw = await tryGenerateValidQuiz(1)

    setLoading(false)

    if (finalRaw) {
      sessionStorage.setItem("practiceQuestions", finalRaw)
      loadQuestionsFromRaw(finalRaw)
    } else {
      const auth = getAuth();
      const user = auth.currentUser;
      const userEmail = user?.email || "guest";
      logEvent(`[Quiz]: Generation failed: less then 5 valid questions found (topic: ${topic}, lang: ${lang})`, userEmail);
      alert(t("quiz.FailMsg"))
    }
  }

  const extractQuestionsFromRaw = (raw: string): string[] => {
    const blocks = raw.split(/~\d+~/).map(b => b.trim()).filter(Boolean)
    const questions = blocks.map(block => {
      const lines = block.split(/\n/).map(line => line.trim()).filter(Boolean)
      return lines[0].toLowerCase().trim()
    })
    return questions
  }

  const handleShare = (topic: string) => {

    const text = t("quiz.shareMessage", { topic })
    console.log(text)
    const url = window.location.href

    if (navigator.share) {
      navigator.share({
        title: t("common.appName"),
        text,
        url,
      }).catch((err) => {
        console.error("Share failed:", err)
      })
    } else {
      navigator.clipboard.writeText(`${text} ${url}`)
      alert(t("quiz.LinkinClipboard"))
    }
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
                id="scoreBox"
                className={`${styles.scoreStar} ${correctCount / questions.length < 0.5 ? styles.scoreRed : correctCount / questions.length < 0.7 ? styles.scoreYellow : styles.scoreGreen}`}
                onClick={() => {
                  const star = document.getElementById("scoreBox")
                  const share = document.getElementById("shareBtn")
                  if (star) star.style.visibility = "hidden"
                  if (share) share.style.display = "none"
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

              <button id="shareBtn" onClick={() => handleShare(topic)} className={styles.shareBox}>
                {t("quiz.shareButton")}
                <Icons.Share className={styles.shareIcon} />
              </button>

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
