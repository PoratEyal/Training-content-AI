import * as functions from "firebase-functions";
import { db } from "../index";

type WriteLogRequest = {
  data: string;
  userID: string;
};

type WriteLogResponse = {
  result: "success" | "error";
  message?: string;
};

const writeLog = functions.https.onCall(
  async (data: WriteLogRequest): Promise<WriteLogResponse> => {
    const { userID, data: logData } = data;

    try {
      await db.collection("logs").add({
        timestamp: new Date(),
        userID: userID || "guest",
        data: logData || "",
      });

      return { result: "success" };
    } catch (error) {
      return { result: "error", message: "Failed to write log" };
    }
  }
);

export default writeLog;
