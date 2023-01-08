const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.updateEpisode = functions.firestore
.document('updateEpisode/{requestID}')
.onCreate(async (snap, context) => {

   
    const { creator, publish } = snap.data()
    const promises = []


    const db = admin.firestore()
    const { increment } = admin.firestore.FieldValue


            try {

               

                    promises.push(db.doc(`users/${creator}/private/info`).update({
                        "publishedEpisodes.all" : publish ? increment(1) : increment(-1),
                        [`publishedEpisodes.y${new Date().getFullYear()}`] : publish ? increment(1) : increment(-1)
                    }))

                    promises.push(db.doc(`globalVar/globalStats`).update({
                        "publishedEpisodes.all" : publish ? increment(1) : increment(-1),
                        [`publishedEpisodes.y${new Date().getFullYear()}`] : publish ? increment(1) : increment(-1)
                    }))
      
        
                

                const ret3 = db.doc(`updateEpisode/${snap.id}`).delete()
                promises.push(ret3)

        
                
                
            } catch (err) {
                return console.log(err)
            }



    return Promise.all(promises)

})