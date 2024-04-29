import { useEffect, useState } from "react";
import styles from "./Path.module.css";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";
import SelectDetails from "../SelectDetailsPath/SelectDetailsPath";
import { ActivityTime } from "../../models/resources/activity";
import { useErrorContext } from "../../context/ErrorContext";
import PlayingTimeSubjects from "../../models/resources/playingTime.json";
import ScoutingTimeSubjects from "../../models/resources/scoutesActivities.json";
import Hint from "../Hint/Hint";

function Path({ index, title, setPath, hint, isGenerate = false }) {
    const { handleError } = useErrorContext();
    const [show, setShow] = useState(false);
    const [subject, setSubject] = useState("");
    const [time, setTime] = useState("");
    const [magic, setMagic] = useState(false);

    useEffect(() => {
        if (!show) {
            setPath(undefined);
            setSubject("");
            setTime("");
            return;
        }
        if (!subject || !time || subject === "" || time === "") {
            setPath(undefined);
            return;
        }
        setPath({ subject, time });
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
                    if (index === 3) activities = ScoutingTimeSubjects;
                    if (index === 4) activities = PlayingTimeSubjects;
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
                <input type="checkbox" checked={show} onChange={toggleShow} />
                <span>{title}</span>
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
                        data={ActivityTime}
                        placeholder={"בחרו זמן פעילות"}
                        obj={time}
                        setObj={setTime}
                    />
                </div>
            )}
        </div>
    );
}

export default Path;
