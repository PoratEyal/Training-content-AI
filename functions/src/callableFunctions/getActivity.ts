import * as functions from "firebase-functions";
import { GetActivityRequest } from "../model/types/request";
import { NOT_REGISTERED } from "../model/constants";
import { ActivityDetails } from "../model/types/activity";
import { getMainActivity } from "../service/geminiAPI";
import { initActivityFromAI, updateActivityWithId } from "../utils/activity";
import { CollectionDB } from "../model/enum/DB";
import { GetActivityResponse } from "../model/types/response";
import { handleGetActivityErrors } from "../utils/handleError";
import { db } from "../index";

const getActivity = functions.https.onCall(
    async (
        data: GetActivityRequest,
        context: functions.https.CallableContext,
    ): Promise<GetActivityResponse> => {
        let userId = context.auth?.uid || NOT_REGISTERED;
        try {
            const activityResult = await getMainActivity({ ...data } as ActivityDetails);
            const activity = initActivityFromAI(activityResult, data, userId);
            const { id, ...restActivity } = activity;

            const docRef = await db.collection(CollectionDB.TEST).add(restActivity);
            const updateActivity = updateActivityWithId(docRef.id, activity);
            return { result: "success", activity: updateActivity };
        } catch (error) {
            return handleGetActivityErrors(error, data, userId);
        }
    },
);

export default getActivity;
