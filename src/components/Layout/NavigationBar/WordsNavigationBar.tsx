//
// This file defines the UnderBar component, which shows a bottom navigation bar
//
import styles from "./NavigationBar.module.css";
import NavVocab from "../../options/NavigationBar/Words/NavVocab";
import NavHome from "../../options/NavigationBar/Words/NavHome";

const PracticeFooter = () => {

    return (
        <nav className={styles.navbar_container}>
            <NavHome />
            <NavVocab />
        </nav>
    );
};

export default PracticeFooter;
