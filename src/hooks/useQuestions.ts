import { httpsCallable } from "firebase/functions"
import { functions } from "../config/firebase"

export const createQuiz = async (topic: string, lang: string, count: number): Promise<string> => {
  try {
    const getQuestions4Practice = httpsCallable(functions, "getQuestions4Practice")
    const response = await getQuestions4Practice({ topic, lang, count })
    const { questions } = response.data as { questions: string }
    return questions
  } catch (error) {
    return "" // Failed to create a quiz
  }
}
