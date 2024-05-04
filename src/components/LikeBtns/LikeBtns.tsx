import { useEffect, useState } from "react";
import styles from "./LikeBtns.module.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { Activity } from "../../models/types/activity";
import { useContentContext } from "../../context/ContentContext";
import { fetchUpdateActivityLikes } from "../../utils/fetch";
import { useErrorContext } from "../../context/ErrorContext";

type LikeBtnsProps = {
    activity: Activity;
    reset: boolean;
};

function LikeBtns({ activity, reset }: LikeBtnsProps) {
    const { contextUpdateSet } = useContentContext();
    const { handleError } = useErrorContext();
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectLike, setSelectLike] = useState(false);
    const [selectDislike, setSelectDislike] = useState(false);

    useEffect(()=>{
        if(reset){
            setSelectLike(false);
            setSelectDislike(false);
        }
    }, [reset])

    const handleClickLike = async () => {
        try {
            setIsDisabled(true);
            setSelectLike((prev) => !prev);
            setSelectDislike(false);
            const contextUpdateFunc = contextUpdateSet[activity.path as keyof Activity];
            await fetchUpdateActivityLikes(contextUpdateFunc, {
                activity,
                likesAmount: selectLike ? -1 : 1,
            });
        } catch (error) {
            handleError(error);
        } finally {
            setIsDisabled(false);
        }
    };

    const handleClickDislike = async () => {
        try {
            setIsDisabled(true);
            setSelectDislike((prev) => !prev);
            setSelectLike(false);
            const contextUpdateFunc = contextUpdateSet[activity.path as keyof Activity];
            await fetchUpdateActivityLikes(contextUpdateFunc, {
                activity,
                likesAmount: selectDislike ? 1 : -1,
            });
        } catch (error) {
            handleError(error);
        } finally {
            setIsDisabled(false);
        }
    };

    return (
        <div className={styles.linkBtns}>
            <AiOutlineLike
                className={styles.like}
                onClick={isDisabled ? () => {} : handleClickLike}
                style={selectLike ? { color: "green" } : { color: "orange" }}
            />
            <AiOutlineDislike
                className={styles.dislike}
                onClick={isDisabled ? () => {} : handleClickDislike}
                style={selectDislike ? { color: "red" } : { color: "orange" }}
            />
        </div>
    );
}

export default LikeBtns;
