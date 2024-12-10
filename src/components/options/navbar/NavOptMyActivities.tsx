import styles from "./navbar.module.css";
import route from "../../../router/route.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

const NavOptMyActivities = () => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsSelected(location.pathname === route.saved);
    }, [location.pathname]);

    return (
        <div
            onClick={()=>navigate(route.saved)}
            className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
        >
            <CgProfile className={styles.icon} />
            <span className={styles.text}>הפעולות שלי</span>
        </div>
    );
};

export default NavOptMyActivities;
