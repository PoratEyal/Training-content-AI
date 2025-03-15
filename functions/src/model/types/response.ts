import { DocumentData } from "firebase-admin/firestore";
import { Activity, StaticActivities, StaticSubject } from "./activity";
import { User } from "./user";
import { MsgType } from "./msg";

export type Response = "success" | "notFound" | "safety" | "limit" | "error";

export type GetActivityResponse = {
    result: Response;
    activity?: Activity;
    message?: string;
};

export type SaveActivityResponse = {
    result: Response;
    activity?: Activity;
    message?: string;
};

export type UpdateActivityLikesResponse = {
    result: Response;
    activity?: Activity;
    message?: string;
};

export type CreateNewUserResponse = {
    result: Response;
    user?: User;
    message?: string;
};

export type GetUserByIdResponse = {
    result: Response;
    user?: User;
    message?: string;
};

export type UpdateUserResponse = {
    result: Response;
    user?: User;
    message?: string;
};

export type getAllActivitiesResponse = {
    result: Response;
    activities?: DocumentData;
    message?: string;
};

export type getAllUsersResponse = {
    result: Response;
    users?: DocumentData;
    message?: string;
};

export type GetSavedActivitiesResponse = {
    result: Response;
    activities?: Activity[];
    message?: string;
};

export type RemoveSavedActivityResponse = {
    result: Response;
    message?: string;
};

export type IsActivitySavedResponse = {
    result: Response;
    exists: boolean;
    message?: string;
};

export type IncrementActivityResponse = {
    result: Response;
    message?: string;
}

export type GetStaticSubjectsResponse = {
    result: Response;
    subjects?: StaticSubject[];
    message?: string;
}

export type GetStaticActivityResponse ={
    result: Response;
    activity?: StaticActivities;
    message?: string;
}

export type SendMsgResponse = {
    result: Response;
    message?: string;
}

export type GetMsgResponse = {
    result: Response;
    msg?: MsgType;
    message?: string;
}

export type UpdateIsMsgResponse = {
    result: Response;
    message?: string;
}

export type AddStaticActivityResponse = {
    result: Response;
    activity?: any;
    message?: string;
};