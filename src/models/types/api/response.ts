import { Activity } from "../activity";
import { User } from "../user";

export type Resposne = "success" | "notFound" | "safety" | "error"

export type GetActivityResponse = {
    result: Resposne;
    activity?: Activity;
    message?: string;
};

export type UpdateActivityLikesResponse = {
    result: Resposne;
    activity?: Activity;
    message?: string;
};

export type CreateNewUserResponse = {
    result: Resposne;
    user?: User;
    message?: string;
};

export type GetUserByIdResponse = {
    result: Resposne;
    user?: User;
    message?: string;
};

export type UpdateUserResponse = {
    result: Resposne;
    user?: User;
    message?: string;
};

export type getAllActivitiesResponse = {
    result: Resposne;
    activities?: any;
    message?: string;
};

export type getAllUsersResponse = {
    result: Resposne;
    users?: any;
    message?: string;
};