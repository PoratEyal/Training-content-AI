import styles from "./UnderBar.module.css";
import NavOptShare from "../options/navbar/NavOptShare";
import NavOptBuild from "../options/navbar/NavOptBuild";
import NavOptContent from "../options/navbar/NavOptContent";

const UnderBar = ( ) => {
    return (
        <nav className={styles.navbar_container}>
            <NavOptContent />
            <NavOptBuild />
            <NavOptShare />
        </nav>
    );
};

export default UnderBar;
