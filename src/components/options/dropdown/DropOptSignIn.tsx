//
// This is a dropdown option that initiates the sign-in process for the user.
// It uses Google sign-in and dynamically navigates to the group details page based on language.
//
import useSignIn from "../../../hooks/useSignIn";
import styles from "./dropdown.module.css";
import { Icons } from "../../Icons";
import { useLanguage } from "../../../i18n/useLanguage";

type DropOptSignInProps = {
  handleClose: () => void;
};

function DropOptSignIn({ handleClose }: DropOptSignInProps) {

  const { t } = useLanguage();
  const { signInWithGoogle } = useSignIn();

  const handleClick = () => {
    signInWithGoogle();
    handleClose();
  };

  return (
    <span className={styles.text_and_icon} onClick={handleClick}>
      {t("profile.dropOptSignIn.signIn")}
      <Icons.login />
    </span>
  );
}

export default DropOptSignIn;
