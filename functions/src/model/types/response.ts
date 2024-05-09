import { Activity } from "./activity";
import { Movment } from "./movment";

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
    movment?: Movment;
    message?: string;
}

export type GetMovmentsResponse = {
    result: Resposne;
    movments: Movment[];
    message?: string;
};
