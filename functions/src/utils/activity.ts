import { Activity } from "../model/types/activity";
import { GetActivityRequest } from "../model/types/request";
import { getUpdateAt } from "./time";

export const initActivityFromAI = (text: string, data: GetActivityRequest, userId: string) => {
    const { category, subject, time, amount, grade, gender, place, religion, contest, tools, info } = data;
    return {
        id: "ID",
        updatedAt: getUpdateAt(),
        fetchCount: 0,
        likes: 0,
        activity: text,
        category,
        grade,
        amount,
        place,
        gender,
        subject,
        time,
        religion,
        contest,
        tools,
        info,
        userId,
    } as Activity;
};

export const updateActivityWithId = (id: string, activity: Activity) => {
    return {
        ...activity,
        id,
    } as Activity;
};
