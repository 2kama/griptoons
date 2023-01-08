import React, { Fragment, useState } from 'react'

//custom components
import { Form, FormCheckBox, SubmitButton } from '../../../components/Form/'
import profileApi from '../../../api/profile'
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { company_full, company_short } from '../../../Helpers/statics'

//third party components
import { Col, Row } from 'react-bootstrap';




const BecomeACreator = ({ uid, emailVerified }) => {

    const [submissionFailed, setFailed] = useState(false);
    const [errMessage, setErrMessage] = useState("")
    const [sendRequest, requestSent] = useState(false)
    const [disableButton, setDisableButton] = useState(false)

    const [termsChecked, setTermsChecked] = useState(false)
    const [mustPick, setMustPick] = useState(false)


    const submitForm = async() => {

        if(termsChecked) {

            setDisableButton(true)
            try{

                await profileApi.submitApproval(uid);
                setFailed(false)
                requestSent(true)
                
            }catch(err) {
                setDisableButton(false)
                setFailed(true)

                if(err.code === "permission-denied") {
                    setErrMessage("Account not Verified. If you already verified your email, please log out and log back in to process verification.")
                }else {
                    setErrMessage(err.code)
                }
                

            }

        }else {

            setFailed(true)
            setErrMessage("You need to agree to the Terms and Conditions to move forward")
            setMustPick(true)

        }  

    }


    const termsText = `
        I agree to ${company_short}'s Policies of becoming a creator.
    `

    return(
        <Fragment>

            <title>Become a Creator | {company_full}</title>
            <meta name="description" content="Become a Series Creator on GripToons, no matter your level of skill" />
            <meta property="og:title" content="Become a Series Creator on GripToons." />
            <meta property="og:description" content="Become a Series Creator on GripToons, no matter your level of skill. Earn money from purchases and reads." />
            <meta property="og:image" content="https://griptoons.com/img/bigRedBanner.jpg" />
            <meta property="og:url" content="https://griptoons.com/creator" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:site_name" content="GripToons Entertainment" />
            <meta name="twitter:image:alt" content="GripToons Entertainment" />


            <Row>
                <Col md={6}>

                    <h4>Helpful Links</h4>

                    <a href="/community_policy" className="btn btn-success btn-block">Community Policy and Uploading Guidelines</a>

                    <a href="/revenue_policy" className="btn btn-info btn-block">Earnings Policies</a>

                    <a href="/comics/informative/creators-now" className="btn btn-danger btn-block">Helpful Creators Guide</a>

                </Col>

                <Col md={6} className="becomeCreator">
                    {sendRequest && (
                        <>
                        <h3>Request has been sent </h3>
                        <h6>Give it a minute to prepare your dashboard</h6>
                        </>
                    )}


                    {
                        !sendRequest && (

                            <div className="formBox gt-shadow">

                                <Form
                                    initialValues={{ }}
                                    onSubmit={submitForm}
                                >

                                    <Col md={12} className="mb-4 mt-4">
                                        We do not allow content the contains nudity or is intended to be sexually gratifying. <br /> <br />
                                        We do not allow excessive violence or graphic content intended to shock/offend readers 
                                        (This includes brutal and extended scenes of violence and gore).<br /> <br />
                                        It is prohibited for users under 13 years of age to upload content to our site.<br /><br />
                                        Refer to our <a href="/community_policy" target="_blank" >Community Policy</a> and 
                                        <a href="/terms" target="_blank"> Terms of Use</a> pages to get more info.
                                    </Col>
                                    
                                    <FormCheckBox clicker={setTermsChecked} checked={termsChecked} text={termsText} error={mustPick} />

                                    {
                                        emailVerified ? <SubmitButton title="Submit Approval" disable={disableButton} /> : <ErrorMessage error="Email Verification is required to become a creator" visible={true} fieldError={true} />
                                    }
                                    

                                    <ErrorMessage
                                        error={errMessage}
                                        visible={submissionFailed}
                                        fieldError={false}
                                    />
                                </Form>

                            </div>

                        )
                    }

                
                </Col>
            </Row>
        </Fragment>
    )

}



export default BecomeACreator
