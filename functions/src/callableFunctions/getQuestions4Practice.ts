import { onCall } from "firebase-functions/v2/https";
import { HttpsError } from "firebase-functions/v1/https";
import { getSmartPracticeQuestions } from "../service/SmartPractice/geminiAPI";
import { Lang } from "../model/types/common";

export const getQuestions4Practice = onCall(async (request) => {

  const { topic, lang } = request.data;

  try {
    const questions = await getSmartPracticeQuestions(topic.trim(), lang as Lang);
    return { questions };
  } catch (error: any) {
    console.error("❌ Failed to generate questions:", error);
    throw new HttpsError("internal", "Failed to generate questions.");
  }
});

export default getQuestions4Practice;
