import { useCallback, useEffect, useState } from "react";
import styles from "./LikeBtns.module.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { Activity } from "../../models/types/activity";
import { useErrorContext } from "../../context/ErrorContext";
import { useContentContext } from "../../context/ContentContext";
import { fetchUpdateActivityLikes } from "../../utils/fetch";
import msg from "../../models/resources/errorMsg.json";

type LikeBtnsProps = {
    activity: Activity;
    reset: boolean;
};

function LikeBtns({ activity, reset }: LikeBtnsProps) {
    const { handleError } = useErrorContext();
    const { updateMainActivity } = useContentContext();

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
        if (like === undefined && dislike === undefined) return;

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
        try {
            const response = await fetchUpdateActivityLikes({
                activity,
                likesAmount,
            });
            if (response.result === "success" && response.activity) {
                updateMainActivity(response.activity);
            }
        } catch (error) {
            console.error(error)
        }
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
                    color: action.like ? "white" : "#708254",
                    borderColor: action.like ? "#4CAF50" : "#708254",
                    backgroundColor: action.like ? "#4CAF50" : "rgba(255, 255, 255, 0)",
                }}
            />
            <AiOutlineDislike
                className={styles.dislike}
                onClick={handleClickDislike}
                style={{
                    color: action.dislike ? "white" : "#708254",
                    borderColor: action.dislike ? "#F44336" : "#708254",
                    backgroundColor: action.dislike ? "#F44336" : "rgba(255, 255, 255, 0)",
                }}
            />
        </div>
    );
}

export default LikeBtns;
