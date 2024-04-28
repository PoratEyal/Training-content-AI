import React, { useEffect, useState } from "react";
import styles from "./Path.module.css";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";
import SelectDetails from "../SelectDetails/SelectDetails";
import { ActivityTime } from "../../models/resources/activity";
import { useContentContext } from "../../context/ContentContext";
import { useErrorContext } from "../../context/ErrorContext";

function Path({ title, setPath }) {
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
            console.log('hello');
            updateLimit();
            //setSubject(response);
        } catch (error) {
            handleError(error);
        } finally {
            setMagic(false);
        }
    };

    return (
        <div className={styles.checkbox_div}>
            <label className={styles.checkbox_input}>
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
                        {!magic ? (
                            <FaWandMagicSparkles
                                onClick={() => generateSubject()}
                                className={styles.magic_icon}
                            ></FaWandMagicSparkles>
                        ) : (
                            <VscLoading className={styles.loading_icon_magic}></VscLoading>
                        )}
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
