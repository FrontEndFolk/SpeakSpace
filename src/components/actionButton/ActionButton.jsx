import React from "react";
import styles from "./actionButton.module.css"

export default function ActionButton({ children }) {
    return (
        <div className={styles.button__container}>
            <button className={styles.button}>{children}</button>
        </div>
    )
}