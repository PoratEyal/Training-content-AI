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
