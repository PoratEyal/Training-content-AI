//
// MagicBtn component generates a random subject from a given options list
// When the button is clicked, it triggers the generation of a new subject 
// and displays a loading indicator while the process is ongoing.
// Once the subject is generated, it updates the state with the new subject name.
//
import { useState } from "react";
import styles from "./MagicBtn.module.css";
import SmallLoading from "../Loading/SmallLoading/SmallLoading";
import { Icons } from "../Icons";

type MagicBtnProps = {
    setSubject: (newSubject: string) => void;
    options: any;
    size?: number;
    bottom?: number;
    left?: number;
};

function MagicBtn({ setSubject, options, size = 19, bottom = 7, left = 12 }: MagicBtnProps) {
    const [loadingMagic, setLoadingMagic] = useState(false);

    const generateSubject = async () => {
        setSubject("");
        setLoadingMagic(true);
        setTimeout(() => {
            let activities = options;
            const randomIndex = Math.floor(Math.random() * activities.length);
            setSubject(activities[randomIndex].name);
            setLoadingMagic(false);
        }, 500);
    };

    return (
        <span className={styles.magic_icon} style={{ fontSize: size, left, bottom }}>
            {loadingMagic ? (
                <SmallLoading />
            ) : (
                <Icons.magic onClick={() => generateSubject()} />
            )}
        </span>
    );
}

export default MagicBtn;
