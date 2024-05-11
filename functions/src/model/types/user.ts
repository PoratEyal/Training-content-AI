import { UserMovementDetails } from "./movement";


export type User = {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    limit: number;
    movement: UserMovementDetails | undefined;
    isAcceptTerms: boolean;
};
