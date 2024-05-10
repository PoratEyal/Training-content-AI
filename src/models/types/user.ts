import { Movement } from "./movement";

export type User = {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    limit: number;
    movement: Movement;
    isAcceptTerms: boolean;
};

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
