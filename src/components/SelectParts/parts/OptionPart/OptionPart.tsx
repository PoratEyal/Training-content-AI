import React from "react";
import Draggable from "../../../dnd/Draggable";
import { MovementPart } from "../../../../models/types/movement";
import styles from "./OptionPart.module.css";

type OptionPartProps = {
    part: MovementPart;
    handleOnClick: (part: MovementPart) => void;
};

function OptionPart({ part, handleOnClick }: OptionPartProps) {
    return (
        <span onClick={() => handleOnClick(part)}>
            <Draggable draggableId={`O-${part.name}`} args={{ part }}>
                <span
                    style={{ backgroundColor: part.color || "#D8E0F5" }}
                    className={styles.part_option}
                >
                    {part.title}
                </span>
            </Draggable>
        </span>
    );
}

export default OptionPart;
