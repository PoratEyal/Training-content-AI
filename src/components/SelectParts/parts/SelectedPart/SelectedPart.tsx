import React from "react";
import styles from "./SelectedPart.module.css";
import Draggable from "../../../dnd/Draggable";
import { MovementPart } from "../../../../models/types/movement";
import { IoClose } from "react-icons/io5";

type SelectedPartProps = {
    part: MovementPart;
    isFirst?: boolean;
    removePart: (part: MovementPart) => void;
    index: number;
};

function SelectedPart({ part, isFirst, removePart, index }: SelectedPartProps) {
    const handleClose = () => {
        removePart(part);
    };

    return (
        <Draggable draggableId={`S-${part.name}-${index}`} isFirst={isFirst} args={{ part }}>
            <span
                style={{ backgroundColor: part.color || "#D8E0F5" }}
                className={styles.part_option}
            >
                <span className={styles.part_close_btn} onClick={handleClose}>
                    <IoClose />
                </span>
                <span className={styles.part_title}>{part.title}</span>
            </span>
        </Draggable>
    );
}

export default SelectedPart;
