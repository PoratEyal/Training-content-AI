import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CollectionDB } from "../model/enum/DB";
import { db } from "../index";
import { RemoveSavedActivityResponse } from "../model/types/response";
import { RemoveSavedActivityRequest } from "../model/types/request";

const removeSavedActivity = functions.https.onCall(
    async (
        data: RemoveSavedActivityRequest,
        context: functions.https.CallableContext,
    ): Promise<RemoveSavedActivityResponse> => {
        if (!context.auth) {
            return { result: "error", message: "User is not authenticated." };
        }
        await admin.auth().setCustomUserClaims(context.auth.uid, { canEditUsers: true });

        try {
            const { activityId, userId } = data;
            const activityRef = db.collection(CollectionDB.ACTIVITY).doc(activityId);
            const activity = await activityRef.get();

            if (!activity.exists) {
                return { result: "error", message: "Activity not found." };
            }
            
            if (activity.data()?.userId !== userId) {
                return { result: "error", message: "Unauthorized to delete this activity." };
            }
            await activityRef.delete();
            
            return {
                result: "success",
                message: "Activity successfully removed.",
            };
        } catch (error) {
            console.error("Error removing activity:", error);
            return {
                result: "error",
                message: "Failed to remove activity.",
            };
        }
    },
);

export default removeSavedActivity;
