//
// This is a Maintenance page
// It displays a friendly message and image to inform users that the site is temporarily down for upgrades
// The text and layout are styled using the Maintenance.module.css file
//
import styles from "./Maintenance.module.css";

function Maintenance() {
    return (
        <div className={styles.container}>
            <img
                className={styles.img}
                alt="Man fixing laptop with tools and gears."
                src="maintenance.png"
            />
            <div className={styles.div}>We are temporarily taking the site offline for upgrades and improvements.</div>
            <div className={styles.div}>We apologize for the inconvenience and promise to be back as soon as possible.</div>
            <h2 className={styles.h2}>Thank you for your understanding!</h2>
        </div>
    );
}

export default Maintenance;

