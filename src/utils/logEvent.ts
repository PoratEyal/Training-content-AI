import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";

export async function logEvent(data: string, userID?: string) {
  try {
    const functions = getFunctions(getApp());
    const writeLog = httpsCallable(functions, "writeLog");
    await writeLog({ data, userID: userID || "" });
  } catch (error) {
    console.error("Error writing log:", error);
  }
}

