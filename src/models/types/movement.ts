

export type MovementName =
    //Common
    | "scout"
    | "other"
    //Hebrew
    | "oved"
    | "akiva"
    | "maccabi"
    | "camps"
    | "shomer"
    | "bitar"
    | "hadasha"
    | "medtchim"
    | "krembo"
    | "meshachim"
    | "noam"
    | "sayarut"
    | "agricultural"
    | "shinshin"
    //English
    | "Scouts"
    | "YouthLeadershipPrograms"
    | "FaithBasedYouthGroups"
    | "EnvironmentalAndNatureGroups"


export type Movement = {
    name: MovementName;
    title: string;
    categories: Category[];
};

export type CategoryName = "contant" | "pointOfView" | "survival" | "playTime";

export type Category = {
    name: CategoryName;
    title: string;
};

export type UserMovementDetails = {
    movement: string; //the en name
    grade: string;
    gender: string;
    amount: string;
};
