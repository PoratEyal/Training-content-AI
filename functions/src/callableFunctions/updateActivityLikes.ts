import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { UpdateActivityLikesRequest } from "../model/types/request";
import { CollectionDB } from "../model/enum/DB";
import { UpdateActivityLikesResponse } from "../model/types/response";

const db = admin.firestore();

const updateActivityLikes = functions.https.onCall(
    async (data: UpdateActivityLikesRequest): Promise<UpdateActivityLikesResponse> => {
        const { activity, likesAmount } = data;

        try {
            const updates = {
                likes: activity.likes + likesAmount,
            };
            const activityRef = db.collection(CollectionDB.ACTIVITY).doc(activity.id);
            await activityRef.update(updates);
            return {
                result: "success",
                activity: { ...activity, likes: activity.likes + likesAmount },
            };
        } catch (error) {
            console.error("Error updating activity: ", error);
            return {
                result: "error",
                message: "Failed to update activity.",
            };
        }
    },
);

export default updateActivityLikes;
