import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CreateNewUserResponse } from "../model/types/response";
import { CreateNewUserRequest } from "../model/types/request";
import { initUser } from "../utils/user";

const db = admin.firestore();

const createNewUser = functions.https.onCall(
    async (
        data: CreateNewUserRequest,
        context: functions.https.CallableContext,
    ): Promise<CreateNewUserResponse> => {
        try {
            if (!context.auth) {
                return { result: "error", message: "User is not authenticated." };
            }

            const { id, name, email, image, limit, movement, isAcceptTerms } = data;
            const user = initUser(id, name, email, image, limit, movement, isAcceptTerms);
            const { id: userId, ...restUser } = user;

            await db.collection("users").doc(id).set(restUser);
            return { result: "success", user };
        } catch (error) {
            console.error("Failed to add user.", error);
            return { result: "error", message: "Failed to add user." };
        }
    },
);

export default createNewUser;
