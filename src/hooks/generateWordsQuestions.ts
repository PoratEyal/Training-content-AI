import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebase";
import { logEvent } from "../utils/logEvent";

export const generateWordsQuestions = async (
  topic: string | null,
  learningLang: string,
  userLang: string,
  count?: number
): Promise<string> => {
  try {
    const getWordsQuestions = httpsCallable(functions, "getWordsQuestions");
    const response = await getWordsQuestions({ topic, learningLang, userLang, count });
    const { questions } = response.data as { questions: string };
    return questions;
  } catch (error) {
    logEvent("[useWordsQuestions]: getWords4Practice error: " + String(error), "");
    return ""; // Failed to create a quiz
  }
};
