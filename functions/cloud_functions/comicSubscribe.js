const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.comicSubscribe = functions.firestore
.document('comicSubscribe/{requestID}')
.onCreate(async (snap, context) => {

   
    const { creator, comicID, userID } = snap.data()
    const promises = []

    const db = admin.firestore()
    const { increment } = admin.firestore.FieldValue


    db.doc(`users/${userID}/private/info`).get().then(docSnap => {

        if(docSnap.exists) {


            try {

                const ret = db.doc(`comics/${comicID}/public_comic/${comicID}`).update({
                        subscribe : docSnap.data().subscription[`${comicID}`] ? increment(-1) : increment(1)
                    })
                
        
                promises.push(ret)
        
        
        
        
                const newData = docSnap.data().subscription[`${comicID}`] ? {[comicID] : false} : {[comicID] : true}
                
                const ret2 = db.doc(`users/${userID}/private/info`).update({
                    subscription : {
                        ...docSnap.data().subscription,
                        ...newData
                    },
                    "subscriptionGiven.all" : docSnap.data().subscription[`${comicID}`] ? increment(-1) : increment(1),
                    [`subscriptionGiven.y${new Date().getFullYear()}`] : docSnap.data().subscription[`${comicID}`] ? increment(-1) : increment(1)
                })
        
                promises.push(ret2)


                const ret6 = db.doc(`users/${creator}/private/info`).update({
                    "subscriptionGained.all" : docSnap.data().subscription[`${comicID}`] ? increment(-1) : increment(1),
                    [`subscriptionGained.y${new Date().getFullYear()}`] : docSnap.data().subscription[`${comicID}`] ? increment(-1) : increment(1)
                })

                promises.push(ret6)


                const ret7 = db.doc('globalVar/globalStats').update({
                    "subscriptionCount.all" : docSnap.data().subscription[`${comicID}`] ? increment(-1) : increment(1),
                    [`subscriptionCount.y${new Date().getFullYear()}`] : docSnap.data().subscription[`${comicID}`] ? increment(-1) : increment(1)
                })

                promises.push(ret7)
        
        
                const ret3 = db.doc(`comicSubscribe/${snap.id}`).delete()
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