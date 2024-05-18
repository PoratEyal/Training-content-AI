import { useEffect, useState } from "react";
import styles from "./Path.module.css";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";
import SelectDetails from "../SelectDetails/SelectDetails";
import { ActivityTimeOptions } from "../../models/resources/select";
import { MovementPath } from "../../models/types/movement";
import Hint from "../Hint/Hint";

type PathProps = {
    index: number;
    path: MovementPath;
    setPath: React.Dispatch<React.SetStateAction<any[]>>;
};

function Path({ index, path, setPath }: PathProps) {
    const [show, setShow] = useState(false);
    const [subject, setSubject] = useState("");
    const [time, setTime] = useState("");
    const [loadingMagic, setLoadingMagic] = useState(false);

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

    const toggleShow = () => setShow((prev) => !prev);

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        // Limit the value to 80 characters
        if (newValue.length <= 80) {
            setSubject(newValue);
        }
    };

    const generateSubject = async () => {
        if (magic && magic.length !== 0) {
            setSubject("");
            setLoadingMagic(true);
            setTimeout(() => {
                let activities = magic;
                const randomIndex = Math.floor(Math.random() * activities.length);
                setSubject(activities[randomIndex].name);
                setLoadingMagic(false);
            }, 500);
        }
    };

    return (
        <div className={styles.checkbox_div}>
            <div className={styles.custom_checkbox}>
                <input type="checkbox" id={name} checked={show} onChange={toggleShow} />
                <label className={styles.title} htmlFor={name}>
                    {title}
                </label>
                {hint ? <Hint hint={hint} /> : null}
            </div>

            {show ? (
                <div className={styles.inputs_div}>
                    <div className={styles.input_and_icon}>
                        <textarea
                            className={styles.input}
                            value={subject}
                            onChange={handleInputChange}
                            placeholder="נושא הפעילות"
                        />
                        {magic &&
                            magic.length !== 0 &&
                            (loadingMagic ? (
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
            ) : null}
        </div>
    );
}

export default Path;
