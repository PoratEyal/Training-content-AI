import { Movement } from "./movement";

export type User = {
    id: string;
    name: string;
    email: string;
    image: string;
    limit: number;
    movement: Movement;
    isAcceptTerms: boolean;
};
