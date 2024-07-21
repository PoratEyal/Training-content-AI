import React, { useRef, useState } from "react";
import styles from "./SelectedPartAnimation.module.css";
import { motion } from "framer-motion";
import { MovementPart } from "../../../../models/types/movement";
import useClickOutside from "../../../../hooks/useClickOutside";
import Draggable from "../../../dnd/Draggable";
import magic from "../../../../models/resources/magic.json";
import MagicBtn from "../../../MagicBtn/MagicBtn";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";

type SelectedPartProps = {
    part: MovementPart;
    index: number;
    setPartSubject: (part: MovementPart, subject: string) => void;
    removePart: (part: MovementPart) => void;
};

function SelectedPartAnimation({ part, index, setPartSubject, removePart }: SelectedPartProps) {
    const [animation, setAnimation] = useState<boolean>(true);
    const [subject, setSubject] = useState<string>(part.partSubject || "");
    const ref = useRef(null);
    useClickOutside(ref, () => setAnimation(false));

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        // Limit the value to 60 characters
        if (newValue.length <= 60) {
            setSubject(newValue);
            setPartSubject(part, newValue);
        }
    };

    const changeSubject = (newSubject: string) => {
        setSubject(newSubject);
        setPartSubject(part, newSubject);
    };

    const handleClose = () => {
        removePart(part);
    };

    const onResize = () => {
        setAnimation((prev) => !prev);
    };

    return (
        <Draggable
            draggableId={`S-${part.name}-${index}`}
            setAnimation={setAnimation}
            args={{ part }}
        >
            <div style={{ width: animation ? "260px" : "100px" }}>
                <motion.span
                    className={styles.part_container}
                    initial={{ width: "100px" }}
                    animate={{ width: animation ? "260px" : "100px" }}
                    transition={{ duration: animation ? 0.2 : 0.1 }}
                    style={{ backgroundColor: part.color || "#D8E0F5" }}
                    ref={ref}
                >
                    <span className={styles.part_selected}>
                        <span className={styles.part_right}>
                            <span className={styles.part_close_btn} onClick={handleClose}>
                                <IoClose />
                            </span>
                            <span className={styles.part_title} onClick={onResize}>
                                {part.title}
                                {animation ? null : <IoIosArrowBack />}
                            </span>
                        </span>
                        <motion.span
                            className={styles.part_left}
                            animate={{
                                display: animation ? "inline-block" : "none",
                            }}
                            transition={{ duration: 0, delay: animation ? 0.3 : 0 }}
                        >
                            <input
                                className={styles.part_input}
                                type="text"
                                placeholder="מידע נוסף?"
                                value={subject}
                                onChange={onInputChange}
                            />
                            {magic[part.name] ? (
                                <MagicBtn
                                    options={magic[part.name]}
                                    setSubject={changeSubject}
                                    size={16}
                                    bottom={-2}
                                    left={-20}
                                />
                            ) : null}
                        </motion.span>
                    </span>
                </motion.span>
            </div>
        </Draggable>
    );
}

export default SelectedPartAnimation;
