const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.comicRead = functions.firestore
.document('comicRead/{requestID}')
.onCreate(async (snap, context) => {

   
    const { comicID, episodeID, user } = snap.data()
    const promises = []
    const db = admin.firestore()

    const { increment } = admin.firestore.FieldValue





    const startCount = () => {

        try {

            const ret = db.doc(`comics/${comicID}/public_comic/${comicID}`).update({
                reads : increment(1)
            })
              
         
            promises.push(ret)




            const ret2 = db.doc(`comics/${comicID}/episodes/${episodeID}/public_episode/${episodeID}`).update({
                reads : increment(1)
            })

          
            promises.push(ret2)





            const ret5 = db.doc(`comics/${comicID}/financeData/${comicID}`).update({

                totalReadPay : increment(1)
                
            })

            promises.push(ret5)


            const ret6 = db.doc('globalVar/globalStats').update({
                "readCount.all" : increment(1),
                [`readCount.y${new Date().getFullYear()}`] : increment(1)
            })

            promises.push(ret6)



    
            const ret4 = db.doc(`comicRead/${snap.id}`).delete()
            promises.push(ret4)

            
        } catch (err) {
            return console.log(err)
        }

        return true

    }






    if(user === null) {

        startCount()

    }else {

        db.doc(`users/${user}/private/info`).get().then(docSnap => {

            if(docSnap.exists) {
    
                if(docSnap.data().read[`${comicID}_${episodeID}`]) {
    
                    return true
    
                }else {
    
                    

                    const ret3 = db.doc(`users/${user}/private/info`).update({
                        read : {
                            ...docSnap.data().read,
                            [`${comicID}_${episodeID}`] : true
                        },
                        readCount : {
                            all : increment(1),
                            thisYear : increment(1)
                        }
                    })
            
                    promises.push(ret3)



                    startCount()
                    
                }
    
    
            }else {
                return false
            }
            
            return true
    
        }).catch(err => err)


    }





    


    

    



    return Promise.all(promises)

})