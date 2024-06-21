import { DbMsg } from "../model/types/msg";

export const initMsgToDB = (msg: string, type: string, userId: string) => {
    return {
        msg,
        type,
        userId,
    } as DbMsg;
};
