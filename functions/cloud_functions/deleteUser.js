const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.deleteUser = functions.firestore
.document('deleteUser/{requestID}')
.onCreate(async (snap, context) => {

   
    const { userID } = snap.data()
    const promises = []

    const db = admin.firestore()


            try {


                const ret3 = db.doc(`users/${userID}/private/info`).delete()

                promises.push(ret3)


                const ret2 = db.doc(`users/${userID}`).delete()

                promises.push(ret2)


                const ret = admin.auth().deleteUser(userID)
                promises.push(ret)
                
                
                
            } catch (err) {
                return console.log(err)
            }



    return Promise.all(promises)

})