import styles from "./dropdown.module.css";
import policy from "../../../models/resources/policy.json";
import { Icons } from "../../Icons";

type ContactUsProps = {
    handleClose: () => void;
};

function DropOptContactUs({ handleClose }: ContactUsProps) {
    const contactUs = () => {
        const emailLink = document.createElement("a");
        emailLink.href = `mailto:${policy.p10.email}`;
        emailLink.click();
    };

    const handleClick = () => {
        contactUs();
        handleClose();
    };

    return (
        <span className={styles.text_and_icon} onClick={() => handleClick()}>
            צרו קשר
            <Icons.contactUs />
        </span>
    );
}

export default DropOptContactUs;
