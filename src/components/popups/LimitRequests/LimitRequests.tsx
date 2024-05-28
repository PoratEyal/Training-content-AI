import Popup from "../../core/Popup/Popup";
import styles from "./LimitRequests.module.css";
import MainBtn from "../../MainBtn/MainBtn";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useSignIn from "../../../hooks/useSignIn";
import route from "../../../router/route.json";

type LimitRequestProps = {
    handleAccept: () => void;
};

function LimitRequest({ handleAccept }: LimitRequestProps) {
    const navigate = useNavigate();

    const handleSignIn = () => {
        handleAccept();
        navigate(route.home);
    };
    
    const { signInBtnText, signInDisabled, signInWithGoogle } = useSignIn(
        handleSignIn,
        "התחברות...",
        "התחברות",
        "התחברות",
    );

    return (
        <Popup>
            <IoCloseOutline onClick={handleAccept} className={styles.back_icon} />
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
                    func={signInWithGoogle}
                ></MainBtn>
            </div>
        </Popup>
    );
}

export default LimitRequest;
