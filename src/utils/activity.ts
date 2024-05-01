import { DocumentData } from "firebase/firestore";
import { Activity, RawActivity } from "../models/types/activity";
import { getUpdateAt } from "./time";
import { PathName } from "../models/types/path";

export const initActivityFromDB = (data: DocumentData, id: string) => {
    return {
        id,
        updatedAt: data.updatedAt,
        fetchCount: data.fetchCount,
        likes: data.likes,
        path: data.path,
        grade: data.grade,
        amount: data.amount,
        place: data.place,
        gender: data.gender,
        subject: data.subject,
        time: data.time,
        activity: data.activity,
    } as Activity;
};

export const initActivityFromAI = (activity: string, path: PathName, rawActivity: RawActivity) => {
    const { subject, time, amount, grade, gender, place } = rawActivity;
    return {
        id: "",
        updatedAt: getUpdateAt(),
        fetchCount: 0,
        likes: 0,
        path,
        grade,
        amount,
        place,
        gender,
        subject,
        time,
        activity,
    } as Activity;
};

export const initRawActivity = (
    subject: string,
    time: string,
    amount: string,
    grade: string,
    gender: string,
    place: string,
) => {
    return {
        subject,
        time,
        amount,
        grade,
        gender,
        place,
    } as RawActivity;
};

export const updateActivityFetch = (activity: Activity) => {
    return {
        ...activity,
        fetchCount: activity.fetchCount + 1,
        updatedAt: getUpdateAt(),
    } as Activity;
};

export const updateActivityLike = (activity: Activity, number: number) => {
    return {
        ...activity,
        likes: activity.likes + number,
    } as Activity;
};
