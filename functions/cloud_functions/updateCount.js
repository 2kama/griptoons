const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.updateCount = functions.firestore
.document('updateCount/{requestID}')
.onCreate(async (snap, context) => {

   
    const { poster, creator, comicID, episodeID, commentID, replyID, add } = snap.data()
    const promises = []

    const db = admin.firestore()
    const { increment } = admin.firestore.FieldValue

                try {


                    if(replyID === null) {

                        const ret = db.doc(`comics/${comicID}/episodes/${episodeID}/public_episode/${episodeID}`).update({

                                    total_comments : add ? increment(1) : increment(-1)
                            
                        })

                        promises.push(ret)



                    }else {

                        const ret = db.doc(`comics/${comicID}/episodes/${episodeID}/comments/${commentID}`).update({


                                    total_reply : add ? increment(1) : increment(-1)
                            
                        })

                        promises.push(ret)

                    }


                    promises.push(await db.doc(`globalVar/globalStats`).update({
                        "totalComments.all" : add ? increment(1) : increment(-1),
                        [`totalComments.y${new Date().getFullYear()}`] : add ? increment(1) : increment(-1)
                    }))


                    promises.push(await db.doc(`users/${poster}/private/info`).update({
                        "totalCommentsGiven.all" : add ? increment(1) : increment(-1),
                        [`totalCommentsGiven.y${new Date().getFullYear()}`] : add ? increment(1) : increment(-1)
                    }))


                    promises.push(await db.doc(`users/${creator}/private/info`).update({
                        "totalCommentsGained.all" : add ? increment(1) : increment(-1),
                        [`totalCommentsGained.y${new Date().getFullYear()}`] : add ? increment(1) : increment(-1)
                    }))

            
            
                    const ret4 = db.doc(`updateCount/${snap.id}`).delete()
                    promises.push(ret4)
                    
                } catch (err) {
                    return console.log(err)
                }

        

            


    



    return Promise.all(promises)

})