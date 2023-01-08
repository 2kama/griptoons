const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.replyLike = functions.firestore
.document('replyLike/{requestID}')
.onCreate(async (snap, context) => {

   
    const { comicID, episodeID, commentID, replyID, user} = snap.data()
    const promises = []

    const db = admin.firestore()

    const { increment } = admin.firestore.FieldValue


    db.doc(`users/${user}/private/info`).get().then(docSnap => {

        if(docSnap.exists) {


            try {

                const ret = db.doc(`comics/${comicID}/episodes/${episodeID}/comments/${commentID}/reply/${replyID}`).update({
                            likes : docSnap.data().replyLiked[`${comicID}_${episodeID}_${commentID}_${replyID}`] ? increment(-1) : increment(1)
                    
                })
        
                promises.push(ret)
        
                
                
               

                const ret2 = db.doc(`users/${user}/private/info`).update({
                    replyLiked : {
                        ...docSnap.data().replyLiked,
                        [`${comicID}_${episodeID}_${commentID}_${replyID}`] : docSnap.data().replyLiked[`${comicID}_${episodeID}_${commentID}_${replyID}`] ? false : true
                    },
                    "commentLikesGiven.all" : docSnap.data().replyLiked[`${comicID}_${episodeID}_${commentID}_${replyID}`] ? increment(-1) : increment(1),
                    [`commentLikesGiven.y${new Date().getFullYear()}`] : docSnap.data().replyLiked[`${comicID}_${episodeID}_${commentID}_${replyID}`] ? increment(-1) : increment(1)
                })
            
                promises.push(ret2)


                const ret6 = db.doc('globalVar/globalStats').update({
                    "commentLikesCount.all" : docSnap.data().replyLiked[`${comicID}_${episodeID}_${commentID}_${replyID}`] ? increment(-1) : increment(1),
                    [`commentLikesCount.y${new Date().getFullYear()}`] : docSnap.data().replyLiked[`${comicID}_${episodeID}_${commentID}_${replyID}`] ? increment(-1) : increment(1)
                })

                promises.push(ret6)



                const ret3 = db.doc(`replyLike/${snap.id}`).delete()
                promises.push(ret3)

        
                
                
            } catch (err) {
                return console.log(err)
            }


        }else {
            return false
        }
        
        return true

    }).catch(err => err)

    

    return Promise.all(promises)

})