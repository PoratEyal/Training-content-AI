import * as functions from "firebase-functions";
import { GetMovmentsRequest } from "../model/types/request";
import * as admin from "firebase-admin";
import { CollectionDB } from "../model/enum/DB";
import { GetMovmentsResponse } from "../model/types/response";
import { initMovmentFromDB } from "../utils/movement";
import { Movement } from "../model/types/movement";

const db = admin.firestore();

const getActivity = functions.https.onCall(
    async (data: GetMovmentsRequest): Promise<GetMovmentsResponse> => {
        let query: admin.firestore.Query = db.collection(CollectionDB.MOVMENT);

        query = query.where("isForPublish", "==", true);

        try {
            const querySnapshot = await query.get();
            const movements = querySnapshot.docs.map((doc) => {
                return initMovmentFromDB(doc.id, doc.data());
            }) as Movement[];

            if (movements.length !== 0) {
                return { result: "success", movements };
            }
            return { result: "notFound", movements: [], message: "Failed to find Movements" };
        } catch (error) {
            console.error("Failed to retrieve activity.", error);
            return { result: "error", movements: [], message: "Failed to retrieve activity." };
        }
    },
);

export default getActivity;
