import * as functions from "firebase-functions"
import { generateEvent } from "../service/Event/geminiAPI"
import { Lang } from "../model/types/common"

const generateEventHandler = functions.https.onCall(async (data, context) => {
  const { event, moreDetails, age, amount, gender, place, time, lang } = data

  try {
    const result = await generateEvent(
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

export default generateEventHandler
