//
// This file defines the UnderBar component, which shows a bottom navigation bar
//
import NavHome from "../../options/NavigationBar/Best/NavHome";
import NavPlay from "../../options/NavigationBar/Best/NavPlay";
import NavCreate from "../../options/NavigationBar/Best/NavCreate";
import NavHOF from "../../options/NavigationBar/Best/NavHof";
import styles from "./NavigationBar.module.css";

const BestNavigationBar = () => {

    return (
        <nav className={styles.navbar_container}>
            <NavHome />
            <NavPlay />
            <NavCreate />
            <NavHOF />
        </nav>
    );
};

export default BestNavigationBar;
