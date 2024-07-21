import styles from "./CreateYourActivity.module.css";

function CreateYourActivity() {
    return (
        <div className={styles.choose_activity_subject_title}>
            <h1>
                צרו את<br></br> הפעילות שלכם
            </h1>
            <img
                title="Sparks effect"
                alt="Sparks effect"
                src={"page3_effect.svg"}
                loading="lazy"
                width={23}
                height={24}
            ></img>
        </div>
    );
}

export default CreateYourActivity;
