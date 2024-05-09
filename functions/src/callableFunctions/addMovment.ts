import * as functions from "firebase-functions";
import { AddMovmentRequest } from "../model/types/request";
import * as admin from "firebase-admin";
import { CollectionDB } from "../model/enum/DB";
import { AddMovmentResponse } from "../model/types/response";
import { initMovment } from "../utils/movment";

const db = admin.firestore();

const addMovment = functions.https.onCall(
    async (data: AddMovmentRequest): Promise<AddMovmentResponse> => {
        try {
            const { name, path } = data;
            const movment = initMovment(name, path);

            await db.collection(CollectionDB.MOVMENT).add(movment);
            return { result: "success", movment };
        } catch (error) {
            console.error("Failed to create movment.", error);
            return { result: "error", message: "Failed to create movment." };
        }
    },
);

export default addMovment;
