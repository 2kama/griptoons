import React, { Fragment, useState } from 'react'

//custom
import authApi from '../../../api/auth'
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { Form, FormField, SubmitButton, TextareaField } from '../../../components/Form';

//third party 
import * as Yup from 'yup'
import { Modal, Col } from 'react-bootstrap';



const validationSchema = Yup.object().shape({
    password: Yup.string().required().label("Please input your account password"),
    reason: Yup.string()
})



const DeleteAccount = ({ userEmail, uid }) => {


    const [disableButton, setButtonDisable] = useState(false)
    const [errMessage, setErrMessage] = useState()
    const [error, setError] = useState(false)
    const [show, toggleShow] = useState(false)


    const deleteUser = async ({ reason, password }) => {
        setButtonDisable(true)
        setError(false)

        try {

            await authApi.reauthenticateUser(userEmail, password) 

            try {

                await authApi.deleteUser(uid, userEmail, reason)
                authApi.logout()
                
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
    }




    return(
        <Fragment>

                    <Modal centered show={show} onHide={e => toggleShow(!show)} size="md">
                        <Modal.Body>
                            <div className="formBox gt-shadow text-center">

                                <p className="text-danger">
                                    If you have series (published/unpublished), deleting your account does not delete your series.<br />
                                    To delete your series, you have to do so at the creator's dashboard.
                                </p>

                                <Form
                                    initialValues={{ reason : "", password : "" }}
                                    onSubmit={deleteUser}
                                    validationSchema={validationSchema}
                                >


                                    <TextareaField 
                                        name="reason"
                                        placeholder="What's your reason ? [Optional]" 
                                        row="4"
                                        maxlength="500"
                                        icon="question"   
                                    />

                                    <FormField 
                                        type="password"
                                        name="password"
                                        placeholder="Account Password"  
                                        icon="lock"  
                                    />

                                    <SubmitButton title="Delete Account" disable={disableButton} />
                                    <ErrorMessage error={errMessage} visible={error} fieldError={true} />


                                </Form>
                                

                            </div>
                        </Modal.Body>
                    </Modal>

                <Col md={12}  className="mb-5 pb-5">
                    <button onClick={e => toggleShow(true)} className="submitButton">Delete Account</button>
                </Col>
                

        </Fragment>
    )
}



export default DeleteAccount