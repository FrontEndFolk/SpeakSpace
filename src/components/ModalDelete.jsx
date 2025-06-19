import React from "react";
import styles from "./ModalDelete.module.css"





export default function ModalDelete({ comment, type, show, setShow }) {
    const { id } = comment;
    return (
        <div className={`${styles.modal}`} onClick={(e) => { setShow(false) }}>

            <div className={styles.modal__body} onClick={(e) => { e.stopPropagation(); }}>

                <div className={styles.modal__content}>
                    <h2>Delete commnet</h2>
                    <p>Are you sure you want to delete this comment? This will remove the commnet and it can't be undone</p>
                </div>

                <div className={styles.modal__form}>
                    <button className={`${styles.btn} ${styles.btn_cancel}`} onClick={() => setShow(!show)}>No, cancel</button>
                    <form onSubmit={(e) => { deleteComment(id, type) }}>
                        <button className={`${styles.btn} ${styles.btn_accept}`} >Yes, delete</button>
                    </form>
	
                </div>

            </div>

        </div>
    )
}



function deleteComment(id, type) {
    console.log(`http://localhost:3001/${type}/${id}`);
    fetch(`http://localhost:3001/${type}/${id}`, { method: "DELETE" })
        .then(res => res.text())
        .then(data => data);
}