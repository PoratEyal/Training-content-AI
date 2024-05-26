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
        <section className={styles.container}>
            <Header goBack={goBack}/>

            <h2 className={styles.h2}>הפעילות שלכם מוכנה</h2>

            <div className={styles.activity_data_container}>
                <div className={styles.activity_data}>
                    {data?.movement?.path.map((path, i) => {
                        return path.activity ? (
                            <ActivityOutput key={i} index={i} movementPath={path} />
                        ) : null;
                    })}
                </div>
            </div>


        </section>


    );
}

export default Activity;
