import * as functions from "firebase-functions";
import { AddMovmentRequest } from "../model/types/request";
import * as admin from "firebase-admin";
import { CollectionDB } from "../model/enum/DB";
import { AddMovmentResponse } from "../model/types/response";
import { initMovment } from "../utils/movement";

const db = admin.firestore();

const addMovment = functions.https.onCall(
    async (data: AddMovmentRequest): Promise<AddMovmentResponse> => {
        try {
            const { name, title } = data;
            const movement = initMovment(name, title);

            await db.collection(CollectionDB.MOVMENT).add(movement);
            return { result: "success", movement };
        } catch (error) {
            console.error("Failed to create movement.", error);
            return { result: "error", message: "Failed to create movement." };
        }
    },
);

export default addMovment;
