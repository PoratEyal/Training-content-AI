import * as functions from "firebase-functions";
import { GetActivityRequest } from "../model/types/request";
import * as admin from "firebase-admin";
import { MIN_ACTIVITIES, NOT_REGISTERED } from "../model/constants";
import { Activity } from "../model/types/activity";
import { GeminiApiSet } from "../service/geminiAPI";
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
        const { fetchFrom, path, subject, time, amount, grade, gender, place } = data;
        let userId = context.auth?.uid || NOT_REGISTERED;

        // if (context.auth) {
        //     const userId = context.auth.uid;
        //     const userDoc = await db.collection(CollectionDB.USERS).doc(userId).get();
        //     const userData = userDoc.data();
        //     if (userDoc.exists && userData) {
        //         if (userData.limit < NOT_REGISTER_LIMIT) {
        //             return { result: "limit", message: "User reached the limit." };
        //         }
        //     }
        // }

        let query: admin.firestore.Query = db.collection(CollectionDB.ACTIVITY);

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
                const activityRef = db.collection(CollectionDB.ACTIVITY).doc(activity.id);
                await activityRef.update(updates);
                return { result: "success", activity };
            } else if (fetchFrom.includes("AI")) {
                const geminiAPI =
                    GeminiApiSet[path as keyof typeof GeminiApiSet] || GeminiApiSet.activity;
                const activityResult = await geminiAPI({
                    subject,
                    time,
                    amount,
                    grade,
                    gender,
                    place,
                });
                const activity = initActivityFromAI(activityResult, data, userId);
                const { id, ...restActivity } = activity;
                
                const docRef = await db.collection(CollectionDB.ACTIVITY).add(restActivity);
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
