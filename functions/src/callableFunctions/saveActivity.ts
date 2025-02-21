import * as functions from "firebase-functions";
import { SaveActivityRequest } from "../model/types/request";
import { db } from "../index";
import { SaveActivityResponse } from "../model/types/response";
import * as admin from "firebase-admin";
import { CollectionDB } from "../model/enum/DB";
import { updateActivityWithId } from "../utils/activity";
import { getCurrentTime } from "../utils/time";

const saveActivity = functions.https.onCall(
    async (
        data: SaveActivityRequest,
        context: functions.https.CallableContext,
    ): Promise<SaveActivityResponse> => {
        const { activity } = data;

        if (!context.auth) {
            return { result: "error", message: "User is not authenticated." };
        }
        await admin.auth().setCustomUserClaims(context.auth.uid, { canEditUsers: true });

        try {
            const { id, ...restActivity } = activity;

            if (id !== "ID") {
                const docRef = db.collection(CollectionDB.ACTIVITY).doc(id);
                const existingActivity = await docRef.get();

                if (existingActivity.exists) {
                    // Update only activity and savedAt fields
                    await docRef.update({
                        activity: activity.activity,
                        savedAt: getCurrentTime(),
                    });
                    return {
                        result: "success",
                        activity: { ...activity, savedAt: getCurrentTime() },
                    };
                }
            }

            const activityWithTimestamp = {
                ...restActivity,
                savedAt: getCurrentTime(),
            };
            const docRef = await db.collection(CollectionDB.ACTIVITY).add(activityWithTimestamp);
            const updateActivity = updateActivityWithId(docRef.id, activity);
            return { result: "success", activity: updateActivity };
        } catch (error) {
            console.error("Failed to retrieve activity.", error);
            return { result: "error", message: "Failed to retrieve activity." };
        }
    },
);

export default saveActivity;
