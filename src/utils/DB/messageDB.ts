import { addDoc, DocumentData, CollectionReference } from "firebase/firestore";
import { Message } from "../../models/types/message";

export const addMessage = async (
    msgRef: CollectionReference<DocumentData, DocumentData>,
    msg: Message,
) => {
    await addDoc(msgRef, msg);
};
