import { Activity } from "./activity";
import { Movement } from "./movement";
import { User } from "./user";

export type Resposne = "success" | "notFound" | "safety" | "limit" | "error"

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

export type AddMovmentResponse = {
    result: Resposne;
    movement?: Movement;
    message?: string;
}

export type GetMovmentsResponse = {
    result: Resposne;
    movements: Movement[];
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

export type updateUserByIdResponse = {
    result: Resposne;
    user?: User;
    message?: string;
};

export type DeleteUserResponse = {
    result: Resposne;
    message?: string;
};