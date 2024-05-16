import styles from "./Activity.module.css";
import { useContentContext } from "../../context/ContentContext";
import ActivityOutput from "../../components/ActivityOutput/ActivityOutput";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import Profile from "../../components/auth/Profile/Profile";
import { IoMdArrowRoundBack } from "react-icons/io";

function Activity() {
    const { data } = useContentContext();
    const { isLoggedIn, currentUser } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!data || !data.grade || !data.movement || data.movement.path.length === 0) {
            goingBack();
        }
    }, []);

    const goingBack = () => {
        navigate("/choosePath");
    };

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                {isLoggedIn ? (
                    <Profile
                        img={currentUser?.image || ""}
                        name={currentUser?.name || "r"}
                        role="guide"
                    />
                ) : null}

                <IoMdArrowRoundBack className={styles.back_icon} onClick={goingBack}></IoMdArrowRoundBack>
            </div>

            {data?.movement?.path.map((path, i) => {
                return path.activity ? (
                    <ActivityOutput key={i} index={i} movementPath={path} />
                ) : null;
            })}
        </div>
    );
}

export default Activity;
