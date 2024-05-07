import styles from "./ShareBtns.module.css";
import { WhatsappShareButton } from "react-share";
import { FaWhatsapp } from "react-icons/fa";
import { useErrorContext } from "../../context/ErrorContext";
import { formatCopy, formatWhatsUp } from "../../utils/format";

type ShareBtnsProps = {
    text: string;
};

function ShareBtns({ text }: ShareBtnsProps) {
    const { handleSuccess } = useErrorContext();

    const handleCopy = () => {
        navigator.clipboard.writeText(formatCopy(text));
        handleSuccess("הפעילות הועתקה בהצלחה");
    };

    return (
        <div className={styles.share_btns}>
            <WhatsappShareButton url={"https://activitybuilders.com/"} title={formatWhatsUp(text)}>
                <div className={styles.whatsapp_btn}>
                    <FaWhatsapp size={30} />
                </div>
            </WhatsappShareButton>
            <button onClick={handleCopy} className={styles.copy_btn}>
                <div className={styles.copy_btn_text}>
                    <label>העתק פעילות</label>
                </div>
            </button>
        </div>
    );
}

export default ShareBtns;
