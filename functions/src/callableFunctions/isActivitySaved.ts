import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CollectionDB } from "../model/enum/DB";
import { db } from "../index";
import { IsActivitySavedRequest } from "../model/types/request";
import { IsActivitySavedResponse } from "../model/types/response";

const isActivitySaved = functions.https.onCall(
    async (
        data: IsActivitySavedRequest,
        context: functions.https.CallableContext,
    ): Promise<IsActivitySavedResponse> => {
        if (!context.auth) {
            return { result: "error", exists: false, message: "User is not authenticated." };
        }
        await admin.auth().setCustomUserClaims(context.auth.uid, { canEditUsers: true });

        try {
            const { activityId, userId } = data;

            const activityRef = db.collection(CollectionDB.ACTIVITY).doc(activityId);
            const activity = await activityRef.get();

            if (activity.exists && activity.data()?.userId === userId) {
                return {
                    result: "success",
                    exists: true,
                    message: "Activity found.",
                };
            }

            return {
                result: "success",
                exists: false,
                message: "Activity not found or doesn't belong to the user.",
            };
        } catch (error) {
            return {
                result: "error",
                exists: false,
                message: "Failed to check activity status.",
            };
        }
    },
);

export default isActivitySaved;
