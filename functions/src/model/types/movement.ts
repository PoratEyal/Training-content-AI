export type Movement = {
    name: string;
    title: string;
    categories: Category[];
};

export type CategoryName = "content" | "pointOfView" | "survival" | "playTime";

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
