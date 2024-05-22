import styles from "./Activity.module.css";
import { useContentContext } from "../../context/ContentContext";
import ActivityOutput from "../../components/ActivityOutput/ActivityOutput";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Layout/Header/Header";
import BlurEffect from "../../components/BlurEffect/BlurEffect";

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
            <BlurEffect height="95vh">
                <Header goBack={goBack} isFade />
                <article>
                    {data?.movement?.path.map((path, i) => {
                        return path.activity ? (
                            <ActivityOutput key={i} index={i} movementPath={path} />
                        ) : null;
                    })}
                </article>
            </BlurEffect>
        </section>
    );
}

export default Activity;
