import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebase";
import { logEvent } from "../utils/logEvent";

export const createWordsQuiz = async (
  topic: string | null,
  learningLang: string,
  userLang: string,
  count?: number
): Promise<string> => {
  try {
    const getWords4Practice = httpsCallable(functions, "getWords4Practice");
    const response = await getWords4Practice({ topic, learningLang, userLang, count });
    const { questions } = response.data as { questions: string };
    return questions;
  } catch (error) {
    logEvent("[useWordsQuestions]: getWords4Practice error: " + String(error), "guest");
    return ""; // Failed to create a quiz
  }
};
