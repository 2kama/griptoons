
import firebase from '../utils/Firebase'

const db = firebase.firestore()




const getAverageData = () => db.doc('globalVar/average').get()

const changeUsername = (userID, username) => db.doc(`users/${userID}`).update({
    username
}).then(() => {

    db.collection('comics').where('createdBy', '==', userID).get().then(queryShot => {
        queryShot.forEach(doc => {
            db.doc(`comics/${doc.id}`).update({creatorName : username})
        })
    })

    return db.doc(`changeUsername/${userID}`).set({
        userID,
        username
    })
})


const updateBankDetails = (bankDetails, userID) => db.doc(`users/${userID}`).update({
    accountDetails : bankDetails
})



const submitApproval = (user) => db.doc(`becomeCreator/${user}`).set({ user })


const operations = {

    getAverageData,
    changeUsername,
    updateBankDetails,
    submitApproval
}


export default operations
