const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.changeUsername = functions.firestore
.document('changeUsername/{requestID}')
.onCreate(async (snap, context) => {

   
    const { userID, username } = snap.data()
    const promises = []
    const db = admin.firestore()


            try {

                const ret = db.collectionGroup('comments').where('poster', 'array-contains', userID).get().then(docs => {
                    return docs.forEach(doc => {

                        db.doc(`comics/${doc.data().comicID}/episodes/${doc.data().episodeID}/comments/${doc.id}`).update({
                            poster : [username, userID]
                        })

                    })
                })
        
                promises.push(ret)


                const ret2 = db.collectionGroup('reply').where('poster', 'array-contains', userID).get().then(docs => {
                    return docs.forEach(doc => {

                        db.doc(`comics/${doc.data().comicID}/episodes/${doc.data().episodeID}/comments/${doc.data().commentID}/reply/${doc.id}`).update({
                            poster : [username, userID]
                        })

                    })
                })
        
                promises.push(ret2)

        
                

                const ret3 = db.doc(`changeUsername/${snap.id}`).delete()
                promises.push(ret3)

        
                
                
            } catch (err) {
                return console.log(err)
            }



    return Promise.all(promises)

})