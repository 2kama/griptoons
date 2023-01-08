const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.comicRate = functions.firestore
.document('comicRate/{requestID}')
.onCreate(async (snap, context) => {

   
    const { comicID, userID, num } = snap.data()
    const promises = []
    const db = admin.firestore()

    const { increment } = admin.firestore.FieldValue


    db.doc(`users/${userID}/private/info`).get().then(docSnap => {

        
        if(docSnap.exists) {



            try {

                const oldData = docSnap.data().ratings[comicID] ? docSnap.data().ratings[comicID] : 0

                const ret = db.doc(`comics/${comicID}/public_comic/${comicID}`).update({
                    "rating.total_points" : increment(num - oldData),
                    "rating.total_users" : oldData === 0 ? increment(1) : increment(0)
                })
                  
              
        
                promises.push(ret)
        
        
        
        
                
                const ret3 = db.doc(`users/${userID}/private/info`).update({
                    ratings : {
                        ...docSnap.data().ratings,
                        [comicID] : num
                    }
                })
        
                promises.push(ret3)
        
        
        
                const ret4 = db.doc(`comicRate/${snap.id}`).delete()
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