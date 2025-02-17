import { v4 as uuidv4 } from "uuid";
import { Activity, StaticActivities } from "../models/types/activity";

export const convertActivityType = (activity: StaticActivities, userId?: string): Activity => {
    const tt: Activity = {
        id: uuidv4(),
        updatedAt: "",
        fetchCount: 0,
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
    }
    return tt;
}

export const updateActivityWithContent = (activity: Activity, content: string) => {
    return {
        ...activity,
        activity: content,
    } as Activity;
}