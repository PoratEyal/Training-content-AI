import {
    DndContext,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
    TouchSensor,
} from "@dnd-kit/core";
import { MovementPart } from "../../models/types/movement";
import Droppable from "../dnd/Droppable";
import { useState } from "react";
import styles from "./SelectParts.module.css";
import SelectedPart from "./parts/SelectedPart/SelectedPart";
import { PartStructure } from "../../models/types/activity";
import SelectedPartAnimation from "./parts/SelectedPartAnimation/SelectedPartAnimation";
import usePartSelection from "../../hooks/usePartSelection";
import PartOf from "./PartOf/PartOf";
import { PARTS_LIMIT } from "../../models/constants";
import OptionPart from "./parts/OptionPart/OptionPart";

type SelectPartsProps = {
    parts: MovementPart[];
    setParts: React.Dispatch<React.SetStateAction<PartStructure[]>>;
};

function SelectParts({ parts, setParts }: SelectPartsProps) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const { addPart, removePart, setPartSubject, options, selectedParts, triggerLimit } =
        usePartSelection(parts, setParts);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
    );

    function handleDragEnd(event: DragEndEvent) {
        setIsDragging(false);
        const { over, active } = event;
        const isDroppable = over?.id.toString() || undefined;
        const id: string = active?.id.toString();
        const part: MovementPart = active?.data?.current?.part;

        if (part) {
            if (isDroppable === "droppable") {
                if (id.includes("O-")) addPart(part);
            } else {
                if (id.includes("S-")) removePart(part);
            }
        }
    }

    const handleDragStart = () => {
        if (!isDragging) {
            setIsDragging(true);
        }
    };

    const handleOnClick = (part: MovementPart) => {
        if (!isDragging && part) {
            addPart(part);
        }
    };

    const randomNum = Math.floor(Math.random() * 5000).toString();

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} sensors={sensors}>
            <section className={styles.parts_container}>
                <Droppable droppableId="droppable" setFocus={() => {}}>
                    <section className={styles.parts_input_select}>
                        {selectedParts.length === 0 ? (
                            <span className={styles.parts_input_placeholder}>
                                {"בחרו חלקים לפעילות (אופציונלי)"}
                            </span>
                        ) : null}
                        {selectedParts.map((part, i) => {
                            if (part.isResize)
                                return (
                                    <SelectedPartAnimation
                                        setPartSubject={setPartSubject}
                                        removePart={removePart}
                                        key={`${part.name}-${i}`}
                                        index={i}
                                        part={part}
                                    />
                                );
                            return (
                                <SelectedPart
                                    key={`${part.name}-${i}`}
                                    removePart={removePart}
                                    part={part}
                                    index={i}
                                    isFirst={selectedParts.length === 1}
                                />
                            );
                        })}
                        <PartOf
                            part={selectedParts.length}
                            of={PARTS_LIMIT}
                            triggerLimit={triggerLimit}
                        />
                    </section>
                </Droppable>
                <section className={styles.parts_options}>
                    {options.map((part, i) => (
                        <OptionPart
                            key={`${part.name}-${i}`}
                            part={part}
                            handleOnClick={handleOnClick}
                        />
                    ))}
                </section>
            </section>
        </DndContext>
    );
}

export default SelectParts;
