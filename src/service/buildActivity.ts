import { DocumentData, QuerySnapshot, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { MIN_ACTIVITIES } from "../models/constants/state";
import {
    getContentActivity,
    getPlayingTime,
    getPointOfView,
    getScoutingTime,
} from "./openAiPrompts";
import { initActivityFromAI, initActivityFromDB } from "../utils/init";
import { addActivity, getActivity } from "../utils/db";
import { PathActivity } from "../models/constants/path";

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

const buildActivity = async (
    funcAI: (
        subject: string,
        time: string,
        amount: string,
        age: string,
        gender: string,
        place: string,
    ) => Promise<any>,
    path: string,
    subject: string,
    time: string,
    amount: string,
    grade: string,
    gender: string,
    place: string,
) => {
    const activityRef = collection(db, "activity");
    const snapshot = await getActivity(activityRef, subject, time, amount, grade, gender, place);

    if (snapshot.empty || snapshot.size === 0 || snapshot.docs.length <= MIN_ACTIVITIES) {
        const data = await funcAI(subject, time, amount, grade, gender, place);
        const activity = initActivityFromAI(
            data,
            path,
            subject,
            time,
            amount,
            grade,
            gender,
            place,
        );
        await addActivity(activityRef, activity);
        return activity.activity;
    } else {
        return activityFromDB(snapshot);
    }
};

const activityFromDB = (snapshot: QuerySnapshot<unknown, DocumentData>) => {
    const activities = snapshot.docs.map((doc) => {
        const data = doc.data();
        return initActivityFromDB(data);
    });
    const activityBD = activities[Math.floor(Math.random() * activities.length)];
    return activityBD.activity;
};
