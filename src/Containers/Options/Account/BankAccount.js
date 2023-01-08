import React, { Fragment, useState } from 'react'

//custom components
import profileApi from '../../../api/profile'
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { Form, FormField, SubmitButton, FormSelect } from '../../../components/Form';
import { BANKS } from '../../../Helpers/statics'
import { getIndexOfK } from '../../../Helpers/functions'

//third paty compoennts 
import * as Yup from 'yup'
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const validationSchema = Yup.object().shape({
    accountName: Yup.string().required().label("Please input the Account Name "),
    bankNumber: Yup.string().required().label("Please input the Bank Account Number")
})

const BankAccount = ({ user }) => {


    const [disableButton, setButtonDisable] = useState(false)
    const [error, setError] = useState(false)
    const [errMessage, setErrMessage] = useState()

    const [bankDetails, setBankDetails] = useState(user.accountDetails)
    const [chosenBankDetails, setChosenBankDetails] = useState(user.accountDetails)

    const updateBankDetails = async ({ bankNumber, accountName }) => {

        setButtonDisable(true)
        setError(false)

        if(chosenBankDetails.bankCode !== "") { 

              const newBankDetails = {...chosenBankDetails, bankNumber, accountName}

                try {

                    await profileApi.updateBankDetails(newBankDetails, user.uid)

                    setButtonDisable("Bank Details Updated")
                    setBankDetails(newBankDetails)
                    setTimeout(() => {
                        setButtonDisable(false)
                    }, 3000)
                    
                } catch (err) {

                    setError(true)
                    setErrMessage(err.code)
                    setButtonDisable(false)
                    
                }
                
        

        }else {

            setButtonDisable(false)
            setError(true)
            setErrMessage("You need to choose a bank")

        }
          
        
    }


    const changeBank = (idx) => {
        setChosenBankDetails({
            ...chosenBankDetails,
            bankName : BANKS[idx][0],
            bankCode : BANKS[idx][1]
        })
    }



    return(
        <Fragment>

            <Col md={6} className="mb-5 pb-5">

                    <h5 className="section-header"><FontAwesomeIcon icon="university" /> Bank Details</h5>

                    <div className="formBox gt-shadow">

                    <Form
                        initialValues={{ bankNumber : bankDetails.bankNumber, accountName : bankDetails.accountName }}
                        onSubmit={updateBankDetails}
                        validationSchema={validationSchema}
                    >


                        <FormSelect
                            type="text"
                            name="bankName"
                            options={BANKS}
                            icon="university"
                            value={getIndexOfK(BANKS, chosenBankDetails.bankCode)[0]}
                            select={changeBank}
                        />


                        <FormField 
                            type="text"
                            name="accountName"
                            placeholder="Name of Account"
                            icon="user"    
                        />

                        <FormField 
                            type="text"
                            name="bankNumber"
                            placeholder="Bank Account Number" 
                            icon="hashtag"   
                        />


                        

                        <SubmitButton title="Update" disable={disableButton} />
                        <ErrorMessage error={errMessage} visible={error} fieldError={true} />


                    </Form>

                    </div>
                    

                    

                
                    
                    </Col>
                

        </Fragment>
    )
}



export default BankAccount