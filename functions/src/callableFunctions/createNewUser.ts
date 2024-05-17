import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CreateNewUserResponse } from "../model/types/response";
import { CreateNewUserRequest } from "../model/types/request";
import { CollectionDB } from "../model/enum/DB";
import { db } from "../index";

const createNewUser = functions.https.onCall(
    async (
        data: CreateNewUserRequest,
        context: functions.https.CallableContext,
    ): Promise<CreateNewUserResponse> => {
        try {
            if (!context.auth) {
                return { result: "error", message: "User is not authenticated." };
            }
            await admin.auth().setCustomUserClaims(context.auth.uid, { canEditUsers: true });

            const { newUser } = data;
            const { id: userId, ...restUser } = newUser;

            await db.collection(CollectionDB.USERS).doc(userId).set(restUser);
            return { result: "success", user: newUser };
        } catch (error) {
            console.error("Failed to add user.", error);
            return { result: "error", message: "Failed to add user." };
        }
    },
);

export default createNewUser;
