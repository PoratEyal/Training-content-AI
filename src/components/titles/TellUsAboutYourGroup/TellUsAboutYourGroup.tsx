import styles from "./TellUsAboutYourGroup.module.css";

function TellUsAboutYourGroup() {
    return (
        <div className={styles.tell_us_title}>
            <h1>
                ספרו לנו על <br /> הקבוצה שלכם
            </h1>
            <img
                title="Yellow line image"
                alt="Yellow line image"
                src={"detailsLine.svg"}
                loading="lazy"
                width={90}
                height={5}
            ></img>
        </div>
    );
}

export default TellUsAboutYourGroup;
