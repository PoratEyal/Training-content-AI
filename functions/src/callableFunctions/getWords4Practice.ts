import * as functions from "firebase-functions";
import { getWordsQuiz } from "../service/Words/geminiAPI";
import { Lang } from "../model/types/common";

const getWords4Practice = functions.https.onCall(
  async (data: { words: string; sourceLang: string; targetLang: string }) => {
    const { words, sourceLang, targetLang } = data;

    try {
      const questions = await getWordsQuiz(words.trim(), sourceLang as Lang, targetLang as Lang);
      return { questions };
    } catch (error: any) {
      console.error("❌ Failed to generate words quiz:", error);
      throw new functions.https.HttpsError("internal", "Failed to generate questions.");
    }
  }
);

export default getWords4Practice;
