export type Activity = {
    id: string;
    updatedAt: string;
    fetchCount: number;
    likes: number;
    path: string;
    grade: string;
    amount: string;
    place: string;
    gender: string;
    subject: string;
    time: string;
    activity: string;
};

export type ActivityPathName = "pointOfView" | "contentActivity" | "scoutingTime" | "playingTime";

export type PathType = {
    path: ActivityPathName;
    name: string;
};

export type ActivityFunc = (
    subject: string,
    time: string,
    amount: string,
    age: string,
    gender: string,
    place: string,
) => Promise<any>;
