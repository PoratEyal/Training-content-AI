import React from "react";
import styles from "./SignUp.module.css";
import axios from "axios";
import Popup from "../../core/Popup/Popup";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
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

    const signInWithFacebook = async () => {
        const provider = new FacebookAuthProvider();
        try {
            const userResult = await signInWithPopup(auth, provider);
            const credential = FacebookAuthProvider.credentialFromResult(userResult);
            const token = credential.accessToken;
            axios
                .get(
                    `https://graph.facebook.com/${userResult.user.providerData[0].uid}/picture?type=large&redirect=false&access_token=${token}`,
                )
                .then((res) => res.data.blob())
                .then((blob) => {
                    console.log("blob:", URL.createObjectURL(blob));
                });

            console.log("userResult:", userResult);
            // closeFunc();
            // if (userResult) {
            //     const user = userResult.user as unknown as GoogleUser;
            //     const newUser = initUser(user);
            //     await fetchCreateNewUser({ newUser });
            // }
        } catch (error) {
            closeFunc();
        }
    };

    return (
        <Popup closeFunc={closeFunc} hasCloseBtn>
            <h1>הרשמה</h1>
            <section>
                <button onClick={signInWithGoogle}>connect with Google</button>
                <br />
                <button onClick={signInWithFacebook}>connect with Facebook</button>
            </section>
        </Popup>
    );
}

export default SignUp;
