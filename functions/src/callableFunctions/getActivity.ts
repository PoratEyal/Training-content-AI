import * as functions from "firebase-functions";
import { GetActivityRequest } from "../model/types/request";
import * as admin from "firebase-admin";
import { MIN_ACTIVITIES, NOT_REGISTERED } from "../model/constants";
import { Activity, ActivityDetails } from "../model/types/activity";
import { getMainActivity } from "../service/geminiAPI";
import { initActivityFromAI, initActivityFromDB, updateActivityWithId } from "../utils/activity";
import { getUpdateAt } from "../utils/time";
import { CollectionDB } from "../model/enum/DB";
import { GetActivityResponse } from "../model/types/response";
import { handleGetActivityErrors } from "../utils/handleError";
import { db } from "../index";

const getActivity = functions.https.onCall(
    async (
        data: GetActivityRequest,
        context: functions.https.CallableContext,
    ): Promise<GetActivityResponse> => {
        const { fetchFrom, parts, subject, time, amount, grade, gender, place } = data;
        let userId = context.auth?.uid || NOT_REGISTERED;

        let query: admin.firestore.Query = db.collection(CollectionDB.TEST);

        query = query.where("subject", "==", subject);
        query = query.where("time", "==", time);
        query = query.where("amount", "==", amount);
        query = query.where("grade", "==", grade);
        query = query.where("gender", "==", gender);
        query = query.where("place", "==", place);

        try {
            const querySnapshot = await query.get();
            const activities = querySnapshot.docs.map((doc) => {
                return initActivityFromDB(doc.id, doc.data(), userId);
            }) as Activity[];
            if (activities.length > MIN_ACTIVITIES && fetchFrom.includes("DB")) {
                const randomIndex = Math.floor(Math.random() * activities.length);
                const activity = activities[randomIndex];
                const updates = {
                    fetchCount: activity.fetchCount + 1,
                    updatedAt: getUpdateAt(),
                };
                const activityRef = db.collection(CollectionDB.TEST).doc(activity.id);
                await activityRef.update(updates);
                return { result: "success", activity };
            } else if (fetchFrom.includes("AI")) {
                const activityResult = await getMainActivity({
                    subject,
                    parts,
                    time,
                    amount,
                    grade,
                    gender,
                    place,
                } as ActivityDetails);
                const activity = initActivityFromAI(activityResult, data, userId);
                const { id, ...restActivity } = activity;
                
                const docRef = await db.collection(CollectionDB.TEST).add(restActivity);
                const updateActivity = updateActivityWithId(docRef.id, activity);
                return { result: "success", activity: updateActivity };
            }

            return { result: "notFound", message: "Failed to retrieve activity." };
        } catch (error) {
            return handleGetActivityErrors(error, data, userId);
        }
    },
);

export default getActivity;
