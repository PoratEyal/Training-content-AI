import React from "react";
import styles from "./SignUp.module.css";
import Popup from "../../core/Popup/Popup";
import UserProfile from "../../auth/UserProfile/UserProfile";

function SignUp() {
    return (
        <Popup>
            <h1>הרשמה</h1>
            <section>
                <UserProfile size="large" />
                <button>connect with Google</button>
            </section>
        </Popup>
    );
}

export default SignUp;
