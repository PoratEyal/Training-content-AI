import { Activity } from "./activity";

export type GetActivityResponse = {
    success: boolean;
    activity?: Activity;
    message?: string;
};
