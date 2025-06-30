import * as functions from "firebase-functions";
import { getWordsFromAI } from "../service/Words/geminiAPI";
import { Lang } from "../model/types/common";

const getWords4Practice = functions.https.onCall(
  async (data: { topic?: string; learningLang: string; userLang: string; count?: number }) => {
    const { topic, learningLang, userLang, count } = data;

    try {
      const questions = await getWordsFromAI(
        topic || null,
        learningLang as Lang,
        userLang as Lang,
        count || 10
      );
      return { questions };
    } catch (error: any) {
      console.error("❌ Failed to generate words quiz:", error);
      throw new functions.https.HttpsError("internal", "Failed to generate questions.");
    }
  }
);

export default getWords4Practice;
