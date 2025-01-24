import React from "react";
import styles from "./EditBtn.module.css";
import { motion } from "framer-motion";
import { AiFillEdit } from "react-icons/ai";
import route from "../../../../router/route.json";
import { useNavigate } from "react-router-dom";
import { moreOptionsButtonVariants } from "../../../../utils/style";

type EditBtnProps = {
    index: number;
};

const EditBtn: React.FC<EditBtnProps> = ({ index }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route.edit);
    };

    return (
        <motion.div
            className={styles.editBtn}
            onClick={handleClick}
            // custom={options.length - 1 - index}
            custom={4 - 1 - index}
            variants={moreOptionsButtonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <AiFillEdit className={styles.icon} />
        </motion.div>
    );
};

export default EditBtn;
