import React, { Fragment, useState } from 'react'

//custom
import profileApi from '../../../api/profile'
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { Form, FormField, SubmitButton } from '../../../components/Form';

//third party
import * as Yup from 'yup'
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Username is required"),
    
});




const ChangeUsername = ({ currentUsername, uid }) => {


    const [disableButton, setButtonDisable] = useState(false)
    const [error, setError] = useState(false)
    const [errMessage, setErrMessage] = useState()
    const [myUsername, setUsername] = useState(currentUsername)


    const changeUsername = async ({ name }) => {

        setButtonDisable(true)
        setError(false)
          
        try {

            await profileApi.changeUsername(uid, name)
            
            setUsername(name)
            setButtonDisable("Username Updated")

            setTimeout(() => {
                setButtonDisable(false)
            }, 3000)
            
        } catch (err) {
            setError(true)
            setErrMessage(err.code)
            setButtonDisable(false)
        }
    }



    return(
        <Fragment>

                <Col md={6} className="mb-5 pb-5">


                <h5 className="section-header"><FontAwesomeIcon icon="user" /> Change Username</h5>
            
                    <div className="formBox gt-shadow">

                    <Form
                            initialValues={{ name: myUsername }}
                            onSubmit={changeUsername}
                            validationSchema={validationSchema}
                        >

                            

                                    <FormField 
                                        type="text"
                                        name="name"
                                        placeholder="Username"
                                        icon="user"    
                                    />

                                
                                    <SubmitButton title="Save" disable={disableButton} />
                               

                            
                            <ErrorMessage error={errMessage} visible={error} fieldError={true} />


                        </Form>

                    </div>
                        



                </Col>
            

            
        </Fragment>
    )
}



export default ChangeUsername