import { UserMovementDetails } from "../models/types/movement";
import { GoogleUser, User } from "../models/types/user";

export const initUser = (googleUser: GoogleUser) => {
    return {
        id: googleUser.uid,
        email: googleUser.email,
        name: googleUser.displayName,
        image: googleUser.photoURL,
        role: "מדריך",
        limit: 0,
        movement: undefined,
        isAcceptTerms: true,
    } as User;
};

export const updateUserMovement = (
    user: User,
    movementName: string,
    grade: string,
    gender: string,
    amount: string,
    place: string,
) => {
    const movement: UserMovementDetails = {
        movement: movementName,
        grade,
        gender,
        amount,
        place,
    };
    return { ...user, movement } as User;
};
