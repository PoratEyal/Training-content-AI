import * as functions from "firebase-functions";
import { UpdateActivityLikesRequest } from "../model/types/request";
import { CollectionDB } from "../model/enum/DB";
import { UpdateActivityLikesResponse } from "../model/types/response";
import { db } from "../index";

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
            return {
                result: "error",
                message: "Failed to update activity.",
            };
        }
    },
);

export default updateActivityLikes;
