import React, { useState } from "react";
import styles from "./LikeBtns.module.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

type LikeBtnsProps = {};

function LikeBtns({}: LikeBtnsProps) {
    const [selectLike, setSelectLike] = useState(false);
    const [selectDislike, setSelectDislike] = useState(false);

    const handleClickLike = () => {
        setSelectLike((prev) => !prev);
        setSelectDislike(false);
    };

    const handleClickDislike = () => {
        setSelectDislike((prev) => !prev);
        setSelectLike(false);
    };

    return (
        <div className={styles.iconBtn}>
            <AiOutlineLike
                onClick={handleClickLike}
                style={selectLike ? { color: "green" } : { color: "orange" }}
            />
            <AiOutlineDislike
                onClick={handleClickDislike}
                style={selectDislike ? { color: "red" } : { color: "orange" }}
            />
        </div>
    );
}

export default LikeBtns;
