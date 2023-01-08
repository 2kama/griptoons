import React, { Fragment, useState } from 'react'

//third party components
import * as Yup from 'yup'

//custom components
import authApi from '../../api/auth'
import ErrorMessage from '../Error/ErrorMessage';
import { Form, FormField, SubmitButton } from '../Form/'


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
  });


const Login = ({ setFormType }) => {


    const [loginFailed, setLoginFailed] = useState(false);
    const [errMessage, setErrMessage] = useState("")
    const [disableButton, setDisableButton] = useState(false)


    const submitForm = async ({email, password}) => {

        setDisableButton(true)

        try {
            await authApi.login(email, password);
            window.location.reload()
        } catch (err) {
           setLoginFailed(true);
           setErrMessage(err.code)
           setDisableButton(false)
        }
        
    }




    return(
        <Fragment>


                       <h5>Login to use more features</h5>

                        <Form
                            initialValues={{ email: "", password: "" }}
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

                            <SubmitButton title="Login" disable={disableButton} />

                            <ErrorMessage
                            error={errMessage}
                            visible={loginFailed}
                            fieldError={false}
                            />
                        </Form>

                 
            
                        <div className="formLink">
                            <span onClick={e => setFormType("showRegister")}>Don't have an account? Register</span>
                            <span onClick={e => setFormType("showForgotPassword")}>Forgot Password?</span>
                        </div>
            

           
        </Fragment>
    )

}


export default Login
