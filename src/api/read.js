
import firebase from '../utils/Firebase'

const db = firebase.firestore()


//for now
const showPopular = () => db.collection(`comics`).where("published", "==", true).limit(7).get()



const getComicData = (id) => db.doc(`comics/${id}`).get()
const getComicStats = (comicID) => db.doc(`comics/${comicID}/public_comic/${comicID}`).get()


const getComicsByOrder = (genre, start, byWhat, num) => start ? db.collectionGroup('public_comic').where("published", "==", true).where("genre", "==", genre).orderBy(byWhat, "desc").startAfter(start).limit(num).get() : db.collectionGroup('public_comic').where("published", "==", true).where("genre", "==", genre).orderBy(byWhat, "desc").limit(num).get()
const showThisComic = (genre, comicName) => db.collection('comics').where("genre", "==", genre).where("url", "==", comicName).where("published", "==", true).limit(1).get()





const updateSub = (comicID, creator, userID, requestID) => db.doc(`comicSubscribe/${requestID}`).set({
    comicID,
    userID,
    creator
})



const updateRate = (comicID, userID, num, requestID) => db.doc(`comicRate/${requestID}`).set({
    comicID,
    userID,
    num
})


const getEpisodes = (comicID, endAt) => db.collection(`comics/${comicID}/episodes`).where("published", "==", true).orderBy("serial", "desc").startAt(endAt).limit(10).get()



const getEpisode = (genre, name, chapter) => db.collection(`comics`).where("genre", "==", genre).where("published", "==", true).where("url", "==", name).limit(1).get().then(querySnapshot => {

     return db.collection(`comics/${querySnapshot.docs[0].id}/episodes`).where("published", "==", true).where("serial", "==", Number(chapter)).get()

})


const relatedToCreator = (creator) => db.collection(`comics`).where("published", "==", true).where("createdBy", "==", creator).orderBy("updated", "desc").limit(3).get()
const relatedToGenre = (genre) => db.collection('comics').where("published", "==", true).where("genre", "==", genre).orderBy("updated", "desc").limit(3).get()


const getEpisodeStat = (comicID, episodeID) => db.doc(`comics/${comicID}/episodes/${episodeID}/public_episode/${episodeID}`).get()

const getImages = (comicID, episodeID) => db.doc(`comics/${comicID}/episodes/${episodeID}/view/images`).get()


const readCount = (comicID, episodeID, user, requestID) => db.doc(`comicRead/${requestID}`).set({
    comicID,
    episodeID,
    user
})

const payForRead = (comicID, episodeID, userID) => db.doc(`payForRead/${userID}_${comicID}_${episodeID}`).set({
    comicID,
    episodeID,
    userID
})


const likeEpisode = (creator, comicID, episodeID, user, requestID) => db.doc(`episodeLike/${requestID}`).set({
    comicID,
    episodeID,
    user,
    creator
})

const operations = {

    getComicsByOrder,
    getComicData,
    showThisComic,
    getComicStats,
    updateSub,
    updateRate,
    getEpisodes,
    getEpisodeStat,
    payForRead,
    getEpisode,
    getImages,
    readCount,
    likeEpisode,
    relatedToCreator,
    relatedToGenre,
    showPopular
}


export default operations

