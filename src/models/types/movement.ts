//
// This file defines types related to youth movements and their categories
// MovementName: possible names of movements
// Movement: a movement with a name, title, and categories
// CategoryName: available activity categories
// Category: a category with a name and title
// UserMovementDetails: structure holding user-provided movement details (like movement name, grade, gender, and amount)
//

export type MovementName =
    //Common
    | "scout"
    | "other"

    //Israeli
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

    //Rest of the World
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
