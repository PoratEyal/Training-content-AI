import { httpsCallable } from "firebase/functions"
import { functions } from "../config/firebase"
import { logEvent } from "../utils/logEvent"

export const generatePracticeQuestions = async (topic: string, lang: string, count: number): Promise<string> => {
  try {
    const getPracticeQuestions = httpsCallable(functions, "getPracticeQuestions")
    const response = await getPracticeQuestions({ topic, lang, count })
    const { questions } = response.data as { questions: string }
    return questions
  } catch (error) {
    logEvent(`[useQuestions.createQuiz]: ${error instanceof Error ? error.message : JSON.stringify(error)}`, "")
    return "" // Failed to create a quiz
  }
}
