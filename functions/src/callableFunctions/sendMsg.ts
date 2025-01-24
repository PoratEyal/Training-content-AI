import * as functions from "firebase-functions";
import { CollectionDB } from "../model/enum/DB";
import { db } from "../index";
import { SendMsgResponse } from "../model/types/response";
import { SendMsgRequest } from "../model/types/request";

const sendMsg = functions.https.onCall(
    async (
        data: SendMsgRequest,
        context: functions.https.CallableContext,
    ): Promise<SendMsgResponse> => {
        const { password } = data;

        if (!context.auth) {
            return { result: "error", message: "User is not authenticated." };
        }

        if (password !== "wiz24") {
            return { result: "error", message: "Invalid password." };
        }

        try {
            const usersRef = db.collection(CollectionDB.USERS);
            const snapshot = await usersRef.get();
            
            const batch = db.batch();
            snapshot.docs.forEach((doc) => {
                batch.update(doc.ref, { isSendMsg: true });
            });
            
            await batch.commit();

            return {
                result: "success",
                message: "Successfully updated all users.",
            };
        } catch (error) {
            console.error("Error updating users: ", error);
            return {
                result: "error",
                message: "Failed to update users.",
            };
        }
    },
);

export default sendMsg;
