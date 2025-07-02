import * as functions from "firebase-functions";
import { CollectionDB } from "../model/enum/DB";
import { db } from "../index";
import { UpdateIsMsgResponse } from "../model/types/response";
import { UpdateIsMsgRequest } from "../model/types/request";

const updateIsMsg = functions.https.onCall(
    async (
        data: UpdateIsMsgRequest,
        context: functions.https.CallableContext,
    ): Promise<UpdateIsMsgResponse> => {
        if (!context.auth) {
            return { result: "error", message: "User is not authenticated." };
        }

        const { userId } = data;

        try {
            const userRef = db.collection(CollectionDB.USERS).doc(userId);
            await userRef.update({
                isSendMsg: false
            });

            return {
                result: "success",
                message: "Successfully updated user's isSendMsg status.",
            };
        } catch (error) {
            return {
                result: "error",
                message: "Failed to update user's isSendMsg status.",
            };
        }
    },
);

export default updateIsMsg;
