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

export type ActivityDetails = {
    subject: string;
    parts: PartStructure[];
    time: string;
    amount: string;
    grade: string;
    gender: string;
    place: string;
};

export type ActivityStructure = {
    mainSubject: string | undefined;
    time: string | undefined;
    parts: PartStructure[];
};

export type PartStructure = {
    name: string;
    subject: string;
};
