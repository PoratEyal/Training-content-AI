import * as functions from "firebase-functions";
import { db } from "../index";
import { GetStaticActivityResponse } from "../model/types/response";
import { GetStaticActivityRequest } from "../model/types/request";

const getStaticActivityHttp = functions.https.onCall(
    async (
        data: GetStaticActivityRequest,
        context: functions.https.CallableContext
    ): Promise<GetStaticActivityResponse> => {
        try {
            const querySnapshot = await db
                .collection("staticActivities")
                .where("name", "==", data.contentName)
                .get();

            if (querySnapshot.empty) {
                return {
                    result: "error",
                    message: "Activity not found"
                };
            }

            const activityDoc = querySnapshot.docs[0];
            const activityData = activityDoc.data();

            const activity = {
                name: activityData?.name || '',
                metaTitle: activityData?.metaTitle || '',
                metaDescription: activityData?.metaDescription || '',
                content: activityData?.content || '',
                displayCount: activityData?.displayCount || 0,
                orderId: activityData?.orderId || 0,
                title: activityData?.title || '',
            };

            return {
                result: "success",
                activity
            };

        } catch (error) {
            console.error('Error fetching static activity:', error);
            return {
                result: "error",
                message: "Failed to fetch static activity."
            };
        }
    }
);

export default getStaticActivityHttp;