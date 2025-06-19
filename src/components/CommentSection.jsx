import React from "react";
import { useState, useEffect, useRef } from "react";
import CommentListItem from "./CommentListItem"
import CommentRepliesListItem from "./CommentRepliesListItem"

export default function CommentSection({ curUser }) {
    const { comments, loaded } = useComments();

    if (!loaded) return

    return (
        <CommentList comments={comments} curUser={curUser}></CommentList>
    )

}

function CommentList({ comments, curUser }) {
    return (
        <>
            {
                comments.map(comment => {
                    return <CommentListItem key={comment.id} comment={comment} curUser={curUser}>
                        <CommentRepliesList replies={comment.replies} curUser={curUser}></CommentRepliesList>
                    </CommentListItem>
                })
            }

        </>
    )
}

function CommentRepliesList({ replies, curUser, comment }) {

    return (
        <>
            {
                replies.map(reply => {
                    return <CommentRepliesListItem key={reply.id} reply={reply} curUser={curUser} comment={comment}></CommentRepliesListItem>
                })
            }
        </>
    )
}


function useComments() {
    const [comments, setComments] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getComments()
            .then(data => setComments(data))
            .catch(e => console.error(`server error ${e}`))
            .finally(() => setLoaded(true));

    }, []);

    return { comments, loaded }
}

function getComments() {
    return fetch("http://localhost:3001/comments?_embed=replies")
        .then(resonse => {
            if (!resonse.ok) throw new Error(`oops ${resonse.status}`);
            return resonse.json();
        })
}

export function calcActualDate(DbDate) {
    let actualDate = new Date() - DbDate;

    if (actualDate < 60000) {
        return "just now"
    }

    let min = Math.floor(actualDate / 60000);

    if (min < 60) {
        return min + (min > 1 ? " minutes ago" : " minute ago");
    }

    let hours = Math.floor(min / 60);

    if (hours < 24) {
        return hours + (hours > 1 ? " hours ago" : " hour ago")
    }

    let days = Math.floor(hours / 24);

    if (days < 7) {
        return days + (days > 1 ? " days ago" : " day ago")
    };

    let weeks = Math.floor(days / 7);

    if (weeks < 4) {
        return weeks + (weeks > 1 ? " weeks ago" : " week ago")
    };

    let month = Math.floor(days / 30)

    if (month < 12) {
        return month + (month > 1 ? " months ago" : " month ago")
    }

    let year = Math.floor(month / 12);

    return year + (year > 1 ? " years ago" : " year ago")

}
