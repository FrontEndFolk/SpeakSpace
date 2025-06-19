import React from "react";
import ActionButton from "./actionButton/ActionButton";
import styles from "./CommentSection.module.css";

export default function MyForm({ fetchFunc, curUser, user, id, children }) {
    let curUsername = curUser.username;

    let defVal = user ? `@${user.username}` : ""

    user = user ? user : { username: "" };

    return (
        <form className={styles.replyBar}
            onSubmit={(e) => { fetchFunc(e, curUsername, user.username, id) }}
        >
            <picture className={styles.replyBar__avatar}>
                <source srcSet={curUser.image.webp} />
                <source srcSet={curUser.image.png} />
                <img src="./images/avatars/placeholder.png" alt="avatar-placeholder" />
            </picture>
            <textarea rows={5} className={styles.replyBar__input} required name="comment" type="text" defaultValue={defVal} />
            <ActionButton>{children}</ActionButton>
        </form>
    )
}