import * as functions from "firebase-functions";
import { CollectionDB } from "../model/enum/DB";
import { db } from "../index";
import { GetMsgResponse } from "../model/types/response";
import { GetMsgRequest } from "../model/types/request";
import { MsgType } from "../model/types/msg";

const getMsg = functions.https.onCall(
    async (
        _data: GetMsgRequest,
        context: functions.https.CallableContext,
    ): Promise<GetMsgResponse> => {
        if (!context.auth) {
            return { result: "error", message: "User is not authenticated." };
        }

        try {
            const msgRef = db.collection(CollectionDB.MSG);
            const snapshot = await msgRef.limit(1).get();

            if (snapshot.empty) {
                return { result: "notFound", message: "No message found." };
            }

            const msgDoc = snapshot.docs[0];
            const msg = msgDoc.data() as MsgType;

            return {
                result: "success",
                msg,
            };
        } catch (error) {
            console.error("Error getting message: ", error);
            return {
                result: "error",
                message: "Failed to get message.",
            };
        }
    },
);

export default getMsg;
