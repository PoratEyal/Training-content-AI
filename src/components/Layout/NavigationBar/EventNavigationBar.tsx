//
// This file defines the UnderBar component, which shows a bottom navigation bar
//
import styles from "./NavigationBar.module.css";
import NavBuild from "../../options/NavigationBar/Event/NavBuild";
import NavHome from "../../options/NavigationBar/Event/NavHome";

const EventNavigationBar = () => {

    return (
        <nav className={styles.navbar_container}>
            <NavHome />
            <NavBuild />
        </nav>
    );
};

export default EventNavigationBar;
