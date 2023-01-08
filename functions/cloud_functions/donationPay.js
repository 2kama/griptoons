const functions = require('firebase-functions');
const admin = require('firebase-admin')
const https = require('https')


exports.donationPay = functions.firestore
.document('donationPay/{reference}')
.onCreate(async (snap, context) => {

   
    const { donorDetails, comicID, created, payer, creator } = snap.data()
    const promises = []


    const db = admin.firestore()
    const { increment, arrayUnion } = admin.firestore.FieldValue





    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/transaction/verify/${snap.id}`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer sk_live_70d6f85d45f50903a6d56efb6359d3990fd80ffb'
        }
      }

      let req = https.request(options, res => {
        
        let data = ''

        res.on('data', (chunk) => {
          data += chunk
        });

        res.on('end', () => {
            let response = JSON.parse(data)
           
            if(response.status === false) {
                if(response.message === "Transaction reference not found") {
                      const ret = db.doc(`donationPay/${snap.id}`).delete()
                      promises.push(ret)
                }
            }else {
  
                      if(response.data.status === "success") {
  
  
                        try {

                            const newDonaltionList = {
                                    donor : donorDetails.name,
                                    amount : donorDetails.amount,
                                    created,
                                    remark : donorDetails.remark
                            }
        
                            const ret = db.doc(`comics/${comicID}/financeData/${comicID}`).update({
                                totalDonation : increment(donorDetails.amount),
                                donationList : arrayUnion(newDonaltionList)
                            })
                            
                    
                
                        promises.push(ret)



                        const ret6 = db.doc(`users/${creator}/private/info`).update({
                           "donationGained.all" : increment(donorDetails.amount),
                          [`donationGained.y${new Date().getFullYear()}`] : increment(donorDetails.amount)
                        })

                        promises.push(ret6)


                        const ret7 = db.doc(`globalVar/globalStats`).update({
                          "donationCount.all" : increment(donorDetails.amount),
                          [`donationCount.y${new Date().getFullYear()}`] : increment(donorDetails.amount)
                       })

                       promises.push(ret7)


                       if(payer !== null) {

                          const ret8 = db.doc(`users/${payer}/private/info`).update({
                            "donationGiven.all" : increment(donorDetails.amount),
                            [`donationGiven.y${new Date().getFullYear()}`] : increment(donorDetails.amount)
                        })

                        promises.push(ret8)
                        
                       }
                
                
                        
                        const ret2 = db.doc(`donationPay/${snap.id}`).update({
                            processed : true
                        })
        
                        promises.push(ret2)
        
        
        
                        
                    } catch (err) {
                        return console.log(err)
                    }
  
  
                  }else {
  
                          const ret = db.doc(`donationPay/${snap.id}`).delete()
                          promises.push(ret)
                  }
  
  
            }
  
            
  
            return true
        })

      }).on('error', error => {
        console.error(error)
      })


            

      req.end()

    



    return Promise.all(promises)

})