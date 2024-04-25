import styles from './maintenance.module.css';

function Maintenance() {
    return <div className={styles.container}>
        <img className={styles.img} src='maintenance.png'></img>

        <div className={styles.div}>
            בשל עומס רב באתר, אנו נאלצים להוריד אותו זמנית לצורך שדרוג ושיפורים.
        </div>

        <div className={styles.div}>
            אנו מתנצלים על אי הנוחות ומבטיחים לחזור בהקדם האפשרי 
            .אנו צופים שהאתר יחזור לפעילות תוך מספר ימים.
        </div>

        <div className={styles.div}>
            אנו ממליצים לכם לבדוק שוב את האתר בעוד מספר ימים.
        </div>

        <h2 className={styles.h2}>
            תודה רבה על ההבנה!
        </h2>

    </div>
}

export default Maintenance