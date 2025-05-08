import styles from "./navbar.module.css";
import route from "../../../router/route.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icons } from "../../Icons";
import { useLanguage } from "../../../i18n/useLanguage";

const NavOptHome = () => {
    const { t } = useLanguage();
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsSelected(location.pathname === route.home);
    }, [location.pathname]);

    return (
        <div
            onClick={() => navigate(route.home)}
            className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
        >
            <Icons.home className={styles.icon} />
            <span className={styles.text}>{t("navbar.home")}</span>
        </div>
    );
};

export default NavOptHome;
