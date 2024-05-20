import React from "react";

export type NavOption = {
    title: string;
    path: string;
    Icon: React.ReactNode;
};

export type DropdownOption = {
    title: string;
    path: string;
    func?: () => Promise<void> | void;
    Icon: React.ReactNode;
};

export type SelectOption = {
    readonly value: string;
    readonly label: string;
    action?: () => any;
}