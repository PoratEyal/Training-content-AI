import cors from "cors";
import express from "express";
import * as functions from "firebase-functions";
import ping from './callableFunctions/ping';
import getActivity from "./callableFunctions/getActivity"
import updateActivityLikes from "./callableFunctions/updateActivityLikes"
import createNewUser from "./callableFunctions/createNewUser"
import getUserById from "./callableFunctions/getUserById"
import updateUser from "./callableFunctions/updateUser"
import * as admin from "firebase-admin";
import getSavedActivities from "./callableFunctions/getSavedActivities";
import saveActivity from "./callableFunctions/saveActivity";
import removeSavedActivity from "./callableFunctions/removeSavedActivity";
import getStaticSubjectsHttp from "./callableFunctions/getStaticSubject";
import incrementActivityDisplayCount from "./callableFunctions/incrementActivityDisplayCount";
import getStaticActivityHttp from "./callableFunctions/getStaticActivity";
import sendMsg from "./callableFunctions/sendMsg";
import getMsg from "./callableFunctions/getMsg";
import updateIsMsg from "./callableFunctions/updateIsMsg";
import addStaticActivity from "./callableFunctions/addStaticActivity";

const app = express();
app.use(cors());

admin.initializeApp();
const db = admin.firestore();
export { db };

exports.ping = ping;


exports.getActivity = getActivity;
exports.updateLikes = updateActivityLikes;

exports.createNewUser = createNewUser;
exports.updateUser = updateUser
exports.getUserById = getUserById;

exports.getStaticSubjectsHttp = getStaticSubjectsHttp;
exports.getStaticActivity = getStaticActivityHttp;
exports.incrementActivityDisplayCount = incrementActivityDisplayCount;

exports.getSavedActivities = getSavedActivities;
exports.saveActivity = saveActivity;
exports.removeSavedActivity = removeSavedActivity;

exports.sendMsg = sendMsg;
exports.getMsg = getMsg;
exports.updateIsMsg = updateIsMsg;
exports.addStaticActivity = addStaticActivity;

exports.app = functions.https.onRequest(app);
