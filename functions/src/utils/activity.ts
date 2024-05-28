import { DocumentData } from "firebase-admin/firestore";
import { Activity } from "../model/types/activity";
import { GetActivityRequest } from "../model/types/request";
import { getUpdateAt } from "./time";

export const initActivityFromDB = (id: string, data: DocumentData, userId: string) => {
    return {
        id,
        updatedAt: data.updatedAt || "",
        fetchCount: data.fetchCount || 0,
        likes: data.likes || 0,
        path: data.path || "",
        grade: data.grade || "",
        amount: data.amount || "",
        place: data.place || "",
        gender: data.gender || "",
        subject: data.subject || "",
        time: data.time || "",
        activity: data.activity || "",
        userId,
    } as Activity;
};

export const initActivityFromAI = (text: string, data: GetActivityRequest, userId: string) => {
    const { parts, mainSubject, time, amount, grade, gender, place } = data;
    return {
        id: "",
        updatedAt: getUpdateAt(),
        fetchCount: 0,
        likes: 0,
        activity: text,
        path: parts[0].name,
        grade,
        amount,
        place,
        gender,
        subject: mainSubject,
        time,
        userId,
    } as Activity;
};

export const updateActivityWithId = (id: string, activity: Activity) => {
    return {
        ...activity,
        id,
    } as Activity;
};
