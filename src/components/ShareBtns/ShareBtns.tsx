import styles from "./ShareBtns.module.css";
import { WhatsappShareButton } from "react-share";
import { FaWhatsapp } from "react-icons/fa";
import { useErrorContext } from "../../context/ErrorContext";
import { formatCopy, formatWhatsUp } from "../../utils/format";
import { FaRegCopy } from "react-icons/fa6";
import { WEBSITE_URL } from "../../models/constants";


type ShareBtnsProps = {
    text: string;
};

function ShareBtns({ text }: ShareBtnsProps) {
    const { handleSuccess } = useErrorContext();

    const handleCopy = () => {
        navigator.clipboard.writeText(formatCopy(text));
        handleSuccess("הפעולה הועתקה בהצלחה");
    };

    return (
        <div className={styles.share_btns}>
            <WhatsappShareButton url={WEBSITE_URL} title={formatWhatsUp(text)}>
                <div className={styles.whatsapp_btn}>
                    <FaWhatsapp />
                </div>
            </WhatsappShareButton>
            <div onClick={handleCopy} className={styles.copy_btn}>
                <FaRegCopy />
            </div>
        </div>
    );
}

export default ShareBtns;
