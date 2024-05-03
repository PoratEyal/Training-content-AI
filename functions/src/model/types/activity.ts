export type ActivityPathName = "pointOfView" | "contentActivity" | "scoutingTime" | "playingTime";


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

export type ActivityDetails = {
    subject: string;
    time: string;
    amount: string;
    grade: string;
    gender: string;
    place: string;
}