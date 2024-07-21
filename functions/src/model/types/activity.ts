export type Activity = {
    id: string;
    updatedAt: string;
    fetchCount: number;
    likes: number;
    parts: string;
    path?: string; //lagacy
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
    subject: string;
    parts: PartStructure[];
    time: string;
    amount: string;
    grade: string;
    gender: string;
    place: string;
};

export type Part = "contant" | "pointOfView" | "survival" | "playTime" | "creation";

export type PartStructure = {
    name: Part;
    subject: string;
};
