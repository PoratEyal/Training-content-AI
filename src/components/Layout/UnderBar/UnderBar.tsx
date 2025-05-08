import styles from "./UnderBar.module.css";
import NavOptBuild from "../../options/navbar/NavOptBuild";
import NavOptContent from "../../options/navbar/NavOptContent";
import NavOptHome from "../../options/navbar/NavOptHome";
import NavOptMyActivities from "../../options/navbar/NavOptMyActivities";
import { useAuthContext } from "../../../context/AuthContext";
import { useLanguage } from "../../../i18n/useLanguage";

const UnderBar = () => {
    const { isHebrew } = useLanguage();
    const { isLoggedIn } = useAuthContext();

    return (
        <nav className={styles.navbar_container}>
            <NavOptHome />
            <NavOptBuild />
            {isHebrew ? <NavOptContent /> : null}
            {isLoggedIn ? <NavOptMyActivities /> : null}
        </nav>
    );
};

export default UnderBar;
