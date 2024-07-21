import React from "react";
import styles from "./BuildForm.module.css";
import SubjectInput from "../SubjectInput/SubjectInput";
import SelectDetails from "../SelectDetails/SelectDetails";
import { PlaceOptions } from "../../models/resources/select";
import SelectParts from "../SelectParts/SelectParts";
import { PartStructure } from "../../models/types/activity";
import { MovementPart } from "../../models/types/movement";

type BuildFormProps = {
    parts: MovementPart[];
    place: string;
    subject: string;
    setHasAlert: React.Dispatch<React.SetStateAction<boolean>>;
    setSubject: React.Dispatch<React.SetStateAction<string>>;
    setPlace: React.Dispatch<React.SetStateAction<string>>;
    setSelectedParts: React.Dispatch<React.SetStateAction<PartStructure[]>>;
};

function BuildForm({
    parts,
    place,
    subject,
    setHasAlert,
    setSubject,
    setPlace,
    setSelectedParts,
}: BuildFormProps) {
    return (
        <section className={styles.build_container}>
            <SubjectInput
                placeholder="נושא הפעילות"
                setSubject={setSubject}
                subject={subject}
                setHasAlert={setHasAlert}
            />

            <SelectDetails
                placeholder={"מיקום"}
                obj={place}
                setObj={setPlace}
                data={PlaceOptions}
            />

            <SelectParts parts={parts} setParts={setSelectedParts} />
        </section>
    );
}

export default BuildForm;
