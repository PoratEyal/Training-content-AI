import { doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { updateActivityLike } from "../utils/activity";
import { updateActivity } from "../utils/DB/activityDB";
import { Activity } from "../models/types/activity";

export const likeActivity = async (activity: Activity) => {
    return await buildActivity(activity, 1);
};

export const dislikeActivity = async (activity: Activity) => {
    return await buildActivity(activity, -1);
};

export const buildActivity = async (activity: Activity, number: number) => {
    const docRef = doc(db, "activity", activity.id);
    const updatedActivity = updateActivityLike(activity, number);
    await updateActivity(docRef, updatedActivity);
    return activity.activity;
};
