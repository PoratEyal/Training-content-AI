import useSignIn from "../../../hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import styles from "./dropdown.module.css";
import { Icons } from "../../Icons";


type DropOptSignInProps = {
    handleClose: () => void;
};

function DropOptSignIn({ handleClose }: DropOptSignInProps) {
    const navigate = useNavigate();
    const handleStart = () => navigate(route.details);

    const { signInWithGoogle } = useSignIn(handleStart);

    const handleClick = () => {
        signInWithGoogle();
        handleClose();
    };

    return (
        <span className={styles.text_and_icon} onClick={() => handleClick()}>
            התחברות
            <Icons.login />
        </span>
    );
}

export default DropOptSignIn;
