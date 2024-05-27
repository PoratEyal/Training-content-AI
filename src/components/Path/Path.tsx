import { useEffect, useState } from "react";
import styles from "./Path.module.css";
import SelectDetails from "../SelectDetails/SelectDetails";
import { ActivityTimeOptions } from "../../models/resources/select";
import { MovementPath } from "../../models/types/movement";
import Hint from "../Hint/Hint";
import SubjectInput from "../SubjectInput/SubjectInput";

type PathProps = {
    index: number;
    path: MovementPath;
    setPath: React.Dispatch<React.SetStateAction<any[]>>;
};

function Path({ index, path, setPath }: PathProps) {
    const [show, setShow] = useState(false);
    const [subject, setSubject] = useState("");
    const [time, setTime] = useState("");
    const [hasAlert, setHasAlert] = useState(false);

    const { name, title, hint, magic } = path;

    useEffect(() => {
        if (!show) {
            setPath((prev) => {
                const newPath = [...prev];
                newPath[index] = undefined;
                return newPath;
            });
            setSubject("");
            setTime("");
            return;
        }
        if (!subject || !time || subject === "" || time === "") {
            setPath((prev) => {
                const newPath = [...prev];
                newPath[index] = undefined;
                return newPath;
            });
            return;
        }
        setPath((prev) => {
            const newPath = [...prev];
            newPath[index] = { subject, time, name, index };
            return newPath;
        });
    }, [show, subject, time]);

    const toggleShow = () => {
        setShow((prev) => !prev);
        setHasAlert(false);
    }

    const checkboxStyle = show ? styles.checkbox_active : styles.checkbox_inactive;

    return (
        <div className={styles.checkbox_div}>
            <div className={styles.selection}>
                <span className={checkboxStyle} onClick={toggleShow}>
                    {title}
                </span>
                {hint ? <Hint hint={hint} /> : null}
            </div>

            {show ? (
                <div className={styles.inputs_div}>
                    <SubjectInput
                        subject={subject}
                        setSubject={setSubject}
                        setHasAlert={setHasAlert}
                        magic={magic}
                    />

                    <SelectDetails
                        data={ActivityTimeOptions}
                        placeholder={"משך הפעילות"}
                        obj={time}
                        setObj={setTime}
                    />
                </div>
            ) : null}

            {show && hasAlert ? (
                <div className={styles.input_alert}>
שימו לב! הנתונים מגיעים ממערכת בינה מלאכותית. יתכן שתוצאות חיפושים מסוימים לא עדכניים          
                </div>
            ) : null}
        </div>
    );
}

export default Path;
