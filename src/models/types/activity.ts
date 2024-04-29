export type Activity = {
    updatedAt: string;
    fetchCount: number;
    path: string;
    grade: string;
    amount: string;
    place: string;
    gender: string;
    subject: string;
    time: string;
    activity: string;
};

export type ActivityFunc = (
    subject: string,
    time: string,
    amount: string,
    age: string,
    gender: string,
    place: string,
) => Promise<any>;
