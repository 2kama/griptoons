import React, { Fragment, useState } from 'react'

//third party components
import { PaystackButton } from 'react-paystack'
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//custom components
import { thousands_separators } from '../../Helpers/functions'
import payApi from '../../api/pay'



const Donations = ({ user, comicID, creator }) => {


    const [paymentDetails, setPayDetails] = useState({name:"", remark:"", amount: 100, email: ""})
    const [show, toggleShow] = useState(false)

    const changeValues = (e) => {

        setPayDetails({
            ...paymentDetails,
            [e.target.name] : e.target.value
        })

    }


    const donationPay = async (reference, transaction) => {

        const donorDetails = {
            ...paymentDetails,
            amount : Number(paymentDetails.amount),
            email : user.isAuthenticated ? user.email : paymentDetails.email
        }

        const payer = user.isAuthenticated ? user.uid : null

        try {

            await payApi.donationPay(donorDetails, reference, transaction, comicID, payer, creator)
            setPayDetails({
                ...paymentDetails,
                remark : "",
                amount : 100
            })
            toggleShow(false)
            
        } catch (err) {
            
        }

    }



    const componentProps = {
        email : user.isAuthenticated ? user.email : paymentDetails.email,
        amount : paymentDetails.amount * 100,
        metadata: {
          name : paymentDetails.name
        },
        publicKey : "pk_live_ebb1a2d9268a19b04cb974e805ba54a09ed1a77d",
        text: (`Donate N${thousands_separators(paymentDetails.amount)}`),
        onSuccess: data => donationPay(data.reference, data.transaction),
        onClose: null,
    }



    return(
        <Fragment>


                    <Modal centered show={show} onHide={e => toggleShow(!show)} size="md">
                        <Modal.Body>
                            <div className="formBox gt-shadow text-center">

                                
                                <h6 className="mb-5">Donations show your favorite creators that you love their work and want to support their work</h6>
                                    
                                <div className="formInput">
                                <FontAwesomeIcon icon="user" />
                                <input
                                    type="text" 
                                    name="name" 
                                    value={paymentDetails.name} 
                                    onChange={e => changeValues(e)} 
                                    placeholder="Name : Leave empty to be anonymous"
                                />
                                
                                </div>


                                <div className="formInput">
                                <FontAwesomeIcon icon="info-circle" />
                                <textarea
                                    rows="4" 
                                    value={paymentDetails.remark} 
                                    name="remark" 
                                    onChange={e => changeValues(e)} 
                                    placeholder="Do you have any remark for the creator?"
                                ></textarea>
                                </div>

                                {
                                    !user.isAuthenticated && 
                                    <div className="formInput">
                                    <FontAwesomeIcon icon="at" />
                                    <input
                                        type="email" 
                                        name="email" 
                                        value={paymentDetails.email} 
                                        onChange={e => changeValues(e)} 
                                        placeholder="Please provide us with an email for a receipt and to reach you in case of further clarifications"
                                    />
                                    
                                    </div>
    
                                }


                                <div className="formInput">
                                    <FontAwesomeIcon icon="hashtag" />
                                    <input
                                        type="number" 
                                        min="100" 
                                        max="1000000" 
                                        name="amount" 
                                        value={paymentDetails.amount} 
                                        placeholder="0.00" 
                                        onChange={e => changeValues(e)}
                                    />
                                    
                                </div>

                                <div className="mt-3 mb-4">
                                {
                                    paymentDetails.amount >= 100 && paymentDetails.amount <= 1000000 && <PaystackButton className="submitButton" {...componentProps} />
                                }
                                </div>

                                <sup className="text-center text-danger">All donations <b>(except for transfer fees)</b> are paid in full to the creators, no percentage goes to GripToons.
                                Transfer fees are cost at 1.5% of monetary value and capped at &#8358;2,000. These fees are not GripToons' fees but fees charged by our payment gateway in use.</sup>
                                

                            </div>
                        </Modal.Body>
                    </Modal>

                

                    <button onClick={e => toggleShow(true)} className="eventButton btn-outline-danger"> + Donate</button>
                
                
        </Fragment>
    )
}




export default Donations

