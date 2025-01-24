import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { TfiMoreAlt } from "react-icons/tfi";
import styles from "./MoreOptionsBtn.module.css";
import { Activity } from "../../models/types/activity";
import CopyBtn from "../options/moreBtn/CopyBtn/CopyBtn";
import SaveBtn from "../options/moreBtn/SaveBtn/SaveBtn";
import EditBtn from "../options/moreBtn/EditBtn/EditBtn";
import ShareBtn from "../options/moreBtn/ShareBtn/ShareBtn";

type MoreOptionsBtnProps = {
    activity: Activity;
    hasSave?: boolean;
    hasEdit?: boolean;
    hasCopy?: boolean;
    hasShare?: boolean;
};

const buildOptions = (props: MoreOptionsBtnProps): JSX.Element[] => {
    const Options: JSX.Element[] = [];
    const { activity } = props;

    if (props.hasSave) {
        Options.push(
            <SaveBtn key={0} index={0} activity={activity} />,
        );
    }

    if (props.hasCopy) {
        Options.push(
            <CopyBtn key={1} index={1} activity={activity} />,
        );
    }

    if (props.hasShare) {
        Options.push(
            <ShareBtn key={2} index={2} activity={activity} />,
        );
    }

    if (props.hasEdit) {
        Options.push(<EditBtn key={3} index={3} />);
    }

    return Options;
};

export const MoreOptionsBtn: React.FC<MoreOptionsBtnProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    const Options = buildOptions(props);

    return (
        <div className={styles.buttonContainer}>
            <AnimatePresence>{isOpen ? <>{Options.map((option) => option)}</> : null}</AnimatePresence>
            <button className={styles.circleButton} onClick={toggleOptions}>
                <TfiMoreAlt />
            </button>
        </div>
    );
};

export default MoreOptionsBtn;
