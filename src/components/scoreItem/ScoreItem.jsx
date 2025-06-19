import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as SvgPlus } from "./icon-plus.svg";
import { ReactComponent as SvgMinus } from "./icon-minus.svg";
import styles from "./scoreItem.module.css"


// i feel like there is a better solution to this 
export default function ScoreItem({ score, comment, type }) {
    const [votes, setVotes] = useState(score);
    const [upVote, setUpVote] = useState(true);
    const [downVote, setDownVote] = useState(true);
    const updatedVotes = useRef(score);

    return (
        <div className={styles.score}>
            <div className={styles.score__body}>
                <span className={!upVote ? `${styles.score__button_plus_active} ${styles.score__button} ${styles.score__button_plus}` : `${styles.score__button} ${styles.score__button_plus}`} onClick={() => {

                    if (upVote && downVote) {
                        setVotes(votes + 1);
                        updatedVotes.current++;
                    }
                    else if (upVote && !downVote) {
                        setVotes(votes + 2)
                        updatedVotes.current += 2;
                    } else if (!upVote && downVote) {
                        setVotes(votes - 1);
                        updatedVotes.current--;
                    } else {
                        setVotes(votes - 2);
                        updatedVotes.current -= 2;
                    }
                    setUpVote(!upVote);
                    setDownVote(true);
                    fetchScore(updatedVotes.current, comment, type)

                }}>
                </span>
                <div>{votes}</div>
                <span className={!downVote ? `${styles.score__button_minus_active} ${styles.score__button} ${styles.score__button_minus} ` : `${styles.score__button} ${styles.score__button_minus}`} onClick={() => {

                    if (downVote && upVote) {
                        setVotes(votes - 1);
                        updatedVotes.current--;
                    }
                    else if (downVote && !upVote) {
                        setVotes(votes - 2)
                        updatedVotes.current -= 2;
                    } else if (!downVote && upVote) {
                        setVotes(votes + 1);
                        updatedVotes.current++;
                    } else {
                        setVotes(votes + 2);
                        updatedVotes.current += 2;
                    }
                    setUpVote(true);
                    setDownVote(!downVote);
                    fetchScore(updatedVotes.current, comment, type)

                }}>
                </span>
            </div>

        </div>

    )
}


function fetchScore(newScore, comment, type) {

    comment.score = newScore;
    fetch(`http://localhost:3001/${type}/${comment.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    })
        .then(res => res.json())
        .then(data => data)
        .catch(e => e);
}