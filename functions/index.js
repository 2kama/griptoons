const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const userCreated = require('./cloud_functions/userCreated')
const payForRead = require('./cloud_functions/payForRead')
const comicSubscribe = require('./cloud_functions/comicSubscribe')
const comicRate = require('./cloud_functions/comicRate')
const commentLike = require('./cloud_functions/commentLike')
const replyLike = require('./cloud_functions/replyLike')
const comicRead = require('./cloud_functions/comicRead')
const episodeLike = require('./cloud_functions/episodeLike')
const updateCount = require('./cloud_functions/updateCount')
const becomeCreator = require('./cloud_functions/becomeCreator')
const updateComic = require('./cloud_functions/updateComic')
const updateEpisode = require('./cloud_functions/updateEpisode')
const registerPay = require('./cloud_functions/registerPay')
const changeUsername = require('./cloud_functions/changeUsername')
const deleteUser = require('./cloud_functions/deleteUser')
const donationPay = require('./cloud_functions/donationPay')
const adApply = require('./cloud_functions/adApply')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.userCreated = userCreated.userCreated
exports.payForRead = payForRead.payForRead
exports.comicSubscribe = comicSubscribe.comicSubscribe
exports.comicRate = comicRate.comicRate
exports.commentLike = commentLike.commentLike
exports.replyLike = replyLike.replyLike
exports.comicRead = comicRead.comicRead
exports.episodeLike = episodeLike.episodeLike
exports.updateCount = updateCount.updateCount
exports.becomeCreator = becomeCreator.becomeCreator
exports.updateComic = updateComic.updateComic
exports.updateEpisode = updateEpisode.updateEpisode
exports.registerPay = registerPay.registerPay
exports.changeUsername = changeUsername.changeUsername
exports.deleteUser = deleteUser.deleteUser
exports.donationPay = donationPay.donationPay
exports.adApply = adApply.adApply
