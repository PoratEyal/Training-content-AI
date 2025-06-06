import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./MoreOptionsCollapse.module.css";
import Collapse from "../core/Collapse/Collapse";
import useToggle from "../../hooks/useToggle";
import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/useLanguage";

type MoreOptionsCollapseProps = {
  children: React.ReactNode | React.ReactNode[];
  text?: string;
};

const MoreOptionsCollapse: React.FC<MoreOptionsCollapseProps> = ({
  children,
  text,
}) => {
  const { t, dir } = useLanguage();         
  const isRtl = dir === "rtl";
  const [isOpen, toggle] = useToggle(false);

  const handleCollapse = () => toggle();

  return (
    <div
      className={styles.options_collapse_container}
      dir={isRtl ? "rtl" : "ltr"}             
    >
      <span className={styles.options_container} onClick={handleCollapse}>
        <label className={styles.collapse_text}>
          {text ? t(text) : t("moreOptions")}
        </label>

        <span className={styles.sizeMedium}>
          <motion.div
            className={styles.toggelArrowAnimation}
            animate={{
              rotate: isOpen ? (isRtl ? -90 : 90) : 0, 
            }}
            transition={{ duration: 0.2 }}
          >
            {isRtl ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </motion.div>
        </span>
      </span>

      <Collapse isOpen={isOpen} diraction="down">
        <section className={styles.collapse_form}>{children}</section>
      </Collapse>
    </div>
  );
};

export default MoreOptionsCollapse;
