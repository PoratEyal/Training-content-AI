import { getDocs, addDoc, query, where, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { Activity } from "../models/types/activity";

export const getActivity = async (activityRef, subject, time, amount, grade, gender, place) => {
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

export const addActivity = async (activityRef, activity: Activity) => {
    await addDoc(activityRef, activity);
};
