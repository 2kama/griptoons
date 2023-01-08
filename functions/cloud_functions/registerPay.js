const functions = require('firebase-functions');
const admin = require('firebase-admin')
const https = require('https')


exports.registerPay = functions.firestore
.document('registerPay/{reference}')
.onCreate(async (snap, context) => {

   
    const { user, type} = snap.data()
    const promises = []

    const db = admin.firestore()
    const { increment } = admin.firestore.FieldValue


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
                    const ret = db.doc(`registerPay/${snap.id}`).delete()
                    promises.push(ret)
              }
          }else {

                    if(response.data.status === "success") {


                        try {


                            const ret = db.doc(`users/${user}/private/info`).update({
                                coin : type === "15-coin" ? increment(15) : type === "50-coin" ? increment(50) : increment(100)
                            })
                    
                            promises.push(ret)
                    
                    
                            
                            const ret2 = db.doc(`registerPay/${snap.id}`).update({
                                processed : true
                            })

                            promises.push(ret2)



                            
                        } catch (err) {
                            return console.log(err)
                        }


                }else {

                        const ret = db.doc(`registerPay/${snap.id}`).delete()
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

