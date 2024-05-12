import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { DeleteUserResponse } from "../model/types/response";
import { DeleteUserRequest } from "../model/types/request";

const db = admin.firestore();

const deleteUser = functions.https.onCall(
    async (
        data: DeleteUserRequest,
        context: functions.https.CallableContext,
    ): Promise<DeleteUserResponse> => {
        try {
            if (!context.auth) {
                return { result: "error", message: "User is not authenticated." };
            }

            const { userId } = data;

            // Check if the user ID is provided
            if (!userId) {
                return { result: "error", message: "User not found." };
            }

            // Delete the user document from Firestore
            await db.collection("users").doc(userId).delete();

            return { result: "success", message: "User deleted successfully." };
        } catch (error) {
            console.error("Failed to delete user.", error);
            return { result: "error", message: "Failed to add user." };
        }
    },
);

export default deleteUser;
