//
// This file defines the UnderBar component, which shows a bottom navigation bar
//
import styles from "./NavigationBar.module.css";
import NavTopic from "../../options/NavigationBar/Practice/NavTopic";
import NavHome from "../../options/NavigationBar/Practice/NavHome";

const PracticeNavigationBar = () => {

    return (
        <nav className={styles.navbar_container}>
            <NavHome />
            <NavTopic />
        </nav>
    );
};

export default PracticeNavigationBar;
