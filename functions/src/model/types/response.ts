import { Activity } from "./activity";
import { Movement } from "./movement";

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
