import styles from "./UnderBar.module.css";
import NavOptBuild from "../options/navbar/NavOptBuild";
import NavOptContent from "../options/navbar/NavOptContent";
import NavOptHome from "../options/navbar/NavOptHome";
import NavOptMyActivities from "../options/navbar/NavOptMyActivities";

const UnderBar = ( ) => {
    return (
        <nav className={styles.navbar_container}>
            <NavOptHome />
            <NavOptBuild />
            <NavOptContent />
            <NavOptMyActivities />
        </nav>
    );
};

export default UnderBar;
