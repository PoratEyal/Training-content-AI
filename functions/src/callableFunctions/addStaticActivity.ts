import * as functions from "firebase-functions";
import { CollectionDB } from "../model/enum/DB";
import { db } from "../index";
import { AddStaticActivityResponse } from "../model/types/response";

const addStaticActivity = functions.https.onCall(
    async (
        data: any,
        context: functions.https.CallableContext,
    ): Promise<AddStaticActivityResponse> => {
        const { activityId, activityText } = data;

        if (!context.auth) {
            return { result: "error", message: "User is not authenticated." };
        }

        try {
            const activityRef = db.collection(CollectionDB.STATIC_ACTIVITY).doc(activityId);
            const activityDoc = await activityRef.get();

            if (!activityDoc.exists) {
                return { 
                    result: "error", 
                    message: `Activity with ID ${activityId} not found.` 
                };
            }

            await activityRef.update({ 
                content: activityText,
                updatedAt: new Date().toISOString()
            });

            const updatedDoc = await activityRef.get();
            
            return {
                result: "success",
                activity: updatedDoc.data(),
                message: "Successfully updated activity content.",
            };
        } catch (error) {
            console.error("Error updating activity: ", error);
            return {
                result: "error",
                message: "Failed to update activity content.",
            };
        }
    },
);

export default addStaticActivity;
