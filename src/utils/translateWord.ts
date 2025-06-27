import { httpsCallable } from "firebase/functions"
import { functions } from "../config/firebase"

export async function translateWord(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string | null> {
  try {
    const translate = httpsCallable(functions, "translateText")
    const result = await translate({ text, sourceLang, targetLang })

    return (result.data as any)?.translatedText || null
  } catch (error) {
    console.error("Translation failed:", error)
    return null
  }
}
