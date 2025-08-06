//
// This file defines the UnderBar component, which shows a bottom navigation bar
//
import NavHome from "../../options/NavigationBar/Best/NavHome";
import NavContests from "../../options/NavigationBar/Best/NavContests";
import NavHOF from "../../options/NavigationBar/Best/NavHof";
import styles from "./NavigationBar.module.css";

const BestNavigationBar = () => {

    return (
        <nav className={styles.navbar_container}>
            <NavHome />
            <NavContests />
            <NavHOF />
        </nav>
    );
};

export default BestNavigationBar;
