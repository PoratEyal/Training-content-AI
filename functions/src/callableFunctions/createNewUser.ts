import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CreateNewUserResponse } from "../model/types/response";
import { CreateNewUserRequest } from "../model/types/request";
import { CollectionDB } from "../model/enum/DB";
import { db } from "../index";
import { initUser, initUserFromDB } from "../utils/user";

const createNewUser = functions.https.onCall(
    async (
        data: CreateNewUserRequest,
        context: functions.https.CallableContext,
    ): Promise<CreateNewUserResponse> => {
        try {
            if (context.auth) {
                const userId = context.auth.uid;
                await admin.auth().setCustomUserClaims(context.auth.uid, { canEditUsers: true });

                const userDoc = await db.collection(CollectionDB.USERS).doc(userId).get();
                const userData = userDoc.data();
                if (userDoc.exists && userData) {
                    return { result: "success", user: initUserFromDB(userId, userData) };
                } else{
                    const newUser = initUser(data.rawUser);
                    const { id, ...restUser } = newUser;
                    await db.collection(CollectionDB.USERS).doc(id).set(restUser);
                    return { result: "success", user: newUser };
                }
            }
            return { result: "error", message: "User is not authenticated." };
        } catch (error) {
            console.error("Failed to add user.", error);
            return { result: "error", message: "Failed to create new user." };
        }
    },
);

export default createNewUser;
