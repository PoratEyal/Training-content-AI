import * as functions from "firebase-functions";
import { GetSavedActivitiesReqeust } from "../model/types/request";
import * as admin from "firebase-admin";
import { CollectionDB } from "../model/enum/DB";
import { GetSavedActivitiesResponse } from "../model/types/response";
import { db } from "../index";
import { Activity } from "../model/types/activity";
import { updateActivityWithId } from "../utils/activity";

const getSavedActivities = functions.https.onCall(
    async (
        data: GetSavedActivitiesReqeust,
        context: functions.https.CallableContext,
    ): Promise<GetSavedActivitiesResponse> => {
        if (!context.auth) {
            return { result: "error", message: "User is not authenticated." };
        }
        await admin.auth().setCustomUserClaims(context.auth.uid, { canEditUsers: true });

        try {
            const { userId } = data;
            const snapshot = await db
                .collection(CollectionDB.ACTIVITY)
                .where("userId", "==", userId)
                .get();

            const activities = snapshot.docs.map((doc) => {
                return updateActivityWithId(doc.id, doc.data() as Activity)
            });

            if (activities) {
                return { result: "success", activities };
            }
            return { result: "success", message: "No activities." };
        } catch (error) {
            return { result: "error", message: "Something want wrong." };
        }
    },
);

export default getSavedActivities;
