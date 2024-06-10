import * as functions from "firebase-functions";
import { FormatUserRequest } from "../model/types/request";
import { CollectionDB } from "../model/enum/DB";
import { UpdateUserResponse } from "../model/types/response";
import { db } from "../index";

const formatUser = functions.https.onCall(
    async (data: FormatUserRequest): Promise<UpdateUserResponse> => {
        const { ids } = data;
        console.log("Formatting user: ", ids);
        try {
            for (const id of ids) {
                console.log("Updating user: ", id);
                const userDoc = await db.collection(CollectionDB.USERS).doc(id).get();
                const userData = userDoc.data();
                if (userDoc.exists && userData) {
                    const userRef = db.collection(CollectionDB.USERS).doc(id);
                    const updates = {
                        movement: userData.movement?.movement || null,
                        grade: userData.movement?.grade || null,
                        gender: userData.movement?.gender || null,
                        amount: userData.movement?.amount || null,
                        place: userData.movement?.place || null,
                    };
                    await userRef.update(updates);
                }
            }
            return {
                result: "success",
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

export default formatUser;
