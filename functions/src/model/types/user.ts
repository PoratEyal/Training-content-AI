import { Activity } from "./activity";
import { Movement } from "./movement";

export type User = {
    id: string;
    activities: Activity[];
    limit: number;
    movement: Movement;
    isAcceptTerms: boolean;

    // name: string;
    // image: string;
};
