import React from "react";
import { useState, useEffect } from "react";
import { useCurrentUser } from "../App";
import MyForm from "./MyForm";


export default function CommentBar() {
    const { curUser, loaded } = useCurrentUser();
    if (!loaded) return

    return (
        <MyForm fetchFunc={sendRequest} curUser={curUser}>Send</MyForm>
    )
}


function sendRequest(e, username) {
    //e.preventDefault();
    const payload = new FormData(e.target);
    const date = new Date().getTime();
    //console.log([...payload]);


    fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: payload.get("comment"),
            createdAt: date,
            score: 0,
            user: {
                username,
                image: {
                    png: "./images/avatars/image-juliusomo.png",
                    webp: "./images/avatars/image-juliusomo.webp"
                },
            }
        }),

    }).then(res => res.json()).then(data => console.log(data));

}