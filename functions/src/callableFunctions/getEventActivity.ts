import * as functions from "firebase-functions"
import { generateEventActivityAI } from "../service/Event/geminiAPI"
import { Lang } from "../model/types/common"

export const getEventActivity = functions.https.onCall(async (data, context) => {
  
  const { event, moreDetails, age, amount, gender, place, time, lang } = data

  try {
    const result = await generateEventActivityAI(
      event,
      moreDetails,
      age,
      amount,
      gender,
      place,
      time,
      lang as Lang
    )
    return { result }
  } catch (error) {
    throw new functions.https.HttpsError("internal", "Failed to generate Event.")
  }
})

export default getEventActivity;
