import * as functions from "firebase-functions";
import { GetAllUsersRequest } from "../model/types/request";
import * as admin from "firebase-admin";
import { CollectionDB } from "../model/enum/DB";
import { getAllUsersResponse } from "../model/types/response";
import { defineString } from "firebase-functions/params";
import { db } from "../index";

const getAllUsers = functions.https.onCall(
    async (
        _: GetAllUsersRequest,
        context: functions.https.CallableContext,
    ): Promise<getAllUsersResponse> => {
        if (!context.auth || context.auth.uid !== defineString("ADMIN").value()) {
            return { result: "error", message: "User is not authenticated." };
        }
        await admin.auth().setCustomUserClaims(context.auth.uid, { canEditUsers: true });

        try {
            const snapshot = await db.collection(CollectionDB.USERS).limit(2000).get();
            const data = snapshot.docs.map((doc) => {
                const ac = doc.data();
                ac.uid = doc.id;
                delete ac.activity;
                return ac;
            });
            if (data) {
                return { result: "success", users: data };
            }
            return { result: "success", message: "No users." };
        } catch (error) {
            return { result: "error", message: "Something want wrong." };
        }
    },
);

export default getAllUsers;
