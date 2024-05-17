import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import Profile from "../../auth/Profile/Profile";
import LimitIndicator from "../../LimitIndicator/LimitIndicator";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./Header.module.css";

type HeaderProps = {
    goBack: () => void;
    isFade?: boolean;
};

function Header({ goBack, isFade = false }: HeaderProps) {
    const { loading, isLoggedIn, currentUser } = useAuthContext();
    const style = isFade ? styles.header_fade : styles.header;
    const styleIcon = isFade ? styles.back_icon_fade : styles.back_icon;

    return (
        <section className={style}>
            <IoMdArrowRoundBack onClick={goBack} className={styleIcon}></IoMdArrowRoundBack>
            {!loading ? (
                isLoggedIn ? (
                    <Profile
                        img={currentUser?.image || ""}
                        name={currentUser?.name || "r"}
                        role="guide"
                    />
                ) : (
                    <LimitIndicator />
                )
            ) : null}
        </section>
    );
}

export default Header;
