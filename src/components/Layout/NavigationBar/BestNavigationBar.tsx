//
// This file defines the UnderBar component, which shows a bottom navigation bar
//
import styles from "./NavigationBar.module.css";
import NavTopic from "../../options/NavigationBar/Best/NavQuiz";
import NavHome from "../../options/NavigationBar/Best/NavHome";

const BestNavigationBar = () => {

    return (
        <nav className={styles.navbar_container}>
            <NavHome />
            <NavTopic />
        </nav>
    );
};

export default BestNavigationBar;
