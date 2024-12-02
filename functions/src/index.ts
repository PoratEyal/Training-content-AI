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
import { getStaticSubjectsHttp } from './callableFunctions/getStaticSubject';
import { incrementActivityDisplayCount } from "./callableFunctions/incrementActivityDisplayCount";

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
exports.incrementActivityDisplayCount = incrementActivityDisplayCount;

exports.app = functions.https.onRequest(app);
