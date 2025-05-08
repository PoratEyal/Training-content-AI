import styles from "./navbar.module.css";
import route from "../../../router/route.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icons } from "../../Icons";
import { useLanguage } from "../../../i18n/useLanguage";

const NavOptBuild = () => {
    const { t } = useLanguage();
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        location.pathname === route.details ||
        location.pathname === route.build ||
        location.pathname === route.activity
            ? setIsSelected(true)
            : setIsSelected(false);
    }, [location.pathname]);

    return (
        <div
            onClick={() => navigate(route.details)}
            className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
        >
            <Icons.magic className={styles.icon} />
            <span className={styles.text}>{t("navbar.build")}</span>
        </div>
    );
};

export default NavOptBuild;
