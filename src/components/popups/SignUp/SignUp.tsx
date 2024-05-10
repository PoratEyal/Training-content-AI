import React from "react";
import styles from "./SignUp.module.css";
import Popup from "../../core/Popup/Popup";
import UserProfile from "../../auth/UserProfile/UserProfile";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../config/firebase";

type SignUpProps = {
    closeFunc: () => void;
};

function SignUp({ closeFunc }: SignUpProps) {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };

    const signInWithApple = () => {};

    const signInWithFacebook = () => {};

    return (
        <Popup closeFunc={closeFunc} hasCloseBtn>
            <h1>הרשמה</h1>
            <section>
                <UserProfile size="large" />
                <button onClick={signInWithGoogle}>connect with Google</button>
                <button onClick={signInWithApple}>connect with Apple</button>
                <button onClick={signInWithFacebook}>connect with Facebook</button>
            </section>
        </Popup>
    );
}

export default SignUp;
