import React from "react";
import styles from "./toggleButton.module.css"
import { ReactComponent as SvgDelete } from "./icon-delete.svg";
import { ReactComponent as SvgEdit } from "./icon-edit.svg";
import { ReactComponent as SvgReply } from "./icon-reply.svg";

export default function ToggleButton({ onClick, state, type, children }) {
    let svg;
    if (type === "delete") {
        svg = <SvgDelete></SvgDelete>
    } else if (type === "edit") {
        svg = <SvgEdit></SvgEdit>
    } else {
        svg = <SvgReply></SvgReply>
    }

    return (
        <button className={type === "delete" ? `${styles.button} ${styles.button_delete}` : styles.button} onClick={() => onClick(!state)}>
            {svg} {children}
        </button>
    )
}