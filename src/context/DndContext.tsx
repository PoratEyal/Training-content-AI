import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { createContext, useContext, useState } from "react";
import { MovementPart } from "../models/types/movement";

export const DragContext = createContext<{ isDragging: boolean; selectedParts: MovementPart[] }>({
    isDragging: false,
    selectedParts: [],
});

export const useDragContext = () => useContext(DragContext);

export const DndContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedParts, setSelectedParts] = useState<MovementPart[]>([]);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    function handleDragEnd(event: DragEndEvent) {
        setIsDragging(false);
        const { active } = event;
        const part: MovementPart = active?.data?.current?.part;

        if (part) {
            setSelectedParts((prev) => {
                const newParts = [...prev];
                newParts.push(part);
                return newParts;
            });
        }
    }

    const handleDragStart = () => {
        if (!isDragging) {
            setIsDragging(true);
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} sensors={sensors}>
            <DragContext.Provider value={{ isDragging, selectedParts }}>
                {children}
            </DragContext.Provider>
        </DndContext>
    );
};
