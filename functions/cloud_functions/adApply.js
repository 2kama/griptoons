const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.adApply = functions.firestore
.document('adApply/{requestID}')
.onCreate(async (snap, context) => {

   
    const { comicID } = snap.data()
    const promises = []
    const db = admin.firestore()



    try {


        const ret2 = db.doc(`comics/${comicID}/financeData/${comicID}`).update({
            adRevenue : "pending"
        })

        promises.push(ret2)

        
        
    } catch (err) {
        return console.log(err)
    }
    



    return Promise.all(promises)

})