import * as functions from "firebase-functions";
import { db } from "../index";
import { GetStaticSubjectsResponse } from "../model/types/response";

const getStaticSubjectsHttp = functions.https.onCall(
    async (
        data: void,
        context: functions.https.CallableContext
    ): Promise<GetStaticSubjectsResponse> => {
        try {
            const snapshot = await db.collection("staticSubjects").get();

            const subjectsWithActivities = await Promise.all(
                snapshot.docs.map(async (doc) => {
                    const docData = doc.data() || {};

                    const activityReferences = docData.activities || [];
                    const activities = await Promise.all(
                        activityReferences.map(async (activityRef: string) => {
                            const activitySnapshot = await db.doc(activityRef).get();
                            const activityData = activitySnapshot.data();
                            console.log('Activity Document Data:', activityData);

                            return {
                                name: activityData?.name || '',
                                metaTitle: activityData?.metaTitle || '',
                                metaDescription: activityData?.metaDescription || '',
                                content: activityData?.content || '',
                                displayCount: activityData?.displayCount || 0,
                                orderId: activityData?.orderId || 0,
                                title: activityData?.title || '',
                            };
                        })
                    );

                    return {
                        name: docData.name || '',
                        metaTitle: docData.metaTitle || '',
                        icon: docData.icon || '',
                        metaDescription: docData.metaDescription || '',
                        orderId: docData?.orderId || 0,
                        activities,
                    };
                })
            );

            return {
                result: "success",
                subjects: subjectsWithActivities
            };

        } catch (error) {
            console.error('Error fetching static subjects:', error);
            return {
                result: "error",
                message: "Failed to fetch static subjects."
            };
        }
    }
);

export default getStaticSubjectsHttp;