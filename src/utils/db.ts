import {
    getDocs,
    addDoc,
    updateDoc,
    query,
    where,
    DocumentData,
    CollectionReference,
    DocumentReference,
} from "firebase/firestore";
import { Activity } from "../models/types/activity";

export const getActivity = async (
    activityRef: CollectionReference<DocumentData, DocumentData>,
    subject: string,
    time: string,
    amount: string,
    grade: string,
    gender: string,
    place: string,
) => {
    const q = query(
        activityRef,
        where("subject", "==", subject),
        where("time", "==", time),
        where("amount", "==", amount),
        where("grade", "==", grade),
        where("gender", "==", gender),
        where("place", "==", place),
    );

    const snapshot = await getDocs(q);
    return snapshot;
};

export const addActivity = async (
    activityRef: CollectionReference<DocumentData, DocumentData>,
    activity: Activity,
) => {
    await addDoc(activityRef, activity);
};

export const updateActivity = async (
    activityRef: DocumentReference<DocumentData, DocumentData>,
    activity: Activity,
) => {
    await updateDoc(activityRef, activity);
};
