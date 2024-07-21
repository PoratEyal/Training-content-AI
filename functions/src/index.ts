import cors from "cors";
import express from "express";
import * as functions from "firebase-functions";
import ping from './callableFunctions/ping';
import getActivityTest from "./callableFunctions/getActivityTest"
import updateActivityLikes from "./callableFunctions/updateActivityLikes"
import createNewUser from "./callableFunctions/createNewUser"
import getUserById from "./callableFunctions/getUserById"
import updateUserTest from "./callableFunctions/updateUserTest"
import * as admin from "firebase-admin";
// import formatUser from "./callableFunctions/formatUser"
// import getAllActivities from "./callableFunctions/getAllActivities";
// import getAllUsers from "./callableFunctions/getAllUsers";

const app = express();
app.use(cors());

admin.initializeApp();
const db = admin.firestore();
export { db };

exports.ping = ping;


exports.getActivityTest = getActivityTest;
exports.updateLikes = updateActivityLikes;

exports.createNewUser = createNewUser;
exports.updateUserTest = updateUserTest
exports.getUserById = getUserById;

// exports.getAllActivities = getAllActivities;
// exports.getAllUsers = getAllUsers;
// exports.formatUser = formatUser;

exports.app = functions.https.onRequest(app);

//https://www.youtube.com/watch?v=fz3w2m4F_K8
//https://www.youtube.com/watch?v=awd_oYcmrRA
//https://www.youtube.com/watch?v=P0Udy2Gi7n8
