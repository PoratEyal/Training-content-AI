import Popup from "../../core/Popup/Popup";
import styles from "./LimitRequests.module.css";
import MainBtn from "../../MainBtn/MainBtn";
import { IoCloseOutline } from "react-icons/io5";
import useSignIn from "../../../hooks/useSignIn";

type LimitRequestProps = {
    handleClose: () => void;
};

function LimitRequest({ handleClose }: LimitRequestProps) {
    const handleSignIn = () => {
        handleClose();
    };

    const { signInBtnText, signInDisabled, signInWithGoogle } = useSignIn(
        handleSignIn,
        "התחברות...",
        "התחברות",
        "התחברות",
    );

    return (
        <Popup>
            <IoCloseOutline onClick={handleClose} className={styles.back_icon} />
            <p className={styles.limit_text_1}>
                הגעתם למגבלת הפעולות, <br></br>כדי להמשיך ולהנות מפעולות ותכנים נוספים, התחברו בחינם
                עכשיו
            </p>
            <h2 className={styles.limit_text_2}>וקבלו גישה מלאה!</h2>

            <div className={styles.limit_sign_in_btn}>
                <MainBtn
                    isDisabled={signInDisabled}
                    height={38}
                    text={signInBtnText}
                    func={()=> signInWithGoogle()}
                ></MainBtn>
            </div>
        </Popup>
    );
}

export default LimitRequest;
