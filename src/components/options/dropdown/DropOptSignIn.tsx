//
// This is a dropdown option that initiates the sign-in process for the user.
// It uses Google sign-in and dynamically navigates to the group details page based on language.
//
import useSignIn from "../../../hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import route from "../../../router/route.json";
import styles from "./dropdown.module.css";
import { Icons } from "../../Icons";
import { useLanguage } from "../../../i18n/useLanguage";

type DropOptSignInProps = {
  handleClose: () => void;
};

function DropOptSignIn({ handleClose }: DropOptSignInProps) {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  // Determine the group details path based on the active language (fallback to Hebrew)
  const groupDetailsPath = route[`GroupDetails${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || route.GroupDetailsHe;

  const handleStart = () => navigate(groupDetailsPath);
  const { signInWithGoogle } = useSignIn(handleStart);

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
