"use strict";

const jsonURL = 'script/data.json'

async function getJSON(url) {
    return fetch(url).then(response => response.json());
}


class Comment {
    constructor(data, container = ".comment-feed", replied = false) {
        this.data = data;
        this.container = document.querySelector(container);
        this.replied = replied;
        this.makeMarkUp();
    };

    makeMarkUp() {
        let { id, content, createdAt, score, replyingTo = '', user, replies } = this.data;
        const { image, username } = user;
        this.id = id
        this.name = user.username;

        if (this.replied) {
            replyingTo = '@' + replyingTo
            this.replied = 'comment-feed__item--nested';
        } else {
            this.replied = '';
        }
        console.log(this.replied)
        this.container.insertAdjacentHTML('beforeend', `
        <section class="comment-feed__item  comm ${username} ${this.replied}">
            <div class="comm__body">
                <div class="comm__votes-body">
                    <div class="comm__upvote-btn">+</div>
                    <div class="comm__votes">${score}</div>
                    <div class="comm__downvote-btn">-</div>
                </div>
                <div class="comm__main-info">
                    <div class="comm__main-info-body-firstrow">
                        <div class="comm__profile-photo"><img src="${image.png}"
                                alt="profile photo">
                        </div>
                        <p class="comm__name">${username}</p>
                        <p class="comm__date"> ${createdAt}</p>
                        <button class="comm__reply-btn">Reply</button>
                    </div>
                    <div class="comm__main-info-body-secondrow">
                        <div class="comm__text">${replyingTo} ${content}</div>
                    </div>
                </div>

            </div>
        </section>
        `)
        if (replies !== undefined) {
            replies.map(e => new Comment(e, `.${username}`, true))
        }
    }

}


document.addEventListener('DOMContentLoaded', () => {
    getJSON(jsonURL).then(data => {
        const { currentUser, comments } = data;
        // const replies = comments.map(e => e.replies);
        // replies.filter(e => e != []).map(e => new Comment(e));
        comments.map(e => new Comment(e));
    })
})



// бля крч идея в том что бы находить комментарий через имя а потом уже добавлять комментрий одновремменно не варик но json хуйня и поэтмоу если будет два одинаковых имени то хуй мы поймем куда пихать или это я тупой но если мы будем делать новый комментарий то я буду брать id по нему искать имя и потом уже вписывать его автоматически в начало комма по идее так должно работать