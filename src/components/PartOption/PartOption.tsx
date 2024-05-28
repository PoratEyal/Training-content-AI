import React, { useEffect, useState } from "react";
import SubjectInput from "../SubjectInput/SubjectInput";
import Hint from "../Hint/Hint";
import { ActivityStructure } from "../../models/types/activity";
import { MovementPart } from "../../models/types/movement";

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
            return {
                ...prev,
                parts: show
                    ? [...(prev?.parts || []), { name, subject }]
                    : prev?.parts?.filter((part) => part.name !== name),
            };
        });
    }, [subject]);

    return (
        <div>
            <div>
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
                    />
                </div>
            ) : null}
        </div>
    );
}

export default PartOption;
