//
// This file defines the UnderBar component, which shows a bottom navigation bar
//
import styles from "./NavigationBar.module.css";
import NavTopic from "../../options/NavigationBar/Words/NavTopic";
import NavHome from "../../options/NavigationBar/Words/NavHome";

const WordsNavigationBar = () => {

    return (
        <nav className={styles.navbar_container}>
            <NavHome />
            <NavTopic />
        </nav>
    );
};

export default WordsNavigationBar;
