const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.payForRead = functions.firestore
.document('payForRead/{payID}')
.onCreate(async (snap, context) => {

    const {userID, comicID, episodeID} = snap.data()

    const promises = []

    const db = admin.firestore()
    const { increment } = admin.firestore.FieldValue



    try {

        const ret = db.doc(`users/${userID}/private/info`).get().then(doc => {

            if(doc.data().coin <= 0) {

                return("insufficient coins")

            }else {

              return db.doc(`users/${userID}/private/info`).update({
                    coin : increment(-1),
                    paid : {
                        ...doc.data().paid,
                        [`${comicID}_${episodeID}`] : true
                    },
                    "coinSpent.all" : increment(1),
                    [`coinSpent.y${new Date().getFullYear()}`] : increment(1)
                })

                

            }

        })

        promises.push(ret)



        const ret2 = db.doc(`comics/${comicID}/episodes/${episodeID}/public_episode/${episodeID}`).update({
                payAccess : increment(1)

        })

        promises.push(ret2)


        promises.push(await db.doc('globalVar/globalStats').update({
            "coinSpent.all" : increment(1),
            [`coinSpent.y${new Date().getFullYear()}`] : increment(1)
        }))



        const ret3 = db.doc(`comics/${comicID}/financeData/${comicID}`).update({

            totalCoinPay : increment(1)

        })

        promises.push(ret3)




        db.doc(`payForRead/${snap.id}`).delete()
    
        
    } catch (err) {
        return console.log(err)
    }

    return Promise.all(promises)

})