import * as functions from "firebase-functions";
import { Request, Response } from "express";

const noContent410 = functions
  .region("us-central1")
  .https.onRequest((req: Request, res: Response) => {
    res.redirect(301, "https://activitywiz.com");
  });

export default noContent410;
