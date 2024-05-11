import React from "react";
import styles from "./SignUp.module.css";
import Popup from "../../core/Popup/Popup";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { fetchCreateNewUser } from "../../../utils/fetch";
import { GoogleUser } from "../../../models/types/user";
import { initUser } from "../../../utils/user";

type SignUpProps = {
    closeFunc: () => void;
};

function SignUp({ closeFunc }: SignUpProps) {
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const userResult = await signInWithPopup(auth, provider);
            closeFunc();
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(userResult);
            // const token = credential.accessToken;
            if (userResult) {
                const user = userResult.user as unknown as GoogleUser;
                const newUser = initUser(user);
                await fetchCreateNewUser({ newUser });
            }
        } catch (error) {
            //TODO: Handle Errors
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            closeFunc();
        }
    };

    const signInWithApple = () => {};

    const signInWithFacebook = () => {};

    return (
        <Popup closeFunc={closeFunc} hasCloseBtn>
            <h1>הרשמה</h1>
            <section>
                <button onClick={signInWithGoogle}>connect with Google</button>
                <button onClick={signInWithApple}>connect with Apple</button>
                <button onClick={signInWithFacebook}>connect with Facebook</button>
            </section>
        </Popup>
    );
}

export default SignUp;
