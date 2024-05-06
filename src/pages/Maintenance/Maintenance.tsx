import styles from "./Maintenance.module.css";

function Maintenance() {
    return (
        <div className={styles.container}>
            <img className={styles.img} alt="Man fixing laptop with tools and gears." src="maintenance.png"></img>

            <div className={styles.div}>
                בשל עומס רב באתר, אנו נאלצים להוריד אותו זמנית לצורך שדרוג ושיפורים.
            </div>

            <div className={styles.div}>אנו מתנצלים על אי הנוחות ומבטיחים לחזור בהקדם האפשרי</div>

            <div className={styles.div}>אנו ממליצים לכם לבדוק שוב את האתר בעוד מספר ימים.</div>

            <h2 className={styles.h2}>תודה רבה על ההבנה!</h2>
        </div>
    );
}

export default Maintenance;
