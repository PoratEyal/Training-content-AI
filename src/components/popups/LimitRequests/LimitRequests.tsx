import Popup from "../../core/Popup/Popup";
import styles from "./LimitRequests.module.css";
import MainBtn from "../../MainBtn/MainBtn";
import { IoCloseOutline } from "react-icons/io5";
import {
    GoogleAuthProvider,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../../../config/firebase";
import { initRawUser } from "../../../utils/user";
import { fetchCreateNewUser } from "../../../utils/fetch";
import { useNavigate } from "react-router-dom";

function LimitRequest({ handleAccept }) {

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await setPersistence(auth, browserLocalPersistence);
            const userResult = await signInWithPopup(auth, provider);
            if (userResult) {
                const rawUser = initRawUser(userResult.user);
                await fetchCreateNewUser({ rawUser });
                handleStart();
            }
        } catch (error) {
            //TODO: Handle Errors
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("error - ", error)
        }
    };

    const handleStart = () => navigate("/details");

    return (
        <Popup>
            <IoCloseOutline onClick={handleAccept} className={styles.back_icon}/>
            <label className={styles.label}>הגעתם למגבלת הפעולות, <br></br>כדי להמשיך ולהנות מפעולות ותכנים נוספים, התחברו בחינם עכשיו</label>
            <label className={styles.label2}>וקבלו גישה מלאה!</label>

            <div className={styles.btn_div}>
                <MainBtn
                    type="submit"
                    isDisabled={false}
                    height={38}
                    text={"התחברות"}
                    func={signInWithGoogle}
                ></MainBtn>
            </div>
        </Popup>
    );
}

export default LimitRequest;


