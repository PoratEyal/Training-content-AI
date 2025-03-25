import { DataType } from "../models/types/common";
import { UserMovementDetails } from "../models/types/movement";
import { GoogleUser, RawUser, User } from "../models/types/user";

export const initRawUser = (user: any) => {
    const googleUser = user as unknown as GoogleUser;
    const rawUser: RawUser = {
        uid: googleUser.uid,
        accessToken: googleUser.accessToken,
        displayName: googleUser.displayName,
        email: googleUser.email,
        phoneNumber: googleUser.phoneNumber,
        photoURL: googleUser.photoURL,
    };
    return rawUser;
};

export const updateUserMovement = (
    user: User,
    movementName: string,
    grade: string,
    gender: string,
    amount: string,
) => {
    const movement: UserMovementDetails = {
        movement: movementName,
        grade,
        gender,
        amount,
    };
    return { ...user, movement } as User;
};

export const isGroupDetailsChanged = (movement: UserMovementDetails, data: DataType) => {
    if (
        movement?.movement === data?.movement?.name &&
        movement?.grade === data?.grade &&
        movement?.amount === data?.amount &&
        movement?.gender === data?.gender
    )
        return false;
    return true;
};
