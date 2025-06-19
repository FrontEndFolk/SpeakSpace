import React, { useEffect, useState } from "react";
import styles from "./CommentSection.module.css";
import ActionButton from "./actionButton/ActionButton";


export default function EditBar({ type, comment, replyText }) {
    const [text, setText] = useState(false);
    let userName = comment.user.username;
    useEffect(() => {
        setText(text => text = replyText.current.textContent);
    }, [])

    if (!text) return;

    return (
        <form onSubmit={(e) => { sendEditRequest(e, comment, type) }}>
            <textarea rows={5} className={styles.editBar__input} required name="comment" type="text" defaultValue={text} />
            <div className={styles.editBar__button_container}>
                <ActionButton>Edit</ActionButton>
            </div>
        </form>
    )
}


function sendEditRequest(e, comment, type) {
    //e.preventDefault();
    const payload = new FormData(e.target);
    //console.log(payload.get("comment").substring(userName.length + 1));
    comment.content = removeUserNameFromContnet(comment.replyingTo, payload.get("comment"));


    fetch(`http://localhost:3001/${type}/${comment.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    }).then(res => res.json()).then(data => console.log(data));
}

export function removeUserNameFromContnet(userName, content) {
    let firstWord = content.split(' ', 1)[0];
    //console.log(firstWord, ('@' + userName));
    if (firstWord === ('@' + userName)) {
        return content.substring(userName.length + 1);
    } else {
        return content;
    }
}