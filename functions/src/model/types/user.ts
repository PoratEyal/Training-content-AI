import { UserMovementDetails } from "./movement";


export type User = {
    id: string;
    name: string;
    email: string;
    image: string;
    limit: number;
    lastUpdate: string;
    movement: UserMovementDetails | undefined;
    isAcceptTerms: boolean;
};
