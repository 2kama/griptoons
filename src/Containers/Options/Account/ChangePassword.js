import React, { Fragment, useState } from 'react'


//custom
import authApi from '../../../api/auth'
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { Form, FormField, SubmitButton } from '../../../components/Form';


//third party
import * as Yup from 'yup'
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required().label("Please input your account password"),
    newPassword: Yup.string().required().label("Please input your new password"),
    repeatNewPassword: Yup.string().required().label("Please comfirm your new password")
})

const ChangePassword = ({ userEmail }) => {


    const [disableButton, setButtonDisable] = useState(false)
    const [error, setError] = useState(false)
    const [errMessage, setErrMessage] = useState()


    const changePassword = async ({ currentPassword, newPassword, repeatNewPassword }) => {

        setButtonDisable(true)
        setError(false)

        if(newPassword === repeatNewPassword) { 

            try {

                await authApi.reauthenticateUser(userEmail, currentPassword)

                try {

                    await authApi.changePassword(newPassword)

                    setButtonDisable("Password Updated")
    
                    setTimeout(() => {
                        setButtonDisable(false)
                    }, 3000)
                    
                } catch (err) {

                    setError(true)
                    setErrMessage(err.code)
                    setButtonDisable(false)
                    
                }
                
                
                
            } catch (err) {
                setError(true)
                setErrMessage(err.code)
                setButtonDisable(false)
            }

        }else {

            setButtonDisable(false)
            setError(true)
            setErrMessage("New Password and Password Comfirmation don't match")

        }
          
        
    }



    return(
        <Fragment>

       

            <Col md={6} className="mb-5 pb-5">
                    <h5 className="section-header"><FontAwesomeIcon icon="lock" /> Change Password</h5>

                    <div className="formBox gt-shadow">


                    <Form
                        initialValues={{ currentPassword : "", newPassword : "", repeatNewPassword : "" }}
                        onSubmit={changePassword}
                        validationSchema={validationSchema}
                    >

                    
                     

                                <FormField 
                                    type="password"
                                    name="currentPassword"
                                    placeholder="Account Password"
                                    icon="lock"    
                                />

                                <FormField 
                                    type="password"
                                    name="newPassword"
                                    placeholder="New Password"    
                                    icon="lock"
                                />


                                <FormField 
                                    type="password"
                                    name="repeatNewPassword"
                                    placeholder="Comfirm New Password"   
                                    icon="lock" 
                                />


                           
                                <SubmitButton title="update" disable={disableButton} />
                           
                       
                        

                        
                        <ErrorMessage error={errMessage} visible={error} fieldError={true} />


                    </Form>



                    </div>
                    

                    

                
                    
                </Col>
               

        </Fragment>
    )
}



export default ChangePassword