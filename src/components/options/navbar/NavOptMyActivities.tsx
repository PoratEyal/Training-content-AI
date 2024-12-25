import styles from "./navbar.module.css";
import route from "../../../router/route.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";

const NavOptMyActivities = () => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsSelected(location.pathname === route.myactivities);
    }, [location.pathname]);

    return (
        <div
            onClick={()=>navigate(route.myactivities)}
            className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
        >
            <IoBookmarkOutline className={styles.icon} />
            <span className={styles.text}>הפעולות שלי</span>
        </div>
    );
};

export default NavOptMyActivities;
