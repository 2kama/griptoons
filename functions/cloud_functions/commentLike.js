const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.commentLike = functions.firestore
.document('commentLike/{requestID}')
.onCreate(async (snap, context) => {

   
    const { comicID, episodeID, commentID, user} = snap.data()
    const promises = []

    const db = admin.firestore()
    const { increment } = admin.firestore.FieldValue


    db.doc(`users/${user}/private/info`).get().then(docSnap => {

        if(docSnap.exists) {


            try {

                const ret = db.doc(`comics/${comicID}/episodes/${episodeID}/comments/${commentID}`).update({
                            likes : docSnap.data().commentLiked[`${comicID}_${episodeID}_${commentID}`] ? increment(-1) : increment(1)
                        })
               
        
                promises.push(ret)
        
                
                
               

                const ret2 = db.doc(`users/${user}/private/info`).update({
                    commentLiked : {
                        ...docSnap.data().commentLiked,
                        [`${comicID}_${episodeID}_${commentID}`] : docSnap.data().commentLiked[`${comicID}_${episodeID}_${commentID}`] ? false : true
                    },
                    "commentLikesGiven.all" : docSnap.data().commentLiked[`${comicID}_${episodeID}_${commentID}`] ? increment(-1) : increment(1),
                    [`commentLikesGiven.y${new Date().getFullYear()}`] : docSnap.data().commentLiked[`${comicID}_${episodeID}_${commentID}`] ? increment(-1) : increment(1)
                })
            
                promises.push(ret2)


                const ret6 = db.doc('globalVar/globalStats').update({
                    "commentLikesCount.all" : docSnap.data().commentLiked[`${comicID}_${episodeID}_${commentID}`] ? increment(-1) : increment(1),
                    [`commentLikesCount.y${new Date().getFullYear()}`] : docSnap.data().commentLiked[`${comicID}_${episodeID}_${commentID}`] ? increment(-1) : increment(1)
                })

                promises.push(ret6)



                const ret3 = db.doc(`commentLike/${snap.id}`).delete()
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