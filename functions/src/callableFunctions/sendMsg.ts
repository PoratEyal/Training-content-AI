import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { SendMsgResponse } from "../model/types/response";
import { SendMsgRequest } from "../model/types/request";
import { CollectionDB } from "../model/enum/DB";
import { db } from "../index";
import { initMsgToDB } from "../utils/msg";

const sendMsg = functions.https.onCall(
    async (
        data: SendMsgRequest,
        context: functions.https.CallableContext,
    ): Promise<SendMsgResponse> => {
        try {
            if (context.auth) {
                const userId = context.auth.uid;
                await admin.auth().setCustomUserClaims(context.auth.uid, { canEditUsers: true });

                const msgDB = initMsgToDB(data.msg, userId);
                await db.collection(CollectionDB.MSG).doc(userId).set(msgDB);
                return { result: "success" };
            }
            return { result: "error", message: "User is not authenticated." };
        } catch (error) {
            console.error("Failed to send message.", error);
            return { result: "error", message: "Failed to send new message." };
        }
    },
);

export default sendMsg;
