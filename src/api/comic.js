import { TIME_ZONE } from '../Helpers/statics'
import firebase from '../utils/Firebase'

const db = firebase.firestore()


const createComic = (uid, name, comicID) => db.doc(`comics/${comicID}`).set({
    id : comicID,
    createdBy : uid,
    created : new Date().getTime() + TIME_ZONE,
    creator : [],
    name : "",
    genre : "",
    about : "",
    completed : false,
    updated : new Date().getTime() + TIME_ZONE,
    published : false,
    images : {
        thumbnail : "",
        large : ""
    },
    sGenre : "",
    url : "",
    noOfEpisodes : 0,
    adult : false,
    creatorName : name
}).then(() => {

    db.doc(`comics/${comicID}/financeData/${comicID}`).set({
        totalReadPay : 0,
        totalCoinPay : 0,
        totalDonation : 0,
        donationList : [],
        monthlyStats : [],
        adRevenue : "not-enrolled"
    })

    return db.doc(`comics/${comicID}/public_comic/${comicID}`).set({

        rating : {
            total_points : 0,
            total_users : 0
        },
        subscribe : 0,
        likes : 0,
        genre : "",
        id : comicID,
        reads : 0,
        published : false,
        createdBy : uid
    })

})




const getComicsByUid = (uid) => db.collection('comics').where('createdBy', "==", uid).get()

const updateComic = (creator, name, slugName, about, genre, genreBefore, sGenre, publish, publishBefore, adult, completed, comicID, creatorName, oldSlugName, nameChange) => nameChange ? (

    db.collection("slugNames").where("url", "==", slugName).where("id", "!=", comicID).get().then(querySnapShot => {

    let newSlugName = ""

    querySnapShot.size === 0 ? newSlugName = slugName : newSlugName = `${slugName}-${Math.random().toString(36).substring(2, 8)}`

    db.doc(`comics/${comicID}`).update({
            name,
            about,
            genre,
            adult,
            sGenre,
            url : newSlugName,
            published : publish,
            completed
        }).then(() => {

            db.doc(`slugNames/${comicID}`).set({
                id: comicID,
                url : newSlugName
            }).then(() => {

                return db.doc(`updateComic/${comicID}_${new Date().getTime()}`).set({
                    comicID,
                    name,
                    newSlugName,
                    creatorName,
                    genre : publish ? genre : "",
                    genreBefore,
                    published : publish,
                    publishBefore,
                    creator
                })

            })
            
        })

    })

) : (

    genre !== genreBefore || publish !== publishBefore ? (

        db.doc(`comics/${comicID}`).update({
            about,
            genre,
            sGenre,
            adult,
            published : publish,
            completed
        }).then(() => {
            return db.doc(`updateComic/${comicID}_${new Date().getTime()}`).set({
                comicID,
                name,
                newSlugName : oldSlugName,
                creatorName,
                genre : publish ? genre : "",
                genreBefore,
                published : publish,
                publishBefore,
                creator
            })
        })

    ) : (

        db.doc(`comics/${comicID}`).update({
            about,
            sGenre,
            adult,
            completed
        })

    )

    

)



const showComic = (url) => db.collection("comics").where("url", "==", url).get()




const publishEpisode = (comicID, episodeID, publish, user) => db.doc(`comics/${comicID}/episodes/${episodeID}`).update({
    published : publish,
    updated : new Date().getTime() + TIME_ZONE,
    serial : ""
}).then(() => {
    db.doc(`comics/${comicID}`).update({ updated : new Date().getTime() + TIME_ZONE})

    db.collection(`comics/${comicID}/episodes`).where("published", "==", true).where("createdBy", "==", user).orderBy("updated", "asc").get().then(querySnapShot => {
        querySnapShot.docs.map((doc, index) =>  db.doc(`comics/${comicID}/episodes/${doc.id}`).update({ serial : index + 1 }))

        db.doc(`comics/${comicID}`).update({ noOfEpisodes : querySnapShot.size })

        db.doc(`updateEpisode/${comicID}_${episodeID}`).set({
            creator : user,
            publish,
            comicID
        })
    })
})


const createEpisode = (comicID, episodeID, createdBy) => db.doc(`comics/${comicID}/episodes/${episodeID}`).set({
    id : episodeID,
    comicID,
    published: false,
    updated : new Date().getTime() + TIME_ZONE,
    created : new Date().getTime() + TIME_ZONE,
    pay : false,
    thumbnail : "",
    createdBy,
    serial : "",
    title : ""
}).then(() => {

    db.doc(`comics/${comicID}/episodes/${episodeID}/public_episode/${episodeID}`).set({
        likes : 0,
        reads : 0,
        total_comments : 0,
        comicID,
        payAccess : 0,
        readGraph : []
    })

    return db.doc(`comics/${comicID}/episodes/${episodeID}/view/images`).set({
        id : `${comicID}_${episodeID}`,
        comicID,
        episodeID,
        images : [],
        createdBy
    })
        
    
})

const deleteEpisode = (comicID, episodeID) => {

    db.doc(`comics/${comicID}/episodes/${episodeID}/public_episode/${episodeID}`).delete()
    db.doc(`comics/${comicID}/episodes/${episodeID}/view/images`).delete()
    db.doc(`comics/${comicID}/episodes/${episodeID}`).delete()


}


const deleteComic = (comicID) => {
    db.doc(`comics/${comicID}/public_comic/${comicID}`).delete()
    db.doc(`comics/${comicID}/financeData/${comicID}`).delete()
    return db.doc(`comics/${comicID}`).delete()
}


const getEpisode = (comicID, episodeID) => db.doc(`comics/${comicID}/episodes/${episodeID}`).get()

const getImages = (comicID, episodeID) => db.doc(`comics/${comicID}/episodes/${episodeID}/view/images`).get()


const updateEpisode = (title, episodeData, pay, images) => db.doc(`comics/${episodeData.comicID}/episodes/${episodeData.id}`).update({
    title,
    pay
}).then(() => {
    db.doc(`comics/${episodeData.comicID}/episodes/${episodeData.id}/view/images`).update({
        images
    })
})


const getFinance = (comicID) => db.doc(`comics/${comicID}/financeData/${comicID}`).get()

const adRequest = (comicID, apply) => db.doc(`adApply/${comicID}`).set({
    comicID,
    apply,
    timer : null
})


const getSearchIndexes = () => db.doc('search/indexes').get()


const operations = {
    createComic,
    getComicsByUid,
    updateComic,
    publishEpisode,
    createEpisode,
    getEpisode,
    updateEpisode,
    showComic,
    getImages,
    getFinance,
    adRequest,
    deleteEpisode,
    deleteComic,
    getSearchIndexes
}


export default operations