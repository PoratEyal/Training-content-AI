import { useEffect, useState } from "react";
import styles from "./Survey.module.css";
import { MovementSurvey, NewActivitySurvey } from "../../../models/types/survey";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { fetchSendMsg } from "../../../utils/fetch";
import { useErrorContext } from "../../../context/ErrorContext";
import msg from "../../../models/resources/surveyMsg.json";
import { motion } from "framer-motion";
import { useSurveyContext } from "../../../context/SurveyContext";

function Survey() {
    const { survey, closeSurvey } = useSurveyContext();
    const { handleSuccess } = useErrorContext();

    const [message, setMessage] = useState("");
    const [info, setInfo] = useState("");

    const [show, setShow] = useState(false);
    const [position, setPosition] = useState(0);

    const setMsg = () => {
        const { condition, data } = survey;
        switch (condition) {
            case "movement":
                const { movement } = data as MovementSurvey;
                setMessage(msg.movement[movement]);
                setInfo(msg.movement[movement]);
                break;
            case "newActivity":
                const { subject } = data as NewActivitySurvey;
                setMessage("newActivity");
                setInfo(`subjsct: ${subject}`);
                break;

            default:
                setMessage("default");
                break;
        }
    };

    useEffect(() => {
        if (survey && message === "") {
            setShow(true);
            setPosition(0);
            setMsg();
            } else if (!survey && message !== "") {
            setPosition(100);
            setTimeout(() => {
                setShow(false);
                setMessage("");
                setInfo("");
            }, 500);
        }
    }, [survey]);

    const handleLike = async () => {
        handleMsg("LIKE");
    };

    const handleDislike = async () => {
        handleMsg("DISLIKE");
    };

    const handleMsg = async (like: string) => {
        try {
            closeSurvey();
            setTimeout(() => {
                handleSuccess("תודה רבה על המשוב!");
            }, 150);
            await fetchSendMsg({ msg: `${info} -- ${like}`, type: survey.condition });
        } catch (error) {
            console.error(error);
        }
    };

    return show ? (
        <motion.section
            initial={{ opacity: 0, translateX: "-50%" }}
            animate={{
                opacity: 1,
                translateX: "-50%",
                translateY: position,
                transition: { duration: 0.3 },
            }}
            exit={{ opacity: 0 }}
            className={styles.survey_container}
        >
            <IoClose onClick={closeSurvey} className={styles.survey_close} />
            <div>{message}</div>
            <div className={styles.survey_likes_btns}>
                <AiOutlineLike onClick={handleLike} className={styles.survey_likes_btn} />
                <AiOutlineDislike onClick={handleDislike} className={styles.survey_likes_btn} />
            </div>
        </motion.section>
    ) : null;
}

export default Survey;
