import { DbMsg } from "../model/types/msg";

export const initMsgToDB = (msg: string, userId: string) => {
    return {
        msg,
        userId,
    } as DbMsg;
};
