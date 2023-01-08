
import firebase from '../utils/Firebase'
import { TIME_ZONE } from '../Helpers/statics'
const db = firebase.firestore()



const getPayTabs = () => db.doc('globalVar/coinStore').get()

const registerPay = (user, reference, transaction, type) => db.doc(`registerPay/${reference}`).set({
    user,
    transaction,
    reference,
    type,
    created : new Date().getTime() + TIME_ZONE,
    processed : false
})



const donationPay = (donorDetails, reference, transaction, comicID, payer, creator) => db.doc(`donationPay/${reference}`).set({
    donorDetails,
    reference,
    transaction,
    created : new Date().getTime() + TIME_ZONE,
    processed: false,
    comicID,
    payer,
    creator
})



const operations = {

    getPayTabs,
    registerPay,
    donationPay
    
}


export default operations