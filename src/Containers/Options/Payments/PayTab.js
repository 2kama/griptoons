import React, { Fragment, useState } from 'react'

//third party
import { Col, Row } from 'react-bootstrap'
import { PaystackButton } from 'react-paystack'

//custom
import payApi from '../../../api/pay'
import ErrorMessage from '../../../components/Error/ErrorMessage'
import ErrorTab from '../../../components/Error/ErrorTab'




const PayTab = ({ payDetails, user }) => {

    const [error, setError] = useState(false)
    const [errMessage, setErrorMessage] = useState("")
    const [success, setSuccess] = useState(false)



 const registerPay = async (reference, transaction) => {

     setSuccess(false)
     setError(false)

    try {

        await payApi.registerPay(user.uid, reference, transaction, payDetails.type)
        setSuccess(true)

        setTimeout(() => {
            setSuccess(false)
        }, 5000)
        
    } catch (err) {
        setError(true)
        setErrorMessage(err.code)
    }

 }


    const componentProps = {
        email : user.email,
        amount : payDetails.amount + (Math.ceil(payDetails.amount * 0.075)),
        metadata: {
          name : user.username
        },
        publicKey : "pk_live_ebb1a2d9268a19b04cb974e805ba54a09ed1a77d",
        text: (`$${payDetails.sign}`),
        onSuccess: data => registerPay(data.reference, data.transaction),
        onClose: null,
      }


    return(
        <Fragment>

            <Col xs={12} className="mt-2 coinBuy">
                <Row>
                    <Col xs={6} className="pt-3"><h6>{payDetails.name}</h6></Col>
                    <Col xs={6} className="text-right"><PaystackButton {...componentProps} /></Col>
                </Row>
        
            </Col>
            <ErrorMessage error={errMessage} visible={error} fieldError={true} />
            <ErrorMessage error="There was an error in posting your transaction. Please contact support to Verify this" visible={error} fieldError={true} />

            {
                success && (<ErrorTab errorCode="payment successful" />)
            }
        </Fragment>
    )
}



export default PayTab