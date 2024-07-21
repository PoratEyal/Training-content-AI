export type Activity = {
    id: string;
    updatedAt: string;
    fetchCount: number;
    likes: number;
    parts: PartStructure[];
    grade: string;
    amount: string;
    place: string;
    gender: string;
    subject: string;
    time: string;
    activity: string;
    userId: string | undefined;
};

export type ActivityFunc = (
    subject: string,
    time: string,
    amount: string,
    age: string,
    gender: string,
    place: string,
) => Promise<any>;

export type Part = "contant" | "pointOfView" | "survival" | "playTime" | "creation";

export type PartStructure = {
    name: Part;
    subject: string;
};
