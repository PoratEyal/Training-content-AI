import * as functions from "firebase-functions";
import { generateWordsAI } from "../service/Words/geminiAPI";
import { Lang } from "../model/types/common";
import { db } from "../index";

export const getWordsQuestions = functions.https.onCall(
  async (data: { topic?: string; learningLang: string; userLang: string; count?: number }) => {
    const { topic, learningLang, userLang, count } = data;

    try {
      const questions = await generateWordsAI(
        topic || null,
        learningLang as Lang,
        userLang as Lang,
        count || 10
      );
      return { questions };
    } catch (error: any) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      try {
        await db.collection("logs").add({
          timestamp: new Date(),
          userID: "guest",
          data: `[getWordsQuestions error]: ${errorMsg} | topic: ${topic || "none"}`,
        });
      } catch (logErr) {
        console.error("Failed to write log:", logErr);
      }
      throw new functions.https.HttpsError("internal", "Failed to generate questions.");
    }
  }
);

export default getWordsQuestions;
