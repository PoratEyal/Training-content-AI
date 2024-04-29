import { doc, collection, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { MIN_ACTIVITIES } from "../models/constants/state";
import { initActivityFromAI, initActivityFromDB, updateActivityFromDB } from "../utils/init";
import { addActivity, getActivity, updateActivity } from "../utils/db";
import { PathActivity } from "../models/constants/path";
import { ActivityFunc } from "../models/types/activity";
import { PathName } from "../models/types/path";
import {
    getContentActivity,
    getPlayingTime,
    getPointOfView,
    getScoutingTime,
} from "./geminiPrompts";

export const buildPointOfViewActivity = async (
    subject: string,
    time: string,
    amount: string,
    grade: string,
    gender: string,
    place: string,
) => {
    return await buildActivity(
        getPointOfView,
        PathActivity.pointOfView.path,
        subject,
        time,
        amount,
        grade,
        gender,
        place,
    );
};

export const buildContentActivityActivity = async (
    subject: string,
    time: string,
    amount: string,
    grade: string,
    gender: string,
    place: string,
) => {
    return await buildActivity(
        getContentActivity,
        PathActivity.contentActivity.path,
        subject,
        time,
        amount,
        grade,
        gender,
        place,
    );
};

export const buildScoutingTimeActivity = async (
    subject: string,
    time: string,
    amount: string,
    grade: string,
    gender: string,
    place: string,
) => {
    return await buildActivity(
        getScoutingTime,
        PathActivity.scoutingTime.path,
        subject,
        time,
        amount,
        grade,
        gender,
        place,
    );
};

export const buildPlayingTimeActivity = async (
    subject: string,
    time: string,
    amount: string,
    grade: string,
    gender: string,
    place: string,
) => {
    return await buildActivity(
        getPlayingTime,
        PathActivity.playingTime.path,
        subject,
        time,
        amount,
        grade,
        gender,
        place,
    );
};

export const buildActivity = async (
    funcAI: ActivityFunc,
    path: PathName,
    subject: string,
    time: string,
    amount: string,
    grade: string,
    gender: string,
    place: string,
) => {
    const activityRef = collection(db, "activity");
    const snapshot = await getActivity(activityRef, subject, time, amount, grade, gender, place);
    const { empty, size, docs } = snapshot;

    if (empty || size === 0 || docs.length <= MIN_ACTIVITIES) {
        return buildActivityFromAI(funcAI, path, subject, time, amount, grade, gender, place);
    } else {
        buildActivityFromDB(docs);
    }
};

export const buildActivityFromAI = async (
    funcAI: ActivityFunc,
    path: PathName,
    subject: string,
    time: string,
    amount: string,
    grade: string,
    gender: string,
    place: string,
) => {
    const activityRef = collection(db, "activity");
    const text = await funcAI(subject, time, amount, grade, gender, place);
    const activity = initActivityFromAI(text, path, subject, time, amount, grade, gender, place);
    await addActivity(activityRef, activity);
    return activity.activity;
};

const buildActivityFromDB = async (docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]) => {
    const randomIndex = Math.floor(Math.random() * docs.length);
    const randomDocs = docs[randomIndex];
    const activity = initActivityFromDB(randomDocs.data());
    const docRef = doc(db, "activity", randomDocs.id);
    const updatedActivity = updateActivityFromDB(activity);
    await updateActivity(docRef, updatedActivity);
    return activity.activity;
};
