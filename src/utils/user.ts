import { DataType } from "../models/types/context";
import { UserMovementDetails } from "../models/types/movement";
import { GoogleUser, User } from "../models/types/user";
import { getUpdateAt } from "./time";

export const initUser = (googleUser: GoogleUser) => {
    return {
        id: googleUser.uid,
        email: googleUser.email,
        name: googleUser.displayName,
        image: googleUser.photoURL,
        limit: 0,
        lastUpdate: getUpdateAt(),
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

export const isGroupDetailsChanged = (movement: UserMovementDetails, data: DataType) => {
    if (
        movement?.movement === data?.movement?.name &&
        movement?.grade === data?.grade &&
        movement?.amount === data?.amount &&
        movement?.place === data?.place &&
        movement?.gender === data?.gender
    )
        return false;
    return true;
};
