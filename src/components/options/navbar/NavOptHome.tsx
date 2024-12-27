import styles from "./navbar.module.css";
import route from "../../../router/route.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icons } from "../../Icons";

const NavOptHome = () => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsSelected(location.pathname === route.home);
    }, [location.pathname]);

    return (
        <div
            onClick={()=>navigate(route.home)}
            className={isSelected ? styles.navbar_icon_selected : styles.navbar_icon}
        >
            <Icons.home className={styles.icon} />
            <span className={styles.text}>מסך הבית</span>
        </div>
    );
};

export default NavOptHome;
