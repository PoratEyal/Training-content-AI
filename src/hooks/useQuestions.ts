import { httpsCallable } from "firebase/functions"
import { functions } from "../config/firebase"

export const createQuiz = async (topic: string, lang: string): Promise<string> => {
  try {
    const getQuestions4Practice = httpsCallable(functions, "getQuestions4Practice")
    const response = await getQuestions4Practice({ topic, lang })
    const { questions } = response.data as { questions: string }
    return questions
    
  } catch (error) {
    return "" // Failed to create a quiz
  }
}
