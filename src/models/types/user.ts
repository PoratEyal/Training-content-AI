import { Activity } from "./activity";
import { Movment } from "./movment";

export type User = {
    id: string;
    activities: Activity[];
    limit: number;
    movment: Movment;
    isAcceptTerms: boolean;

    // name: string;
    // image: string;
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
