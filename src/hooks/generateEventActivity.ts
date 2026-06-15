import { httpsCallable } from "firebase/functions"
import { functions } from "../config/firebase"
import { logEvent } from "../utils/logEvent"

export const generateEventActivity = async (
  event: string,
  moreDetails: string,
  duration: string,
  age: string,
  amount: string,
  gender: string,
  place: string,
  materials: string,
  lang: string
): Promise<string> => {
  try {
    const getEventActivity = httpsCallable(functions, "getEventActivity")
    const response = await getEventActivity({ event, moreDetails, duration, age, amount, gender, place, materials, lang })
    const { result } = response.data as { result: string }
    return result
  } catch (error) {
    logEvent(`[generateEventActivity.error]: ${error instanceof Error ? error.message : JSON.stringify(error)}`, "")
    return ""
  }
}
