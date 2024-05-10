import { Movement } from "../model/types/movement";
import { User } from "../model/types/user";

export const initUser = (
    id: string,
    name: string,
    email: string,
    image: string,
    limit: number,
    movement: Movement,
    isAcceptTerms: boolean,
): User => {
    return {
        id,
        name,
        email,
        image,
        limit,
        movement,
        isAcceptTerms,
    } as User;
};
