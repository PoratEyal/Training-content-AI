import * as functions from "firebase-functions";
import { getDistractorsWords } from "../service/Words/geminiAPI";
import { Lang } from "../model/types/common";

const getWords4Practice = functions.https.onCall(
  
  async (data: { words: string; learningLang: string; userLang: string }) => {
    const { words, learningLang, userLang } = data;

    try {
      const questions = await getDistractorsWords(words.trim(), learningLang as Lang, userLang as Lang);
      return { questions };
    } catch (error: any) {
      console.error("❌ Failed to generate words quiz:", error);
      throw new functions.https.HttpsError("internal", "Failed to generate questions.");
    }
  }
);

export default getWords4Practice;
