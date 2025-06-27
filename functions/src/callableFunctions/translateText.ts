import * as functions from "firebase-functions"
import fetch from "node-fetch"

const AZURE_KEY = functions.config().azure.key
const AZURE_REGION = functions.config().azure.region
const AZURE_ENDPOINT = "https://api.cognitive.microsofttranslator.com"

const translateText = functions.https.onCall(
  async (data: { text: string; sourceLang: string; targetLang: string }) => {
    const { text, sourceLang, targetLang } = data

    if (!text || !sourceLang || !targetLang) {
      throw new functions.https.HttpsError("invalid-argument", "Missing text/sourceLang/targetLang")
    }

    try {
      const response = await fetch(`${AZURE_ENDPOINT}/translate?api-version=3.0&from=${sourceLang}&to=${targetLang}`, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": AZURE_KEY,
          "Ocp-Apim-Subscription-Region": AZURE_REGION,
          "Content-type": "application/json",
        },
        body: JSON.stringify([{ Text: text }]),
      })

      const result = await response.json()

      if (!Array.isArray(result) || !result[0]?.translations?.[0]?.text) {
        throw new Error("Unexpected response from Azure")
      }

      return { translatedText: result[0].translations[0].text }
    } catch (err: any) {
      console.error("Translation error:", err)
      throw new functions.https.HttpsError("internal", "Translation failed.")
    }
  }
)

export default translateText


// Run this in the terminal to deploy the function:
// firebase functions:config:set azure.key="1NE9rvZh1QxVqtANFMk64kNbSQmAW54IgAoxriF0VXQrYAcq4aadJQQJ99BFACi5YpzXJ3w3AAAbACOGJI5S" azure.region="northeurope"
