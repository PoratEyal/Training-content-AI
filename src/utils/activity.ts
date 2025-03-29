import { v4 as uuidv4 } from "uuid";
import { Activity, StaticActivities } from "../models/types/activity";
import { getCurrentTime } from "./time";
import { Lng } from "../models/types/common";

export const convertActivityType = (
    activity: StaticActivities,
    userId?: string,
    lang: Lng = "he",
): Activity => {
    const tt: Activity = {
        id: uuidv4(),
        fetchCount: 0,
        createdAt: getCurrentTime(lang),
        savedAt: getCurrentTime(lang),
        likes: 0,
        category: "contant",
        grade: "",
        amount: "",
        place: "",
        gender: "",
        subject: activity.title,
        time: "",
        activity: activity.content,
        userId,
    };
    return tt;
};

export const updateActivityWithContent = (activity: Activity, content: string) => {
    return {
        ...activity,
        activity: content,
    } as Activity;
};
