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
        let userId = context.auth?.uid || NOT_REGISTERED;
        try {
            const activityResult = await getMainActivity(data);
            const activity = initActivityFromAI(activityResult, data, userId);
            return { result: "success", activity: activity };
        } catch (error) {
            return handleGetActivityErrors(error, data, userId);
        }
    },
);

export default getActivity;
