import * as functions from "firebase-functions";
import { GetAllActivitiesRequest } from "../model/types/request";
import * as admin from "firebase-admin";
import { CollectionDB } from "../model/enum/DB";
import { getAllActivitiesResponse } from "../model/types/response";
import { defineString } from "firebase-functions/params";
import { db } from "../index";
import { NOT_REGISTERED } from "../model/constants";

const getAllActivities = functions.https.onCall(
    async (
        _: GetAllActivitiesRequest,
        context: functions.https.CallableContext,
    ): Promise<getAllActivitiesResponse> => {
        if (!context.auth || context.auth.uid !== defineString("ADMIN").value()) {
            return { result: "error", message: "User is not authenticated." };
        }
        await admin.auth().setCustomUserClaims(context.auth.uid, { canEditUsers: true });

        try {
            let query: admin.firestore.Query = db.collection(CollectionDB.ACTIVITY);
            query = query.where("userId", "!=", NOT_REGISTERED);
            const snapshot = await query.limit(8000).get();

            const data = snapshot.docs.map((doc) => {
                const ac = doc.data();
                delete ac.activity;
                return ac;
            });
            if (data) {
                return { result: "success", activities: data };
            }
            return { result: "success", message: "No activities." };
        } catch (error) {
            return { result: "error", message: "Something want wrong." };
        }
    },
);

export default getAllActivities;
