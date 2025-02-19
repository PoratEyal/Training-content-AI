export type MovementName =
    | "scout"
    | "maccabi"
    | "akiva"
    | "oved"
    | "krembo"
    | "bitar"
    | "shomer"
    | "sayarut"
    | "medtchim"
    | "meshachim"
    | "noam"
    | "agricultural"
    | "other";

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
