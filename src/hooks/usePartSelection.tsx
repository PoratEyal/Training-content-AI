import { useEffect, useRef, useState } from "react";
import { MovementPart } from "../models/types/movement";
import { PartStructure } from "../models/types/activity";
import { PARTS_LIMIT } from "../models/constants";
import Session from "../utils/sessionStorage";
import { SessionKey } from "../models/enums/session";

const usePartSelection = (
    parts: MovementPart[],
    setParts: React.Dispatch<React.SetStateAction<PartStructure[]>>,
) => {
    const [options, setOptions] = useState<MovementPart[]>(parts);
    const [selectedParts, setSelectedParts] = useState<MovementPart[]>([]);
    const [triggerLimit, setTriggerLimit] = useState(false);
    const lockRef = useRef(true);

    useEffect(() => {
        const setStateFromSession = () => {
            lockRef.current = false;
            try {
                if (selectedParts.length === 0) {
                    const sessionParts: MovementPart[] | undefined = Session.get(SessionKey.PARTS);
                    if (sessionParts) {
                        // setSelectedParts(sessionParts);
                        // const names = sessionParts.map((part) => part.name);
                        // setOptions(parts.filter((part) => !names.includes(part.name)));
                    } else {
                        // setSelectedParts([parts[0]]);
                        // setOptions(parts.slice(1));
                    }
                }
            } catch (error) {}
        };

        if (lockRef.current) setStateFromSession();
    }, []);

    const activateTrigger = () => {
        setTriggerLimit(true);
    };

    const resetTrigger = () => {
        setTriggerLimit(false);
    };

    useEffect(() => {
        if (triggerLimit) {
            setTimeout(() => {
                resetTrigger();
            }, 200);
        }
    }, [triggerLimit]);

    useEffect(() => {
        Session.set(SessionKey.PARTS, selectedParts);
        if (selectedParts.length > 0) {
            setParts(
                selectedParts.map(
                    (part) =>
                        ({
                            name: part.name,
                            subject: part.partSubject || "",
                        }) as PartStructure,
                ),
            );
        } else {
            setParts([]);
        }
    }, [selectedParts]);

    const addPart = (part: MovementPart) => {
        if (selectedParts.length < PARTS_LIMIT) {
            setSelectedParts((prev) => {
                const newParts = [...prev];
                newParts.push(part);
                // if (!newParts.includes(part)) {
                //     newParts.push(part);
                // }
                return newParts;
            });
            // setOptions((prev) => {
            //     const newOptions = [...prev];
            //     const index = newOptions.indexOf(part);
            //     if (index !== -1) {
            //         newOptions.splice(index, 1);
            //     }
            //     return newOptions;
            // });
        } else {
            activateTrigger();
        }
    };

    const removePart = (part: MovementPart) => {
        setSelectedParts((prev) => {
            const newParts = [...prev];
            const index = newParts.indexOf(part);
            if (index !== -1) {
                newParts.splice(index, 1);
            }
            return newParts;
        });
        // setOptions((prev) => {
        //     const newOptions = [...prev];
        //     if (!newOptions.includes(part)) {
        //         newOptions.push(part);
        //     }
        //     return newOptions;
        // });
    };

    const setPartSubject = (part: MovementPart, subject: string) => {
        setSelectedParts((prev: MovementPart[]) => {
            const index = prev.findIndex((p) => p.name === part.name);
            if (index === -1) {
                return [...prev, { ...part, partSubject: subject } as MovementPart];
            } else {
                prev[index].partSubject = subject;
                return [...prev];
            }
        });
    };

    return { addPart, removePart, setPartSubject, options, selectedParts, triggerLimit };
};

export default usePartSelection;
