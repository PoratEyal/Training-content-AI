// Updates the user's table with the current timestamp in the "users.lastUpdate" field.
import * as functions from "firebase-functions"
import { db } from "../index"

const updateLastLogin = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User is not authenticated.")
  }

  const uid = context.auth.uid

  try {
    const userRef = db.collection("users").doc(uid)

    await userRef.set(
      {
        lastUpdate: new Date().toISOString(),
      },
      { merge: true }
    )

    return { result: "success" }
  } catch (error) {
    throw new functions.https.HttpsError("internal", "Failed to update lastUpdate.")
  }
})

export default updateLastLogin
