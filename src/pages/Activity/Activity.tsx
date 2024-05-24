import styles from "./Activity.module.css";
import { useContentContext } from "../../context/ContentContext";
import ActivityOutput from "../../components/ActivityOutput/ActivityOutput";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/Layout/Header/Header";
import { IoShareSocial } from "react-icons/io5";

function Activity() {
    const { data, clearPath } = useContentContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!data || !data.grade || !data.movement || data.movement.path.length === 0) {
            goBack();
        }
    }, []);

    const goBack = () => {
        clearPath();
        navigate("/choosePath");
    };

    return (
        <div className={styles.container}>
            <Header goBack={goBack} isFade />

            {data?.movement?.path.map((path, i) => {
                return path.activity ? (
                    <ActivityOutput key={i} index={i} movementPath={path} />
                ) : null;
            })}

            {/* <div className={styles.btn_div}>
                <div className={styles.shareBtn}>
                    <label>הזמינו חברים</label>
                    <IoShareSocial></IoShareSocial>
                </div>
            </div> */}

        </div>


    );
}

export default Activity;
