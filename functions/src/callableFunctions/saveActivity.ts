import * as functions from "firebase-functions";
import { SaveActivityRequest } from "../model/types/request";
import { db } from "../index";
import { SaveActivityResponse } from "../model/types/response";
import * as admin from "firebase-admin";
import { CollectionDB } from "../model/enum/DB";
import { updateActivityWithId } from "../utils/activity";
import { getCurrentTime } from "../utils/time";

const saveActivity = functions.https.onCall(
  async (
    data: SaveActivityRequest,
    context: functions.https.CallableContext,
  ): Promise<SaveActivityResponse> => {
    const { activity, lang } = data;

    if (!context.auth) {
      return { result: "error", message: "User is not authenticated." };
    }
    await admin.auth().setCustomUserClaims(context.auth.uid, { canEditUsers: true });

    try {
      const { id, ...restActivity } = activity;
      const now = getCurrentTime(lang);         

      if (id !== "ID") {
        const docRef = db.collection(CollectionDB.ACTIVITY).doc(id);
        const existingActivity = await docRef.get();

        if (existingActivity.exists) {
          await docRef.update({
            activity: activity.activity,
            savedAt: now,
          });
          return { result: "success", activity: { ...activity, savedAt: now } };
        }
      }

      const activityWithTimestamp = {
        ...restActivity,
        savedAt: now,
      };
      const docRef = await db.collection(CollectionDB.ACTIVITY).add(activityWithTimestamp);
      const updateActivity = updateActivityWithId(docRef.id, { ...activityWithTimestamp, id: docRef.id });

      return { result: "success", activity: updateActivity };
    } catch (error) {
      return { result: "error", message: "Failed to retrieve activity." };
    }
  }
);

export default saveActivity;
