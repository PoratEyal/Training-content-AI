import { useCallback, useEffect, useState } from "react";
import styles from "./LikeBtns.module.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { Activity } from "../../models/types/activity";
import { useErrorContext } from "../../context/ErrorContext";

type LikeBtnsProps = {
    activity: Activity;
    reset: boolean;
};

function LikeBtns({ activity, reset }: LikeBtnsProps) {
    const { handleError } = useErrorContext();

    const [action, setAction] = useState({ like: undefined, dislike: undefined });
    const [debouncedLiked, setDebouncedLiked] = useState(false);
    const [debouncedDisliked, setDebouncedDisliked] = useState(false);

    useEffect(() => {
        if (reset) {
            setAction({ like: undefined, dislike: undefined });
        }
    }, [reset]);

    useEffect(() => {
        let likeTimeHandler: NodeJS.Timeout;
        let dislikeTimeHandler: NodeJS.Timeout;
        const { like, dislike } = action;

        if ((like || !like) && dislike === undefined) {
            likeTimeHandler = setTimeout(() => {
                if (debouncedLiked !== like) {
                    setDebouncedLiked(like);
                    sendLikeStatusToServer(like ? 1 : -1);
                }
            }, 1500);
        } else if ((dislike || !dislike) && like === undefined) {
            dislikeTimeHandler = setTimeout(() => {
                if (debouncedDisliked !== dislike) {
                    setDebouncedDisliked(dislike);
                    sendLikeStatusToServer(dislike ? -1 : 1);
                }
            }, 1000);
        }
        return () => {
            clearTimeout(likeTimeHandler);
            clearTimeout(dislikeTimeHandler);
        };
    }, [action]);

    const sendLikeStatusToServer = useCallback(async (likesAmount: number) => {
        // const contextUpdateFunc = contextUpdateSet[activity.path as keyof Activity];
        // try {
        //     await fetchUpdateActivityLikes(contextUpdateFunc, {
        //         activity,
        //         likesAmount,
        //     });
        // } catch (error) {
        //     handleError(error);
        // }
    }, []);

    const handleClickLike = async () => {
        setAction((prev) => {
            return { like: !prev.like, dislike: undefined };
        });
    };

    const handleClickDislike = async () => {
        setAction((prev) => {
            return { like: undefined, dislike: !prev.dislike };
        });
    };

    return (
        <div className={styles.linkBtns}>
            <AiOutlineLike
                className={styles.like}
                onClick={handleClickLike}
                style={{
                    color: action.like ? "green" : "#333335",
                    borderColor: action.like ? "green" : "#333335",
                }}
            />
            <AiOutlineDislike
                className={styles.dislike}
                onClick={handleClickDislike}
                style={{
                    color: action.dislike ? "red" : "#333335",
                    borderColor: action.dislike ? "red" : "#333335",
                }}
            />
        </div>
    );
}

export default LikeBtns;
