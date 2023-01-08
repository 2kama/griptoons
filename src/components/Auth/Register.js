import React, { Fragment, useState } from 'react'

//third party component
import * as Yup from 'yup'
import { Col } from 'react-bootstrap';

//custom components
import { company_full } from '../../Helpers/statics'
import authApi from '../../api/auth'
import ErrorMessage from '../Error/ErrorMessage';
import { Form, FormField, SubmitButton, FormCheckBox } from '../Form/'


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
    repeatPassword: Yup.string().required().label("Password Comfirmation")
  });


const Register = ({ setFormType }) => {

    const [loginFailed, setLoginFailed] = useState(false);
    const [errMessage, setErrMessage] = useState("")
    const [buttonDisable, setButtonDisable] = useState(false)

    const [termsChecked, setTermsChecked] = useState(false)
    const [mustPick, setMustPick] = useState(false)


    const submitForm = async ({email, password, repeatPassword}) => {

        if(termsChecked) {

            setButtonDisable(true)

            if(password === repeatPassword) {

                try {
                    await authApi.register(email, password);
                    window.location.reload()


                } catch (err) {
                setLoginFailed(true);
                setErrMessage(err.code)
                setButtonDisable(false)
                }

            }else {
                setButtonDisable(false)
                setLoginFailed(true)
                setErrMessage("Passwords don't match")
            }


        }else {
            setMustPick(true)
            setLoginFailed(true)
            setErrMessage("You have to agree to the terms and policies to create and account")
        }

        

        
        
    }


    const termsText = `I agree to ${company_full}'s Terms of Use and Privacy Policies`

    return(
        <Fragment>

            <h5>Register and access more fun</h5>

            <Form
                initialValues={{ email: "", password: "", repeatPassword: "" }}
                onSubmit={submitForm}
                validationSchema={validationSchema}
            >
                
                <FormField
                type="email"
                name="email"
                placeholder="Email"
                icon="at"
                />

                <FormField
                name="password"
                placeholder="Password"
                type="password"
                icon="lock"
                />

                <FormField
                name="repeatPassword"
                placeholder="Retype Password"
                type="password"
                icon="lock"
                />


                <Col md={12} className="mb-4 mt-4">
                    {company_full} has the following <a href="/terms" target="_blank">Terms of Use</a> and <a href="/privacy_policy" target="_blank">Privacy Policies</a> .
                </Col>

                <FormCheckBox clicker={setTermsChecked} checked={termsChecked} text={termsText} error={mustPick} />

                <SubmitButton title="Register" disable={buttonDisable} />

                <ErrorMessage
                error={errMessage}
                visible={loginFailed}
                fieldError={false}
                />
            </Form>


            <div className="formLink">
                <span onClick={e => setFormType("showLogin")}>Have an account? Login</span>
            </div>

           
        </Fragment>
    )

}



export default Register
