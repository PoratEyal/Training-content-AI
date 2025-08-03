import { httpsCallable } from "firebase/functions"
import { functions } from "../config/firebase"
import { logEvent } from "../utils/logEvent"

export const generateEvent = async (
  event: string,
  moreDetails: string,
  age: string,
  amount: string,
  gender: string,
  place: string,
  time: string,
  lang: string
): Promise<string> => {
  try {
    const fn = httpsCallable(functions, "generateEvent")
    const response = await fn({ event, moreDetails, age, amount, gender, place, time, lang })
    const { result } = response.data as { result: string }
    return result
  } catch (error) {
    logEvent(`[generateEvent.error]: ${error instanceof Error ? error.message : JSON.stringify(error)}`, "")
    return ""
  }
}
