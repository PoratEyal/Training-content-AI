import Popup from "../../core/Popup/Popup";
import styles from "./LimitRequests.module.css";
import MainBtn from "../../MainBtn/MainBtn";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useSignIn from "../../../hooks/useSignIn";
import route from "../../../router/route.json"

function LimitRequest({ handleAccept }) {
    const navigate = useNavigate();
    const handleStart = () => navigate(route.details);
    const { signInBtnText, signInDisabled, signInWithGoogle } = useSignIn(
        handleStart,
        "התחברות...",
        "התחברות",
        "התחברות",
    );

    return (
        <Popup>
            <IoCloseOutline onClick={handleAccept} className={styles.back_icon} />
            <label className={styles.label}>
                הגעתם למגבלת הפעולות, <br></br>כדי להמשיך ולהנות מפעולות ותכנים נוספים, התחברו בחינם
                עכשיו
            </label>
            <label className={styles.label2}>וקבלו גישה מלאה!</label>

            <div className={styles.btn_div}>
                <MainBtn
                    isDisabled={signInDisabled}
                    height={38}
                    text={signInBtnText}
                    func={signInWithGoogle}
                ></MainBtn>
            </div>
        </Popup>
    );
}

export default LimitRequest;
