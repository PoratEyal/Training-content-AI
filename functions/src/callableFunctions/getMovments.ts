import * as functions from "firebase-functions";
import { GetMovmentsRequest } from "../model/types/request";
import * as admin from "firebase-admin";
import { CollectionDB } from "../model/enum/DB";
import { GetMovmentsResponse } from "../model/types/response";
import { initMovmentFromDB } from "../utils/movment";
import { Movment } from "../model/types/movment";

const db = admin.firestore();

const getActivity = functions.https.onCall(
    async (data: GetMovmentsRequest): Promise<GetMovmentsResponse> => {
        let query: admin.firestore.Query = db.collection(CollectionDB.MOVMENT);

        query = query.where("isForPublish", "==", true);

        try {
            const querySnapshot = await query.get();
            const movments = querySnapshot.docs.map((doc) => {
                return initMovmentFromDB(doc.id, doc.data());
            }) as Movment[];

            if (movments.length !== 0) {
                return { result: "success", movments };
            }
            return { result: "notFound", movments: [], message: "Failed to find Movments" };
        } catch (error) {
            console.error("Failed to retrieve activity.", error);
            return { result: "error", movments: [], message: "Failed to retrieve activity." };
        }
    },
);

export default getActivity;
