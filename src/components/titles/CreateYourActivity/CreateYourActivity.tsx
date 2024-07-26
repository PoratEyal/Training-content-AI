import styles from "./CreateYourActivity.module.css";

function CreateYourActivity() {
    return (
        <div className={styles.create_your_activity_title}>
            <h1>
                צרו את<br></br> הפעולה שלכם
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
