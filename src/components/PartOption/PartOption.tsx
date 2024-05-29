import React, { useEffect, useState } from "react";
import SubjectInput from "../SubjectInput/SubjectInput";
import Hint from "../Hint/Hint";
import { ActivityStructure } from "../../models/types/activity";
import { MovementPart } from "../../models/types/movement";
import styles from "./PartOption.module.css";

type PartOptionProps = {
    part: MovementPart;
    setStructure: React.Dispatch<React.SetStateAction<ActivityStructure>>;
    setHasAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

function PartOption({ part, setStructure, setHasAlert }: PartOptionProps) {
    const [show, setShow] = useState(false);
    const [subject, setSubject] = useState("");
    const toggleShow = () => setShow((prev) => !prev);

    const { name, title, hint, magic } = part;

    useEffect(() => {
        setStructure((prev) => {
            if (!prev) return prev;

            const updatedParts = prev.parts ? [...prev.parts] : [];
            const existingPartIndex = updatedParts.findIndex((part) => part.name === name);

            if (show) {
                if (existingPartIndex !== -1) {
                    updatedParts[existingPartIndex] = {
                        ...updatedParts[existingPartIndex],
                        subject,
                    };
                } else {
                    updatedParts.push({ name, subject });
                }
            } else {
                if (existingPartIndex !== -1) {
                    updatedParts.splice(existingPartIndex, 1);
                }
            }

            return {
                ...prev,
                parts: updatedParts,
            };
        });
    }, [show, subject]);

    return (
        <div className={styles.option_contianer}>
            <div className={styles.option_title}>
                <span onClick={toggleShow}>
                    <span>+</span>
                    <span>{title}</span>
                </span>
                {hint ? <Hint hint={hint} /> : null}
            </div>
            {show ? (
                <div>
                    <SubjectInput
                        subject={subject}
                        setSubject={setSubject}
                        setHasAlert={setHasAlert}
                        magic={magic}
                        placeholder="הוסף עוד מידע או נושא ספציפי"
                    />
                </div>
            ) : null}
        </div>
    );
}

export default PartOption;
