import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CreateNewUserResponse } from "../model/types/response";
import { CreateNewUserRequest } from "../model/types/request";
import { CollectionDB } from "../model/enum/DB";
import { db } from "../index";
import { initUserToDB, initUserFromDB, initUserFromReq } from "../utils/user";

const createNewUser4Practice = functions.https.onCall(
  async (
    data: CreateNewUserRequest,
    context: functions.https.CallableContext
  ): Promise<CreateNewUserResponse> => {
    try {
      if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "User is not authenticated.");
      }

      const userId = context.auth.uid;

      await admin.auth().setCustomUserClaims(userId, { canEditUsers: true });

      const userDoc = await db.collection(CollectionDB.USERS_SmartPractice).doc(userId).get();
      const userData = userDoc.data();

      if (userDoc.exists && userData) {
        return { result: "success", user: initUserFromDB(userId, userData) };
      } else {
        const userDB = initUserToDB(data.rawUser);
        await db.collection(CollectionDB.USERS_SmartPractice).doc(userId).set(userDB);
        return { result: "success", user: initUserFromReq(userId, userDB) };
      }
    } catch (error: any) {
      console.error("❌ Failed to create user:", error);
      throw new functions.https.HttpsError("internal", error.message || "Failed to create new user.");
    }
  }
);

export default createNewUser4Practice;
