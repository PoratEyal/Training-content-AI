import * as functions from "firebase-functions";
import { GetActivityRequest } from "../model/types/request";
import { NOT_REGISTERED } from "../model/constants";
import { getMainActivity } from "../service/YouthActivities/geminiAPI";
import { initActivityFromAI } from "../utils/activity";
import { GetActivityResponse } from "../model/types/response";
import { handleGetActivityErrors } from "../utils/handleError";

const getActivity = functions.https.onCall(
    async (
        data: GetActivityRequest,
        context: functions.https.CallableContext,
    ): Promise<GetActivityResponse> => {
        const userId = context.auth?.uid || NOT_REGISTERED;

        try {
            let activityResult;
            try {
                activityResult = await getMainActivity(data);
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
            return handleGetActivityErrors(error, data, userId);
        }
    }
);


export default getActivity;
