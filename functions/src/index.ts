import cors from "cors";
import express from "express";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// === Init ===
admin.initializeApp();
const app = express();
app.use(cors());
const db = admin.firestore();
export { db };

// === Common Functions ===
import redirectToLang from "./callableFunctions/redirectToLang";
import noContent410 from "./callableFunctions/noContent410";
import updateLastLogin from "./callableFunctions/updateLastLogin";
import sendMsg from "./callableFunctions/sendMsg";
import updateIsMsg from "./callableFunctions/updateIsMsg";
import writeLogEvent from "./callableFunctions/writeLogEvent";
import createNewUser from "./callableFunctions/createNewUser";
import updateUser from "./callableFunctions/updateUser";

// === Youth Activities ===
import getActivity from "./callableFunctions/getActivity";
import getSavedActivities from "./callableFunctions/getSavedActivities";
import saveActivity from "./callableFunctions/saveActivity";
import removeSavedActivity from "./callableFunctions/removeSavedActivity";
import getStaticSubjectsHttp from "./callableFunctions/getStaticSubject";
import incrementActivityDisplayCount from "./callableFunctions/incrementActivityDisplayCount";
import getStaticActivityHttp from "./callableFunctions/getStaticActivity";
import addStaticActivity from "./callableFunctions/addStaticActivity";

// === Event ===
import getEventActivity from "./callableFunctions/getEventActivity";

// === Practice ===
import getPracticeQuestions from "./callableFunctions/getPracticeQuestions";

// === Words ===
import getWordsQuestions from "./callableFunctions/getWordsQuestions";
import translateText from "./callableFunctions/translateText";

// === Export Functions ===

// Common
exports.redirectToLang = redirectToLang;
exports.noContent410 = noContent410;
exports.updateLastLogin = updateLastLogin;
exports.sendMsg = sendMsg;
exports.updateIsMsg = updateIsMsg;
exports.createNewUser = createNewUser;
exports.updateUser = updateUser;
exports.writeLogEvent = writeLogEvent;

// Youth Activities
exports.getActivity = getActivity;
exports.getSavedActivities = getSavedActivities;
exports.saveActivity = saveActivity;
exports.removeSavedActivity = removeSavedActivity;
exports.getStaticSubjectsHttp = getStaticSubjectsHttp;
exports.incrementActivityDisplayCount = incrementActivityDisplayCount;
exports.getStaticActivity = getStaticActivityHttp;
exports.addStaticActivity = addStaticActivity;

// Event
exports.getEventActivity = getEventActivity;

// Practice
exports.getPracticeQuestions = getPracticeQuestions;

// Words
exports.getWordsQuestions = getWordsQuestions;
exports.translateText = translateText;

// Express App
exports.app = functions.https.onRequest(app);
