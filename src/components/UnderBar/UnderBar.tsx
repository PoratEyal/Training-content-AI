import styles from "./UnderBar.module.css";
import NavOptBuild from "../options/navbar/NavOptBuild";
import NavOptContent from "../options/navbar/NavOptContent";
import NavOptHome from "../options/navbar/NavOptHome";
import NavOptMyActivities from "../options/navbar/NavOptMyActivities";
import { useAuthContext } from "../../context/AuthContext";

const UnderBar = () => {
    const { isLoggedIn } = useAuthContext();
    return (
        <nav className={styles.navbar_container}>
            <NavOptHome />
            <NavOptBuild />
            <NavOptContent />
            {isLoggedIn ? <NavOptMyActivities /> : null}
        </nav>
    );
};

export default UnderBar;
