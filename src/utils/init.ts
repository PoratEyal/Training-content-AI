import { DocumentData } from "firebase/firestore";
import { Activity } from "../models/types/activity";
import { getUpdateAt } from "./time";

export const initActivityFromDB = (data: DocumentData) => {
    return {
        updatedAt: data.updatedAt,
        fetchCount: data.fetchCount,
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

export const initActivityFromAI = (
    activity: string,
    path: string,
    subject: string,
    time: string,
    amount: string,
    grade: string,
    gender: string,
    place: string,
) => {
    return {
        updatedAt: getUpdateAt(),
        fetchCount: 0,
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
