import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CollectionDB } from "../model/enum/DB";
import { GetUserByIdRequest } from "../model/types/request";
import { GetUserByIdResponse } from "../model/types/response";
import { initUserFromDB } from "../utils/user";

const db = admin.firestore();

const getUserById = functions.https.onCall(
    async (
        data: GetUserByIdRequest,
        context: functions.https.CallableContext,
    ): Promise<GetUserByIdResponse> => {
        try {
            if (!context.auth) {
                return { result: "error", message: "User is not authenticated." };
            }
            await admin.auth().setCustomUserClaims(context.auth.uid, { canEditUsers: true });

            const { id } = data;
            const userDoc = await db.collection(CollectionDB.USERS).doc(id).get();

            const userData = userDoc.data();
            if (userDoc.exists && userData) {
                const user = initUserFromDB(id, userData);
                return { result: "success", user };
            }
            return { result: "notFound", message: "User not found." };
        } catch (error) {
            console.error("Failed to add user.", error);
            return { result: "error", message: "Failed to get user." };
        }
    },
);

export default getUserById;
