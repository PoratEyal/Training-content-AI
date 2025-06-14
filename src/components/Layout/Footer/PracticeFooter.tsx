//
// This file defines the UnderBar component, which shows a bottom navigation bar
//
import styles from "./Footer.module.css";
import NavOptTopic from "../../options/footerNavBar/NavOptTopic";
import NavOptHome from "../../options/footerNavBar/NavOptHome";

const PracticeFooter = () => {

    return (
        <nav className={styles.navbar_container}>
            <NavOptHome />
            <NavOptTopic />
        </nav>
    );
};

export default PracticeFooter;
