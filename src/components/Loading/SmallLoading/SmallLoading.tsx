import React from "react";
import styles from "./SmallLoading.module.css";
import { Icons } from "../../Icons";

function SmallLoading() {
    return <Icons.loading className={styles.loading} />;
}

export default SmallLoading;
