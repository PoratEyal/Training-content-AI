//
// This file defines the UnderBar component, which shows a bottom navigation bar
// It displays different options (Home, Build, Content, My Activities) based on the language and if the user is logged in
//
import styles from "./UnderBar.module.css";
import NavOptBuild from "../../options/navbar/NavOptBuild";
import NavOptContent from "../../options/navbar/NavOptContent";
import NavOptHome from "../../options/navbar/NavOptHome";
import NavOptMyActivities from "../../options/navbar/NavOptMyActivities";
import { useAuthContext } from "../../../context/AuthContext";
import { useLanguage } from "../../../i18n/useLanguage";

const UnderBar = () => {
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

export default UnderBar;
