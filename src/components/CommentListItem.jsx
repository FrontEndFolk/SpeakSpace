import React from "react";
import { useState, useEffect, useRef } from "react";
import ScoreItem from "./scoreItem/ScoreItem";
import styles from "./CommentSection.module.css";
import { calcActualDate } from "./CommentSection";
import ReplyBar from "./ReplyBar";
import EditBar from "./EditBar";
import ModalDelete from "./ModalDelete";
import ToggleButton from "./mainButton/ToggleButton";

export default function CommentListItem({ comment, curUser, children }) {

    const [showReply, setShowReply] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const commentRef = useRef(null);
    let curUsername = curUser.username;
    let selfReply = curUsername == comment.user.username ? true : false;



    return (
        <>
            {showDelete && <ModalDelete comment={comment} type={"comments"} show={showDelete} setShow={setShowDelete}></ModalDelete>}
            <div className={styles.comment} key={comment.id}>
                <div className={styles.comment__container}>
                    <div className={styles.comment__score}>
                        <ScoreItem score={comment.score} comment={comment} type={"comments"}></ScoreItem>
                    </div>
                    <div className={styles.comment__body}>
                        <div className={styles.comment__info}>
                            <picture className={styles.comment__avatar}>
                                <source srcSet={comment.user.image.webp} />
                                <source srcSet={comment.user.image.png} />
                                <img src="./images/avatars/placeholder.png" alt="avatar-placeholder" />
                            </picture>
                            <p className={styles.comment__info_name}>{comment.user.username} {(curUsername == comment.user.username) && <span className={styles.you}>YOU</span>}</p>
                            <p className={styles.comment__info_time}>{calcActualDate(comment.createdAt)}</p>
                            {(curUsername == comment.user.username) &&
                                <div>
                                    <ToggleButton onClick={setShowDelete} state={showDelete} type={"delete"}>Delete</ToggleButton>
                                    <ToggleButton onClick={setShowEdit} state={showEdit} type={"edit"}>Edit</ToggleButton>
                                </div>
                            }
                            {!selfReply && <ToggleButton onClick={setShowReply} state={showReply} type={"reply"}>Reply</ToggleButton>}
                        </div>
                        <div ref={commentRef} className={styles.comment__content}>
                            <p className={showEdit ? styles.commnet__text_hidden : null}>{comment.content}</p>
                            {showEdit && <EditBar type={"comments"} comment={comment} username={curUsername} replyText={commentRef}></EditBar>}
                        </div>
                    </div>
                </div>
                {showReply && <ReplyBar comment={comment} curUser={curUser}></ReplyBar>}
            </div>
            <div className={styles.stick}>
                {children}
            </div>
        </>


    )
}