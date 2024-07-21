export type PropsObj<T = Record<string, any>> = {
    [key: string]: T;
};

export type DroppableProps = {
    children: React.ReactNode | React.ReactNode[];
    droppableId: string;
    setFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DraggableProps = {
    children: React.ReactNode | React.ReactNode[];
    draggableId: string;
    disabled?: boolean;
    width?: string;
    isFirst?: boolean;
    setAnimation?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    args: PropsObj;
};
