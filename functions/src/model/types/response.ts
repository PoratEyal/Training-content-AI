import { DocumentData } from "firebase-admin/firestore";
import { Activity, StaticActivities, StaticSubject } from "./activity";
import { Movement } from "./movement";
import { User } from "./user";

export type Resposne = "success" | "notFound" | "safety" | "limit" | "error";

export type GetActivityResponse = {
    result: Resposne;
    activity?: Activity;
    message?: string;
};

export type SaveActivityResponse = {
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
};

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

export type getAllActivitiesResponse = {
    result: Resposne;
    activities?: DocumentData;
    message?: string;
};

export type getAllUsersResponse = {
    result: Resposne;
    users?: DocumentData;
    message?: string;
};

export type GetSavedActivitiesResponse = {
    result: Resposne;
    activities?: Activity[];
    message?: string;
};

export type RemoveSavedActivityResponse = {
    result: Resposne;
    message?: string;
};

export type IsActivitySavedResponse = {
    result: Resposne;
    exists: boolean;
    message?: string;
};

export type IncrementActivityResponse = {
    result: Resposne;
    message?: string;
}

export type GetStaticSubjectsResponse = {
    result: Resposne;
    subjects?: StaticSubject[];
    message?: string;
}

export type GetStaticActivityResponse ={
    result: Resposne;
    activity?: StaticActivities;
    message?: string;
}