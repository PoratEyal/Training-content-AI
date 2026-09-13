import * as functions from "firebase-functions";
import { GetActivityRequest } from "../model/types/request";
import { NOT_REGISTERED } from "../model/constants";
import { generateYouthActivityAI } from "../service/Youth/geminiAPI";
import { initActivityFromAI } from "../utils/activity";
import { GetActivityResponse } from "../model/types/response";
import { handleGetActivityErrors } from "../utils/handleError";
import { db } from "../index";

const getActivity = functions.runWith({
    timeoutSeconds: 90,
}).https.onCall(
    async (
        data: GetActivityRequest,
        context: functions.https.CallableContext,
    ): Promise<GetActivityResponse> => {
        const userId = context.auth?.uid || NOT_REGISTERED;

        try {
            let activityResult;
            try {
                activityResult = await generateYouthActivityAI(data);
            } catch (err) {
                throw new Error(`[getMainActivity failed]: ${err instanceof Error ? err.message : String(err)}`);
            }

            let activity;
            try {
                activity = initActivityFromAI(activityResult, data, userId);
            } catch (err) {
                throw new Error(`[initActivityFromAI failed]: ${err instanceof Error ? err.message : String(err)}`);
            }

            return { result: "success", activity };
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            try {
                await db.collection("logs").add({
                    timestamp: new Date(),
                    userID: userId || "guest",
                    data: `[getActivity error]: ${errorMsg} | subject: ${data.subject} | category: ${data.category}`,
                });
            } catch (logErr) {
                console.error("Failed to write to logs collection:", logErr);
            }
            return handleGetActivityErrors(error, data, userId);
        }
    }
);


export default getActivity;
