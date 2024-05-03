import cors from "cors";
import express from "express";
import * as functions from "firebase-functions";
import ping from './callableFunctions/ping';
import getActivity from "./callableFunctions/getActivity"

const app = express();
app.use(cors());

exports.ping = ping;
exports.getActivity = getActivity;

exports.app = functions.https.onRequest(app);

//https://www.youtube.com/watch?v=fz3w2m4F_K8
//https://www.youtube.com/watch?v=awd_oYcmrRA
//https://www.youtube.com/watch?v=P0Udy2Gi7n8
