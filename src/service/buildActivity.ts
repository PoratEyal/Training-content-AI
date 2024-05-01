import { doc, collection, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { MIN_ACTIVITIES } from "../models/constants/state";
import {
    initActivityFromAI,
    initActivityFromDB,
    initRawActivity,
    updateActivityFetch,
} from "../utils/activity";
import { addActivity, getActivity, updateActivity } from "../utils/DB/activityDB";
import { PathActivity } from "../models/constants/path";
import { PathName } from "../models/types/path";
import { GeminiFunctionsSet } from "./geminiPrompts";
import { RawActivity } from "../models/types/activity";

export const buildPointOfViewActivity = async (
    subject: string,
    time: string,
    amount: string,
    grade: string,
    gender: string,
    place: string,
) => {
    const rawActivity = initRawActivity(subject, time, amount, grade, gender, place);
    return await buildActivity(PathActivity.pointOfView.path, rawActivity);
};

export const buildContentActivityActivity = async (
    subject: string,
    time: string,
    amount: string,
    grade: string,
    gender: string,
    place: string,
) => {
    const rawActivity = initRawActivity(subject, time, amount, grade, gender, place);
    return await buildActivity(PathActivity.contentActivity.path, rawActivity);
};

export const buildScoutingTimeActivity = async (
    subject: string,
    time: string,
    amount: string,
    grade: string,
    gender: string,
    place: string,
) => {
    const rawActivity = initRawActivity(subject, time, amount, grade, gender, place);
    return await buildActivity(PathActivity.scoutingTime.path, rawActivity);
};

export const buildPlayingTimeActivity = async (
    subject: string,
    time: string,
    amount: string,
    grade: string,
    gender: string,
    place: string,
) => {
    const rawActivity = initRawActivity(subject, time, amount, grade, gender, place);
    return await buildActivity(PathActivity.playingTime.path, rawActivity);
};


/**
 * Builds an activity based on the specified activity data.
 * Determines whether to build the activity from AI or from an existing database entry.
 * @param path - type of activity.
 * @param rawActivity - activity details.
 * @returns The built activity.
 */
export const buildActivity = async (path: PathName, rawActivity: RawActivity) => {
    const activityRef = collection(db, "activity");
    const snapshot = await getActivity(activityRef, rawActivity);
    const { empty, size, docs } = snapshot;

    if (empty || size === 0 || docs.length <= MIN_ACTIVITIES) {
        return buildActivityFromAI(path, rawActivity);
    } else {
        buildActivityFromDB(docs);
    }
};


/**
 * Builds an activity from Gemini AI based on the specified activity data.
 * @param path - type of activity.
 * @param rawActivity - activity details.
 * @returns The built activity.
 */
export const buildActivityFromAI = async (path: PathName, rawActivity: RawActivity) => {
    const { subject, time, amount, grade, gender, place } = rawActivity;
    const activityRef = collection(db, "activity");
    const geminiAiFunc = GeminiFunctionsSet[path];
    const result = await geminiAiFunc(subject, time, amount, grade, gender, place);
    const activity = initActivityFromAI(result, path, rawActivity);
    await addActivity(activityRef, activity);
    return activity.activity;
};


/**
 * Builds an activity from an existing database entry based on the specified documents.
 * Updates the activity fetch count and last updated time.
 * @param docs - QueryDocumentSnapshot containing the activity data.
 * @returns The built activity.
 */
const buildActivityFromDB = async (docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]) => {
    const randomIndex = Math.floor(Math.random() * docs.length);
    const randomDocs = docs[randomIndex];
    const activity = initActivityFromDB(randomDocs.data(), randomDocs.id);
    const docRef = doc(db, "activity", randomDocs.id);
    const updatedActivity = updateActivityFetch(activity);
    await updateActivity(docRef, updatedActivity);
    return activity.activity;
};
