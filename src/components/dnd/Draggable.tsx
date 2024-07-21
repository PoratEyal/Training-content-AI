import React, { useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS, Transform } from "@dnd-kit/utilities";
import { DraggableProps } from "../../models/types/dnd";
import styles from "./DndStyle.module.css";

// TODO
const dndStyle = (transform: Transform | null): React.CSSProperties => {
    return {
        transform: CSS.Translate.toString(transform),
        touchAction: "none",
        zIndex: 10,
        cursor: "pointer",
        position: "relative",
        WebkitTapHighlightColor: "transparent",
    };
};

const Draggable: React.FC<DraggableProps> = ({
    children,
    draggableId,
    isFirst,
    setAnimation,
    args,
}) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: draggableId,
        data: args,
    });

    // useEffect(() => {
    //     if (setAnimation && isDragging) {
    //         setAnimation((prev) => {
    //             if (isDragging && !prev) return false;
    //         });
    //     }
    // }, [isDragging]);

    return (
        <div ref={setNodeRef} style={dndStyle(transform)} {...listeners} {...attributes}>
            {children}
            {isFirst && !isDragging ? (
                <span className={styles.opt_part_placeholder}>{"אפשר להוסיף עוד ..."}</span>
            ) : null}
        </div>
    );
};

export default Draggable;
