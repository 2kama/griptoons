import React, { Fragment, useState } from 'react'

//third party components
import * as Yup from 'yup'

//custom components
import authApi from '../../api/auth'
import ErrorMessage from '../Error/ErrorMessage';
import { Form, FormField, SubmitButton } from '../Form/'


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email")
});


const ForgotPassword = ({ setFormType }) => {


    const [retrievalFailed, setRetrievalFailed] = useState(false);
    const [errMessage, setErrMessage] = useState("")
    const [disableButton, setDisableButton] = useState(false)


    const submitForm = async ({email}) => {

        setDisableButton(true)
        setRetrievalFailed(false)

        try {
            await authApi.sendResetPassword(email);
            setDisableButton("A password reset link has been sent to your email. Also check your spam messages just in case.")
           
        } catch (err) {
           setRetrievalFailed(true);
           setErrMessage(err.code)
           setDisableButton(false)
        }
        
    }




    return(
        <Fragment>
            
            <h5>Send a password reset mail</h5>

            <Form
                initialValues={{ email: "" }}
                onSubmit={submitForm}
                validationSchema={validationSchema}
            >
                
                <FormField
                type="email"
                name="email"
                placeholder="Account Email"
                icon="at"
                />


                <SubmitButton title="Send Mail" disable={disableButton} />

                <ErrorMessage
                error={errMessage}
                visible={retrievalFailed}
                fieldError={false}
                />
            </Form>


            <div className="formLink">
                <span onClick={e => setFormType("showLogin")}>Back to Login</span>
            </div>

           
        </Fragment>
    )

}



export default ForgotPassword
