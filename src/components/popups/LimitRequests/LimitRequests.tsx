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
import { initUser } from "../../../utils/user";
import { fetchCreateNewUser } from "../../../utils/fetch";
import { GoogleUser } from "../../../models/types/user";
import { useNavigate } from "react-router-dom";

function LimitRequest({ handleAccept }) {

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await setPersistence(auth, browserLocalPersistence);
            const userResult = await signInWithPopup(auth, provider);
            if (userResult) {
                const user = userResult.user as unknown as GoogleUser;
                const newUser = initUser(user);
                await fetchCreateNewUser({ newUser });
                handleAccept()
                handleStart();
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        }
    };

    const handleStart = () => navigate("/details");

    return (
        <Popup>
            <IoCloseOutline onClick={handleAccept} className={styles.back_icon}/>
            <div className={styles.div}>הגעת למגבלת הפעולות שלך!</div>
            <label className={styles.label}>כדי להמשיך ולהנות מעוד פעולות ותכנים, הירשם בחינם עכשיו</label>
            <label className={styles.label2}>וקבל גישה מלאה!</label>

            <div className={styles.btn_div}>
                <MainBtn
                    type="submit"
                    isDisabled={false}
                    height={38}
                    text={"להרשמה"}
                    func={signInWithGoogle}
                ></MainBtn>
            </div>
        </Popup>
    );
}

export default LimitRequest;


