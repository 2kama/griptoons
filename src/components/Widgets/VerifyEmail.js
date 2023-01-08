import React, { Fragment } from 'react'

//third party components

//custom components
import authApi from '../../api/auth'


const VerifyEmail = ({ userEmail }) => {

    const sendMail = async () => {

        try {

            await authApi.verifyEmail()
            alert("Verification mail sent your mailbox. Check your spam folder just in case")
            
        } catch (err) {
            alert(err.message)
        }
    }



    return(
        <Fragment>

            <div className="verify-email sticky-top">
                Verify your email at <strong>{userEmail}</strong>. Can't find the verification mail? <button className="verifyBtn" onClick={e => sendMail()}>Resend Verification Mail</button>
            </div>

        </Fragment>
    )
}






export default VerifyEmail