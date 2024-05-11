import React from "react";

export type NavOption = {
    title: string;
    path: string;
    Icon: React.ReactNode;
};

export type DropdownOption = {
    title: string;
    path: string;
    func?: () => void;
    Icon: React.ReactNode;
};
