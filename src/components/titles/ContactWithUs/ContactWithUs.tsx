import React from "react";
import styles from "./ContactWithUs.module.css";

function ContactWithUs() {
    return (
        <div className={styles.contact_title}>
            <h1>
                ספרו לנו מה <br /> אתם חושבים
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

export default ContactWithUs;
