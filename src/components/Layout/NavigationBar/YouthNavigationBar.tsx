//
// This file defines the UnderBar component, which shows a bottom navigation bar
//
import styles from "./NavigationBar.module.css";
import NavHome from "../../options/NavigationBar/Youth/NavHome";
import NavBuild from "../../options/NavigationBar/Youth/NavBuild";
import NavContent from "../../options/NavigationBar/Youth/NavContent";
import NavMyActivities from "../../options/NavigationBar/Youth/NavMyActivities";
import { useAuthContext } from "../../../context/AuthContext";
import { useLanguage } from "../../../i18n/useLanguage";

const YouthFooter = () => {
    const { isHebrew } = useLanguage();      // We keep this only because Static Content exist only for Hebrew site
    const { isLoggedIn } = useAuthContext();

    return (
        <nav className={styles.navbar_container}>
            <NavHome />
            <NavBuild />
            {isHebrew ? <NavContent /> : null}
            {isLoggedIn ? <NavMyActivities /> : null}
        </nav>
    );
};

export default YouthFooter;
