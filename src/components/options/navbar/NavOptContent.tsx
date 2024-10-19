import { useLocation, useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import styles from "./navbar.module.css";
import { VscOutput } from "react-icons/vsc";
import { useEffect, useState } from "react";

const NavOptContent = () => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsSelected(location.pathname.includes(route.content) ? true : false);
    }, [location.pathname]);

    const handleOnClick = () => {
        if (!isSelected) {
            navigate(route.content);
        }
    };

    return (
        <div
            onClick={() => navigate(route.content)}
            className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
        >
            <VscOutput className={styles.icon} />
            <span>פעולות מוכנות</span>
        </div>
    );
};

export default NavOptContent;
