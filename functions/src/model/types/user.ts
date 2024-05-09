import { Activity } from "./activity";
import { Movment } from "./movment";

export type User = {
    id: string;
    activities: Activity[];
    limit: number;
    movment: Movment;
    isAcceptTerms: boolean;

    // name: string;
    // image: string;
};
