import React from "react";
import MyForm from "./MyForm";
import { removeUserNameFromContnet } from "./EditBar";

export default function ReplyBar({ comment, curUser }) {
    const { id, user } = comment;
    return (
        <MyForm fetchFunc={sendReplyRequest} curUser={curUser} user={user} id={id}>Reply</MyForm>
    )
}


function sendReplyRequest(e, curUser, replyingTo, id) {

    const payload = new FormData(e.target);
    let content = removeUserNameFromContnet(replyingTo, payload.get("comment"));
    console.log(payload);
    const date = new Date().getTime();


    fetch(`http://localhost:3001/replies/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            commentId: id,
            content,
            createdAt: date,
            score: 0,
            replyingTo,
            user: {
                image: {
                    png: "./images/avatars/image-juliusomo.png",
                    webp: "./images/avatars/image-juliusomo.webp"
                },
                username: curUser,
            },
        })
    }).then(res => res.json()).then(data => console.log(data));

}
