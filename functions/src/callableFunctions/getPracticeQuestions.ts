import * as functions from "firebase-functions";
import { generatePracticeAI } from "../service/Practice/geminiAPI";
import { Lang } from "../model/types/common";
import { db } from "../index";

export const getPracticeQuestions = functions.https.onCall(
  async (data: { topic: string; lang: string; count?: number }) => {
    const { topic, lang, count } = data;

    try {
      const questions = await generatePracticeAI(
        topic.trim(),
        count ?? 10,
        lang as Lang
      );
      return { questions };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      try {
        await db.collection("logs").add({
          timestamp: new Date(),
          userID: "guest",
          data: `[getPracticeQuestions error]: ${errorMsg} | topic: ${topic}`,
        });
      } catch (logErr) {
        console.error("Failed to write log:", logErr);
      }
      throw new functions.https.HttpsError("internal", "Failed to generate questions.");
    }
  }
);

export default getPracticeQuestions;
