import * as functions from "firebase-functions";
import { SaveActivityRequest } from "../model/types/request";
import { db } from "../index";
import { SaveActivityResponse } from "../model/types/response";
import * as admin from "firebase-admin";
import { CollectionDB } from "../model/enum/DB";
import { updateActivityWithId } from "../utils/activity";

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
            const docRef = await db.collection(CollectionDB.ACTIVITY).add(restActivity);
            const updateActivity = updateActivityWithId(docRef.id, activity);
            return { result: "success", activity: updateActivity };
        } catch (error) {
            console.error("Failed to retrieve activity.", error);
            return { result: "error", message: "Failed to retrieve activity." };
        }
    },
);

export default saveActivity;
