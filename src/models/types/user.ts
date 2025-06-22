import { UserMovementDetails } from "./movement";

export type User = {
    id: string;
    name: string;
    email: string;
    image: string;
    limit: number;
    lastUpdate: string;
    createDate: string;
    movement: UserMovementDetails | null;
    isAcceptTerms: boolean;
    isSendMsg: boolean;
};

export type RawUser = {
    uid: string;
    accessToken: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
}

export type GoogleUser = {
    uid: string;
    accessToken: string;
    auth: any;
    displayName: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: {
        createdAt: string;
        creationTime: string;
        lastLoginAt: string;
        lastSignInTime: string;
    };
    phoneNumber: string;
    photoURL: string;
    proactiveRefresh: any;
    providerData: any;
    providerId: string;
    reloadUserInfo: any;
    stsTokenManager: any;
    tenantId: string;
}
