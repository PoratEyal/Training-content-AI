import * as functions from "firebase-functions";
import { getSmartPracticeQuestions } from "../service/SmartPractice/geminiAPI";
import { Lang } from "../model/types/common";

const getQuestions4Practice = functions.https.onCall(
  async (data: { topic: string; lang: string; count?: number }) => {
    const { topic, lang, count } = data;

    try {
      const questions = await getSmartPracticeQuestions(
        topic.trim(),
        count ?? 10,
        lang as Lang
      );
      return { questions };
    } catch (error: any) {
      console.error("❌ Failed to generate questions:", error);
      throw new functions.https.HttpsError("internal", "Failed to generate questions.");
    }
  }
);

export default getQuestions4Practice;
