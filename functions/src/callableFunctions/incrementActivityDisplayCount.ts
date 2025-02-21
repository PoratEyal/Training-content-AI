import * as functions from "firebase-functions";
import { db } from "../index";
import { CollectionDB } from "../model/enum/DB";
import { IncrementActivityRequest } from "../model/types/request";
import { IncrementActivityResponse } from "../model/types/response";

const incrementActivityDisplayCount = functions.https.onCall(
    async (
        data: IncrementActivityRequest,
        context: functions.https.CallableContext,
    ): Promise<IncrementActivityResponse> => {
        try {
            const { activity } = data;
            // Query the staticActivities collection for the document with the given name
            const activityQuerySnapshot = await db
                .collection(CollectionDB.STATIC_ACTIVITY)
                .where("name", "==", activity.name)
                .limit(1)
                .get();

            if (activityQuerySnapshot.empty) {
                return {
                    result: "error",
                    message: "Activity not found with the provided name.",
                };
            }
            // Assuming name is unique, get the first matching document
            const activityDoc = activityQuerySnapshot.docs[0];
            const activityRef = activityDoc.ref;

            const updates = {
                displayCount: activity.displayCount + 1,
            };
            await activityRef.update(updates);

            return {
                result: "success",
            };
        } catch (error) {
            console.error("Error incrementing display count:", error);
            return {
                result: "error",
                message: "Failed to increment display count.",
            };
        }
    },
);

export default incrementActivityDisplayCount;
