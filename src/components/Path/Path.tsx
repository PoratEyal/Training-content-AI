import { useEffect, useState } from "react";
import styles from "./Path.module.css";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";
import SelectDetails from "../SelectDetailsPath/SelectDetailsPath";
import { ActivityTime } from "../../models/resources/activity";
import { useContentContext } from "../../context/ContentContext";
import { useErrorContext } from "../../context/ErrorContext";
import PlayingTimeSubjects from '../../models/resources/playingTime.json';
import ScoutingTimeSubjects from '../../models/resources/scoutesActivities.json';

function Path({ index, generate, title, setPath }) {
    const { updateLimit } = useContentContext();
    const { handleError } = useErrorContext();
    const [show, setShow] = useState(false);
    const [subject, setSubject] = useState("");
    const [time, setTime] = useState("");
    const [magic, setMagic] = useState(false);

    useEffect(() => {
        if(!show){
            setPath(undefined);
            setSubject("");
            setTime("");
            return;
        }
        if (!subject || !time || subject === "" || time === ""){
            setPath(undefined);
            return;
        };
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

            if (index === 3) {
                setTimeout(() => {
                    const activities = ScoutingTimeSubjects.activities;
                    const randomIndex = Math.floor(Math.random() * activities.length);
                    setSubject(activities[randomIndex].name);
                    setMagic(false);
                }, 500); 
            }            
            if(index === 4){
                setTimeout(() => {
                    const activities = PlayingTimeSubjects;
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
            <label className={styles.custom_checkbox}>
                <input type="checkbox" checked={show} onChange={toggleShow} />
                {title}
            </label>

            {show && (
                <div className={styles.inputs_div}>
                    <div className={styles.input_and_icon}>
                        <textarea
                            className={styles.input}
                            value={subject}
                            onChange={handleInputChange}
                            placeholder="נושא הפעילות"
                        />
                        {generate &&
                            (magic ? (
                                <VscLoading className={styles.loading_icon_magic} />
                            ) : (
                                <FaWandMagicSparkles
                                    onClick={() => generateSubject()}
                                    className={styles.magic_icon}
                                />
                            ))
                        }
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
