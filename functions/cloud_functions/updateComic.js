const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.updateComic = functions.firestore
.document('updateComic/{requestID}')
.onCreate(async (snap, context) => {

   
    const { creator, comicID, genre, genreBefore, published, publishBefore, creatorName, name, newSlugName } = snap.data()
    const promises = []


    const db = admin.firestore()
    const { increment } = admin.firestore.FieldValue


            try {

                //if there is a name change
                const ret2 = db.doc(`search/indexes`).get().then(doc => {

                    return db.doc('search/indexes').update({
                        index : {
                            ...doc.data().index,
                            [comicID] : published ? {
                                genre,
                                creatorName,
                                name,
                                url : newSlugName
                            } : {
                                genre : "",
                                creatorName : "",
                                name : "",
                                url : ""
                            }
                        }
                    })

                })

                promises.push(ret2)

                
                if(genre !== genreBefore || published !== publishBefore) {

                    const ret = db.doc(`comics/${comicID}/public_comic/${comicID}`).update({
                        published,
                        genre
                    })
            
                    promises.push(ret)

                }



                if(published !== publishBefore) {

                    promises.push(db.doc(`users/${creator}/private/info`).update({
                        "publishedComics.all" : published ? increment(1) : increment(-1),
                        [`publishedComics.y${new Date().getFullYear()}`] : published ? increment(1) : increment(-1)
                    }))

                    promises.push(db.doc(`globalVar/globalStats`).update({
                        "publishedComics.all" : published ? increment(1) : increment(-1),
                        [`publishedComics.y${new Date().getFullYear()}`] : published ? increment(1) : increment(-1)
                    }))
                    
                }
        
                

                const ret3 = db.doc(`updateComic/${snap.id}`).delete()
                promises.push(ret3)

        
                
                
            } catch (err) {
                return console.log(err)
            }



    return Promise.all(promises)

})