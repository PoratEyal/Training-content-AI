import { collection } from "firebase/firestore";
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

export const buildPointOfViewActivity = async (subject, time, amount, grade, gender, place) => {
    const activityRef = collection(db, "activity");
    const snapshot = await getActivity(activityRef, subject, time, amount, grade, gender, place);

    if (snapshot.empty || snapshot.size === 0 || snapshot.docs.length <= MIN_ACTIVITIES) {
        const activityAI = await getPointOfView(subject, time, amount, grade, gender, place);
        const activity = initActivityFromAI(
            activityAI,
            "pointOfView",
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
        const activities = snapshot.docs.map((doc) => {
            const data = doc.data();
            return initActivityFromDB(data);
        });
        const activityBD = activities[Math.floor(Math.random() * activities.length)];
        return activityBD.activity;
    }
};

export const buildContentActivityActivity = async (subject, time, amount, grade, gender, place) => {
    const activityRef = collection(db, "activity");
    const snapshot = await getActivity(activityRef, subject, time, amount, grade, gender, place);

    if (snapshot.empty || snapshot.size === 0 || snapshot.docs.length <= MIN_ACTIVITIES) {
        const activityAI = await getContentActivity(subject, time, amount, grade, gender, place);
        const activity = initActivityFromAI(
            activityAI,
            "contentActivity",
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
        const activities = snapshot.docs.map((doc) => {
            const data = doc.data();
            return initActivityFromDB(data);
        });
        const activityBD = activities[Math.floor(Math.random() * activities.length)];
        return activityBD.activity;
    }
};

export const buildScoutingTimeActivity = async (subject, time, amount, grade, gender, place) => {
    const activityRef = collection(db, "activity");
    const snapshot = await getActivity(activityRef, subject, time, amount, grade, gender, place);

    if (snapshot.empty || snapshot.size === 0 || snapshot.docs.length <= MIN_ACTIVITIES) {
        const activityAI = await getScoutingTime(subject, time, amount, grade, gender, place);
        const activity = initActivityFromAI(
            activityAI,
            "scoutingTime",
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
        const activities = snapshot.docs.map((doc) => {
            const data = doc.data();
            return initActivityFromDB(data);
        });
        const activityBD = activities[Math.floor(Math.random() * activities.length)];
        return activityBD.activity;
    }
};

export const buildPlayingTimeActivity = async (subject, time, amount, grade, gender, place) => {
    const activityRef = collection(db, "activity");
    const snapshot = await getActivity(activityRef, subject, time, amount, grade, gender, place);

    if (snapshot.empty || snapshot.size === 0 || snapshot.docs.length <= MIN_ACTIVITIES) {
        const activityAI = await getPlayingTime(subject, time, amount, grade, gender, place);
        const activity = initActivityFromAI(
            activityAI,
            "playingTime",
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
        const activities = snapshot.docs.map((doc) => {
            const data = doc.data();
            return initActivityFromDB(data);
        });
        const activityBD = activities[Math.floor(Math.random() * activities.length)];
        return activityBD.activity;
    }
};
