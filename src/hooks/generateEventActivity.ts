import { httpsCallable } from "firebase/functions"
import { functions } from "../config/firebase"
import { logEvent } from "../utils/logEvent"

export const generateEventActivity = async (
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
    const getEventActivity = httpsCallable(functions, "getEventActivity")
    const response = await getEventActivity({ event, moreDetails, age, amount, gender, place, time, lang })
    const { result } = response.data as { result: string }
    return result
  } catch (error) {
    logEvent(`[generateEventActivity.error]: ${error instanceof Error ? error.message : JSON.stringify(error)}`, "")
    return ""
  }
}
