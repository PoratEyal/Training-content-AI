import { Activity, StaticActivities, StaticSubjects } from "../activity";
import { MsgType } from "../common";
import { User } from "../user";

export type Response = "success" | "notFound" | "safety" | "error";

export type GetActivityResponse = {
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

export type UpdateUserResponse = {
    result: Response;
    user?: User;
    message?: string;
};

export type getAllActivitiesResponse = {
    result: Response;
    activities?: any;
    message?: string;
};

export type getAllUsersResponse = {
    result: Response;
    users?: any;
    message?: string;
};

export type getSavedActivitiesResponse = {
    result: Response;
    activities?: Activity[];
    message?: string;
};

export type saveActivityResponse = {
    result: Response;
    activity?: Activity;
    message?: string;
};

export type removeActivityResponse = {
    result: Response;
    message?: string;
};

export type staticSubjectsResponse = {
    result: Response;
    subjects?: StaticSubjects[];
    message?: string;
};

export type GetStaticActivityResponse = {
    result: Response;
    activity?: StaticActivities;
    message?: string;
};

export type incrementActivityDisplayCountResponse = {
    result: Response;
    activity?: StaticActivities;
    message?: string;
};

export type SendMsgResponse = {
    result: Response;
    message?: string;
};

export type GetMsgResponse = {
    result: Response;
    msg?: MsgType;
    message?: string;
};

export type UpdateIsMsgResponse = {
    result: Response;
    message?: string;
};