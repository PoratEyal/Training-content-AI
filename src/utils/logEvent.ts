import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";

export async function logEvent(data: string, userID?: string) {
  try {
    const functions = getFunctions(getApp());
    const writeLogEvent = httpsCallable(functions, "writeLogEvent");
    await writeLogEvent({ data, userID: userID || "" });
  } catch (error) {
    console.error("Error writing log:", error);
  }
}

