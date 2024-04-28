export type ActivityType = {
    subject: string;
    time: string;
    use: boolean;
    data: string;
};

export type DataType = {
    pointOfView: ActivityType;
    contentActivity: ActivityType;
    scoutingTime: ActivityType;
    playingTime: ActivityType;
    other: {
        use: boolean;
    };
    activity: string;
    grade: string;
    gender: string;
    amount: string;
    place: string;
    img: string;
};

export type ContentContextType = {
    data: DataType;
    setData: React.Dispatch<React.SetStateAction<DataType>>;
    limit: number;
    updateLimit: () => void;
    cookies: any;
    setCookie: (name: string, value: any, options?: any) => void;
    updateDetails: (grade: string, amount: string, place: string, gender: string) => void;
    updateActivity: (activity: string) => void;
    updateImage: (url: string) => void;
    resetAllUseFields: () => void;
    updateContentActivity: (subject: string, time: string, result: string) => void;
    updatePointOfView: (subject: string, time: string, result: string) => void;
    updateScoutingTime: (subject: string, time: string, result: string) => void;
    updatePlayingTime: (subject: string, time: string, result: string) => void;
};

export type ErrorContextType = {
    handleError: (error: Error | string | undefined) => void;
    handleAlert: (message: string, duration?: number) => void;
    handleSuccess: (message: string) => void;
};
