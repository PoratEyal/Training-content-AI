import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { UpdateUserRequest } from "../model/types/request";
import { CollectionDB } from "../model/enum/DB";
import { UpdateUserResponse } from "../model/types/response";
import { db } from "../index";

const updateUser = functions.https.onCall(
    async (
        data: UpdateUserRequest,
        context: functions.https.CallableContext,
    ): Promise<UpdateUserResponse> => {
        const { user } = data;

        if (!context.auth) {
            return { result: "error", message: "User is not authenticated." };
        }
        await admin.auth().setCustomUserClaims(context.auth.uid, { canEditUsers: true });

        try {
            const updates = {
                movement: user.movement?.movement || null,
                grade: user.movement?.grade || null,
                gender: user.movement?.gender || null,
                amount: user.movement?.amount || null,
                // place: user.movement?.place || null,
            };
            const userRef = db.collection(CollectionDB.USERS).doc(user.id);
            await userRef.update(updates);
            return {
                result: "success",
                user: { ...user, movement: user.movement },
            };
        } catch (error) {
            console.error("Error updating user: ", error);
            return {
                result: "error",
                message: "Failed to update user.",
            };
        }
    },
);

export default updateUser;
