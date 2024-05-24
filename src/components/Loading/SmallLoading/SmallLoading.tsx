import React from "react";
import styles from "./SmallLoading.module.css";
import { VscLoading } from "react-icons/vsc";

function SmallLoading() {
    return <VscLoading className={styles.loading} />;
}

export default SmallLoading;
