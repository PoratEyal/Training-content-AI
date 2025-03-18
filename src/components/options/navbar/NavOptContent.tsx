import { useLocation, useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import styles from "./navbar.module.css";
import { useEffect, useState } from "react";
import { Icons } from "../../Icons";
import { useTranslation } from "react-i18next";

const NavOptContent = () => {
    const { t } = useTranslation();
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsSelected(location.pathname.includes(route.content) ? true : false);
    }, [location.pathname]);

    return (
        <div
            onClick={() => navigate(route.content)}
            className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
        >
            <Icons.output className={styles.icon} />
            <span className={styles.text}>{t("navbar.content")}</span>
        </div>
    );
};

export default NavOptContent;
