const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.becomeCreator = functions.firestore
.document('becomeCreator/{requestID}')
.onCreate(async (snap, context) => {

   
    const { user } = snap.data()
    const promises = []
    const db = admin.firestore()
    const { increment } = admin.firestore.FieldValue

    const yearStack = {
        all : 0,
        [`y${new Date().getFullYear()}`] : 0
    }


            try {

                const ret = db.doc(`users/${user}/private/info`).update({
                    role : "creator",
                    paymentInvoice : [],
                    wallet : 0,
                    publishedComics : yearStack,
                    publishedEpisodes : yearStack,
                    totalCommentsGained : yearStack,
                    episodeLikesGained : yearStack,
                    subscriptionGained : yearStack,
                    donationGained : yearStack,
                    earningsGained : yearStack
                })
        
                promises.push(ret)


                promises.push(await db.doc(`globalVar/globalStats`).update({
                    "creatorCount.all" : increment(1),
                    [`creatorCount.y${new Date().getFullYear()}`] : increment(1)
                }))
                

                const ret3 = db.doc(`becomeCreator/${snap.id}`).delete()
                promises.push(ret3)

        
                
                
            } catch (err) {
                return console.log(err)
            }



    return Promise.all(promises)

})