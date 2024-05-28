import React, { useEffect, useState } from "react";
import SubjectInput from "../SubjectInput/SubjectInput";
import SelectDetails from "../SelectDetails/SelectDetails";
import styles from "./ActivitySubject.module.css";
import { ActivityTimeOptions } from "../../models/resources/select";
import { ActivityStructure } from "../../models/types/activity";

type ActivitySubjectProps = {
    setStructure: React.Dispatch<React.SetStateAction<ActivityStructure>>;
    setHasAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

function ActivitySubject({ setStructure, setHasAlert }: ActivitySubjectProps) {
    const [subject, setSubject] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        setStructure((prev) => {
            return {
                ...prev,
                mainSubject: subject,
                time: time,
            };
        });
    }, [subject, time]);

    return (
        <section>
            <SubjectInput
                placeholder="נושא הפעילות"
                subject={subject}
                setSubject={setSubject}
                setHasAlert={setHasAlert}
            />

            <SelectDetails
                placeholder="משך הפעילות"
                data={ActivityTimeOptions}
                obj={time}
                setObj={setTime}
            />
        </section>
    );
}

export default ActivitySubject;
