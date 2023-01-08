const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.episodeLike = functions.firestore
.document('episodeLike/{requestID}')
.onCreate(async (snap, context) => {

   
    const { creator, comicID, episodeID, user} = snap.data()
    const promises = []

    const db = admin.firestore()
    const { increment } = admin.firestore.FieldValue


    db.doc(`users/${user}/private/info`).get().then(docSnap => {

        
        if(docSnap.exists) {



            try {

                const ret = db.doc(`comics/${comicID}/public_comic/${comicID}`).update({
                    
                    likes : docSnap.data().episodeLiked[`${comicID}_${episodeID}`] ? increment(-1) : increment(1)
                
                })
        
                promises.push(ret)



                const ret2 = db.doc(`comics/${comicID}/episodes/${episodeID}/public_episode/${episodeID}`).update({
                        likes : docSnap.data().episodeLiked[`${comicID}_${episodeID}`] ? increment(-1) : increment(1)
                    
                })
        
                promises.push(ret2)

        
        
                
                const ret3 = db.doc(`users/${user}/private/info`).update({
                    episodeLiked : {
                        ...docSnap.data().episodeLiked,
                        [`${comicID}_${episodeID}`] : docSnap.data().episodeLiked[`${comicID}_${episodeID}`] ? false : true
                    },
                    "episodeLikesGiven.all" : docSnap.data().episodeLiked[`${comicID}_${episodeID}`] ? increment(-1) : increment(1),
                    [`episodeLikesGiven.y${new Date().getFullYear()}`] : docSnap.data().episodeLiked[`${comicID}_${episodeID}`] ? increment(-1) : increment(1)
                })

                promises.push(ret3)


                const ret6 = db.doc(`users/${creator}/private/info`).update({
                    "episodeLikesGained.all" : docSnap.data().episodeLiked[`${comicID}_${episodeID}`] ? increment(-1) : increment(1),
                    [`episodeLikesGained.y${new Date().getFullYear()}`] : docSnap.data().episodeLiked[`${comicID}_${episodeID}`] ? increment(-1) : increment(1)
                })

                promises.push(ret6)

                const ret7 = db.doc('globalVar/globalStats').update({
                    "episodeLikesCount.all" : docSnap.data().episodeLiked[`${comicID}_${episodeID}`] ? increment(-1) : increment(1),
                    [`episodeLikesCount.y${new Date().getFullYear()}`] : docSnap.data().episodeLiked[`${comicID}_${episodeID}`] ? increment(-1) : increment(1)
                })

                promises.push(ret7)

        
                
        
        
        
                const ret4 = db.doc(`episodeLike/${snap.id}`).delete()
                promises.push(ret4)
                
                
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