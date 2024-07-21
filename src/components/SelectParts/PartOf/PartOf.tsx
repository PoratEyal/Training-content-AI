import React, { useEffect, useState } from "react";
import styles from "./PartOf.module.css";
import { motion } from "framer-motion";

type PartOfProps = {
    part: number;
    of: number;
    triggerLimit: boolean;
};

function PartOf({ part, of, triggerLimit }: PartOfProps) {
    return (
        <div className={styles.part_of}>
            <span>
                <motion.span
                    initial={{ fontSize: "12px" }}
                    animate={{ fontSize: triggerLimit ? "16px" : "12px" }}
                    transition={{ duration: 0.1 }}
                >
                    {of}
                </motion.span>{" "}
                /{" "}
            </span>
            <span>{part}</span>
        </div>
    );
}

export default PartOf;
