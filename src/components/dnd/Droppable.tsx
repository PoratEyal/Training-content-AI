import React, { useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import { DroppableProps } from "../../models/types/dnd";

const Droppable: React.FC<DroppableProps> = ({ children, droppableId, setFocus }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: droppableId,
    });

    useEffect(() => {
        setFocus(isOver);
    }, [isOver]);

    return <div ref={setNodeRef}>{children}</div>;
};

export default Droppable;
