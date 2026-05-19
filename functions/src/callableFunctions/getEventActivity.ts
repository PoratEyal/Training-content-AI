import * as functions from "firebase-functions"
import { generateEventActivityAI } from "../service/Event/geminiAPI"
import { Lang } from "../model/types/common"
import { db } from "../index"

export const getEventActivity = functions.https.onCall(async (data, context) => {
  
  const { event, moreDetails, duration, age, amount, gender, place, materials, lang } = data

  try {
    const result = await generateEventActivityAI(
      event,
      moreDetails,
      duration,
      age,
      amount,
      gender,
      place,
      materials,
      lang as Lang
    )
    return { result }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    try {
      await db.collection("logs").add({
        timestamp: new Date(),
        userID: context.auth?.uid || "guest",
        data: `[getEventActivity error]: ${errorMsg} | event: ${event}`,
      });
    } catch (logErr) {
      console.error("Failed to write log:", logErr);
    }
    throw new functions.https.HttpsError("internal", "Failed to generate Event.")
  }
})

export default getEventActivity;
