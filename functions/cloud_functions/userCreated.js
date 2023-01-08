const functions = require('firebase-functions');
const admin = require('firebase-admin')


exports.userCreated = functions.auth.user().onCreate(async user => {

    let username = user.email.split("@")
    
    const newUser = {
        username : username[0],
        accountDetails : {
            accountName : "",
            bankCode : "",
            bankName : "",
            bankNumber : ""
        }
    }

    const yearStack = {
        all : 0,
        [`y${new Date().getFullYear()}`] : 0
    }

    const db = admin.firestore()
    const { increment } = admin.firestore.FieldValue

    const privateInfo = {
        uid : user.uid,
        createdAt : new Date().getTime() + (new Date().getTimezoneOffset() * 60000),
        email : user.email,
        coin : 0,
        role : "reader",
        paid : {},
        ratings : {},
        subscription : {},
        commentLiked : {},
        replyLiked : {},
        episodeLiked : {},
        read : {},
        totalCommentsGiven : yearStack,
        episodeLikesGiven : yearStack,
        subscriptionGiven : yearStack,
        commentLikesGiven : yearStack,
        donationGiven : yearStack,
        readCount : yearStack,
        coinSpent : yearStack
    }


    try {

        const promises = []

        promises.push(await db.doc(`users/${user.uid}`).set(newUser))
        promises.push(await db.doc(`users/${user.uid}/private/info`).set(privateInfo))
        promises.push(await db.doc(`globalVar/globalStats`).update({ 
            "userCount.all" : increment(1),
            [`userCount.y${new Date().getFullYear()}`] : increment(1)
        }))

        return Promise.all(promises)

    } catch (err) {
        return console.log(err)
    }

})