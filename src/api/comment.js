
import { TIME_ZONE } from '../Helpers/statics'
import firebase from '../utils/Firebase'

const db = firebase.firestore()


const getComments = (comicID, episodeID, num, order, start) => start ? db.collection(`comics/${comicID}/episodes/${episodeID}/comments`).orderBy(order[0], order[1]).startAfter(start).limit(num).get() : db.collection(`comics/${comicID}/episodes/${episodeID}/comments`).orderBy(order[0], order[1]).limit(num).get()

const getReplies = (comicID, episodeID, commentID, num, start) => start ? db.collection(`comics/${comicID}/episodes/${episodeID}/comments/${commentID}/reply`).orderBy("created").startAfter(start).limit(num).get() : db.collection(`comics/${comicID}/episodes/${episodeID}/comments/${commentID}/reply`).orderBy("created").limit(num).get()


const postComment = (creator, comicID, episodeID, commentID, replyID, poster, message, location) => db.doc(location).set({
    id : replyID === null ? commentID : replyID,
    comicID,
    episodeID,
    poster,
    message,
    likes : 0,
    created : new Date().getTime() + TIME_ZONE,
    [replyID === null ? "total_reply" : "commentID"] : replyID === null ? 0 : commentID
}).then(() => {

    return db.doc(`updateCount/${replyID === null ? commentID : replyID}`).set({
        comicID,
        episodeID,
        commentID,
        replyID,
        add : true,
        poster: poster[1],
        creator
    })

})




const likeComment = (comicID, episodeID, commentID, replyID, user, requestID) => db.doc(`${replyID === null ? 'commentLike' : 'replyLike'}/${requestID}`).set({
    comicID,
    episodeID,
    commentID,
    replyID,
    user
})





const deleteComment = (user, creator, comicID, episodeID, commentID, replyID, location) => db.doc(location).delete().then(() => {

    return db.doc(`updateCount/${replyID === null ? commentID : replyID}`).set({
        comicID,
        episodeID,
        commentID,
        replyID,
        add : false,
        poster: user,
        creator
    })


})














const operations = {

    getComments,
    postComment,
    likeComment,
    getReplies,
    deleteComment
    
}


export default operations

