import React from "react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import ScoreItem from "./scoreItem/ScoreItem";
import styles from "./CommentSection.module.css";
import { calcActualDate } from "./CommentSection";
import ReplyBar from "./ReplyBar";
import EditBar from "./EditBar";
import ModalDelete from "./ModalDelete";
import ToggleButton from "./mainButton/ToggleButton";



export default function CommentRepliesListItem({ reply, curUser }) {

    const [showReply, setShowReply] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const commentRef = useRef(null);
    let curUsername = curUser.username;
    let selfReply = curUsername == reply.user.username ? true : false;

    return (
        <>
            {showDelete && createPortal(<ModalDelete comment={reply} type={"replies"} show={showDelete} setShow={setShowDelete}></ModalDelete>, document.body)}
            <div className={styles.comment_reply} >
                <div className={styles.comment__container}>
                    <div className={styles.comment__score}>
                        <ScoreItem score={reply.score} comment={reply} type={"replies"}></ScoreItem>
                    </div>
                    <div className={styles.comment__body}>
                        <div className={styles.comment__info}>
                            <picture className={styles.comment__avatar}>
                                <source srcSet={reply.user.image.webp} />
                                <source srcSet={reply.user.image.png} />
                                <img src="./images/avatars/placeholder.png" alt="avatar-placeholder" />
                            </picture>
                            <p className={styles.comment__info_name}>{reply.user.username} {selfReply && <span className={styles.you}>YOU</span>}</p>
                            <p className={styles.comment__info_time}>{calcActualDate(reply.createdAt)}</p>
                            {selfReply &&
                                <div>
                                    <ToggleButton onClick={setShowDelete} state={showDelete} type={"delete"}>Delete</ToggleButton>
                                    <ToggleButton onClick={setShowEdit} state={showEdit} type={"edit"}>Edit</ToggleButton>
                                </div>
                            }
                            {!selfReply && <ToggleButton onClick={setShowReply} state={showReply} type={"reply"}>Reply</ToggleButton>}
                        </div>
                        <div ref={commentRef} className={styles.comment__content}>
                            <p className={showEdit ? styles.commnet__text_hidden : null}><a href="#" onClick={e => e.preventDefault()}>@{reply.replyingTo}</a>{reply.content}</p>
                            {showEdit && <EditBar type={"replies"} comment={reply} replyText={commentRef}></EditBar>}
                        </div>
                    </div>
                </div>
                {showReply && <ReplyBar comment={reply} curUser={curUser}></ReplyBar>}
            </div>
        </>

    )
}
