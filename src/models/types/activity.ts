import { CategoryName } from "./movement";

export type Activity = {
    id: string;
    createdAt: string;
    savedAt: string;
    fetchCount: number;
    likes: number;
    category: CategoryName;
    grade: string;
    amount: string;
    place: string;
    gender: string;
    subject: string;
    time: string;
    activity: string;
    userId: string | undefined;

    religion?: string;
    contest?: string;
    tools?: string;
    info?: string;
};

export type SubjectListType = {
    id: string;
    icon: string;
    metaTitle: string;
    metaContent: string;
    activities: object;
};

export type ActivityListType = {
    id: string;
    metaTitle: string;
    metaContent: string;
    content: string;
};

export type StaticActivities = {
    name: string;
    metaTitle: string;
    metaDescription: string;
    content: string;
    displayCount: number;
    orderId: number;
    title?: string;
}

export type StaticSubjects = {
    name: string;
    metaTitle: string;
    icon: string;
    metaDescription: string;
    orderId: number;
    activities: StaticActivities[];
};
