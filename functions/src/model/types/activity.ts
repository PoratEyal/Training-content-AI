import { CategoryName } from "./movement";

export type Activity = {
    id: string;
    updatedAt: string;
    fetchCount: number;
    likes: number;
    category: string;
    grade: string;
    amount: string;
    place: string;
    gender: string;
    subject: string;
    time: string;
    activity: string;
    userId: string | undefined;
};

export type ActivityDetails = {
    category: CategoryName;
    subject: string;
    time: string;
    amount: string;
    grade: string;
    gender: string;
    place: string;
};

export type StaticSubject = {
    name: string;
    metaTitle: string;
    icon: string;
    metaDescription: string;
    orderId: number;
    activities: StaticActivities[];
}

export type StaticActivities = {
    name: string;
    metaTitle: string;
    metaDescription: string;
    content: string;
    displayCount: number;
    orderId: number;
    title?: string;
};
