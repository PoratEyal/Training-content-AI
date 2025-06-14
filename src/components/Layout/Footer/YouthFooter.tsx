//
// This file defines the UnderBar component, which shows a bottom navigation bar
//
import styles from "./Footer.module.css";
import NavOptBuild from "../../options/footerNavBar/NavOptBuild";
import NavOptContent from "../../options/footerNavBar/NavOptContent";
import NavOptHome from "../../options/footerNavBar/NavOptHome";
import NavOptMyActivities from "../../options/footerNavBar/NavOptMyActivities";
import { useAuthContext } from "../../../context/AuthContext";
import { useLanguage } from "../../../i18n/useLanguage";

const YouthFooter = () => {
    const { isHebrew } = useLanguage();      // We use the Static PreWritten Content only for isHebrew check
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

export default YouthFooter;
