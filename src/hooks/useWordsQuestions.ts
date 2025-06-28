import { httpsCallable } from "firebase/functions"
import { functions } from "../config/firebase"

export const createWordsQuiz = async (
  words: string,
  learningLang: string,
  userLang: string
): Promise<string> => {
  try {
    const getWords4Practice = httpsCallable(functions, "getWords4Practice")
    const response = await getWords4Practice({ words, learningLang, userLang })
    const { questions } = response.data as { questions: string }
    return questions
  } catch (error) {
    return "" // Failed to create a quiz
  }
}

