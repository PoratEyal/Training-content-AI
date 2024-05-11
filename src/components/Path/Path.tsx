import { useEffect, useState } from "react";
import styles from "./Path.module.css";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";
import SelectDetails from "../SelectDetailsPath/SelectDetailsPath";
import { ActivityTimeOptions } from "../../models/resources/select";
import { useErrorContext } from "../../context/ErrorContext";
import PlayingTimeSubjects from "../../models/resources/playingTime.json";
import ScoutingTimeSubjects from "../../models/resources/scoutesActivities.json";
import { MovementPath } from "../../models/types/movement";
import Hint from "../Hint/Hint";

type PathProps = {
    index: number;
    path: MovementPath;
    setPath: React.Dispatch<React.SetStateAction<any[]>>;
    isGenerate?: boolean;
};

function Path({ index, path, setPath, isGenerate = false }: PathProps) {
    const { handleError } = useErrorContext();
    const [show, setShow] = useState(false);
    const [subject, setSubject] = useState("");
    const [time, setTime] = useState("");
    const [magic, setMagic] = useState(false);

    const { name, title, hint } = path;

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

    const toggleShow = () => setShow((prev) => !prev);

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        // Limit the value to 80 characters
        if (newValue.length <= 80) {
            setSubject(newValue);
        }
    };

    const generateSubject = async () => {
        try {
            setMagic(true);
            setSubject("");

            if (isGenerate) {
                setTimeout(() => {
                    let activities = [];
                    if (index === 2) activities = ScoutingTimeSubjects;
                    if (index === 3) activities = PlayingTimeSubjects;
                    const randomIndex = Math.floor(Math.random() * activities.length);
                    setSubject(activities[randomIndex].name);
                    setMagic(false);
                }, 500);
            }
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <div className={styles.checkbox_div}>
            <div className={styles.custom_checkbox}>
                <input type="checkbox" id={name} checked={show} onChange={toggleShow} />
                <label  htmlFor={name}>{title}</label>
                <Hint hint={hint} />
            </div>

            {show && (
                <div className={styles.inputs_div}>
                    <div className={styles.input_and_icon}>
                        <textarea
                            className={styles.input}
                            value={subject}
                            onChange={handleInputChange}
                            placeholder="נושא הפעילות"
                        />
                        {isGenerate &&
                            (magic ? (
                                <VscLoading className={styles.loading_icon_magic} />
                            ) : (
                                <FaWandMagicSparkles
                                    onClick={() => generateSubject()}
                                    className={styles.magic_icon}
                                />
                            ))}
                    </div>

                    <SelectDetails
                        data={ActivityTimeOptions}
                        placeholder={"משך הפעילות"}
                        obj={time}
                        setObj={setTime}
                    />
                </div>
            )}
        </div>
    );
}

export default Path;
