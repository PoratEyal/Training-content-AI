import styles from "./TSCs.module.css";
import policy from "../../../models/resources/policy.json";
import Modal from "../Modal/Modal";

function TSCs({ handleAccept }) {
    return (
        <Modal>
            <div className={styles.container}>
                <h3 className={styles.h3_privacy}>מדיניות פרטיות</h3>

                <div className={styles.space_div}>
                    <label>{policy.p1.label}</label> {policy.p1.text}
                </div>

                <div className={styles.space_div}>
                    <label>{policy.p2.label}</label> {policy.p2.text}
                </div>

                <div className={styles.space_div}>
                    <label>{policy.p3.label}</label> {policy.p3.text}
                </div>

                <div className={styles.space_div}>
                    <label>{policy.p4.label}</label> {policy.p4.text}
                </div>

                <div className={styles.space_div}>
                    <label>{policy.p5.label}</label> {policy.p5.text}
                </div>

                <div className={styles.space_div}>
                    <label>{policy.p6.label}</label> {policy.p6.text}
                </div>

                <div className={styles.space_div}>
                    <label>{policy.p7.label}</label> {policy.p7.text}
                </div>

                <div className={styles.space_div}>
                    <label>{policy.p8.label}</label> {policy.p8.text}
                </div>

                <button className={styles.submit_btn} onClick={handleAccept}>
                    אישור
                </button>
            </div>
        </Modal>
    );
}

export default TSCs;
