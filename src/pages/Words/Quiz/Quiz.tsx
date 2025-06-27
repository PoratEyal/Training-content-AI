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

type Question = {
  question: string
  options: string[]
  correctIndex: number
}

function Quiz() {

  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const lang = (i18n.language || "en").slice(0, 2)
  const { currentPage, setCurrentPage } = useContentContext()

  const wordsHomePagePath = route[`wordsHomePage${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsHomePageEn
  const wordsVocabPath = route[`wordsVocab${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.wordsVocabEn

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [wrongStack, setWrongStack] = useState<Question[]>([])
  const [initialQuestions, setInitialQuestions] = useState<Question[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    enforcePageAccess(currentPage, setCurrentPage, ProductPages.PAGE_WordsQuiz, navigate, wordsHomePagePath)
  }, [])

  useEffect(() => {
    const raw = sessionStorage.getItem("wordsQuizRaw")
    if (!raw) {
      navigate(wordsHomePagePath)
      return
    }

    const blocks = raw.split(/~\d+~/).map(b => b.trim()).filter(Boolean)
    const parsed: Question[] = blocks.map((block) => {
      const lines = block.split(/\n/).map(line => line.trim()).filter(Boolean)
      const options: string[] = []
      let correctIndex = -1
      let answerIdx = 0

      lines.forEach((line) => {
        const match = line.match(/~[א-דA-Dأ-د]~\s*(.*)/)
        if (!match) return

        const text = match[1].trim()
        const clean = text.replace(/\*\*/g, "")
        options.push(clean)

        if (text.includes("**")) {
          correctIndex = answerIdx
        }

        answerIdx++ // Advance only when line is a valid answer
      })

      return {
        question: lines[0].replace(/^~\d+~\s*/, "") || "",
        options,
        correctIndex,
      }
    }).filter(q => q.options.length === 4 && q.correctIndex >= 0)

    setQuestions(parsed)
    setInitialQuestions(parsed)
    setCurrentIdx(0)
    setSelected(null)
    setWrongStack([])
    setDone(false)
  }, [lang, navigate])

  const handleSelect = (index: number) => {
    if (selected === null) setSelected(index)
  }

  const handleNext = () => {
    const currentQ = questions[currentIdx]
    if (selected !== currentQ.correctIndex) {
      setWrongStack(prev => [...prev, currentQ])
    }

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1)
      setSelected(null)
    } else if (wrongStack.length > 0 || selected !== currentQ.correctIndex) {
      setQuestions([...wrongStack, ...(selected !== currentQ.correctIndex ? [currentQ] : [])])
      setCurrentIdx(0)
      setWrongStack([])
      setSelected(null)
    } else {
      setDone(true)
    }
  }

  const handleRestart = () => {
    setQuestions(initialQuestions)
    setCurrentIdx(0)
    setSelected(null)
    setWrongStack([])
    setDone(false)
  }

  const q = questions[currentIdx]

  const lettersMap: Record<string, string[]> = {
    he: ['א', 'ב', 'ג', 'ד'],
    ar: ['أ', 'ب', 'ج', 'د'],
    es: ['A', 'B', 'C', 'D'],
    en: ['A', 'B', 'C', 'D']
  }
  const letters = lettersMap[lang] || ['-', '-', '-', '-']

  return (
    <PageLayout
      id="wordsQuiz"
      productType={ProductType.Words}
      hasHeader={{ goBack: () => navigate(wordsVocabPath), hasTitle: t("wordsQuiz.title") }}
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
              {t("wordsQuiz.newPractice")}
            </button>
            <button onClick={() => navigate(wordsHomePagePath)} className={`${styles.retryFab} ${styles.doneBtn}`}>
              {t("wordsQuiz.done")}
            </button>
          </div>
        </QuizContainer>
      ) : (
        <QuizContainer>
          <div className={styles.questionBlock}>
            <div className={styles.questionText}>
              {q.question}
              <span
                onClick={() => speakText(q.question)}
                className={styles.speakerIcon}
                role="button"
                title={t("wordsQuiz.speak")}
              >
                🔊
              </span>
            </div>
            <ul className={styles.optionList}>
              {q.options.map((opt, idx) => {
                const isSelected = selected === idx
                const isCorrectAnswer = selected !== null && idx === q.correctIndex
                const isWrongAnswer = selected === idx && selected !== q.correctIndex

                return (
                  <li
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`${styles.optionItem} ${isCorrectAnswer ? styles.optionCorrect :
                      isWrongAnswer ? styles.optionWrong :
                        isSelected ? styles.optionSelected : ""
                      }`}
                  >
                    <span className={idx === q.correctIndex && selected !== null ? styles.correctBold : ""}>
                      {`${letters[idx]}. ${opt}`}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          {selected !== null && (
            <div className={styles.checkBtnContainer}>
              <button onClick={handleNext} className={styles.checkBtn}>
                {t("wordsQuiz.nextWord")}
              </button>
            </div>
          )}
        </QuizContainer>
      )}
    </PageLayout>
  )
}

export default Quiz
