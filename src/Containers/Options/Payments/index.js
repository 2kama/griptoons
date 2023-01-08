import React, { Fragment, useEffect, useState } from 'react'

//custom
import payApi from '../../../api/pay'

//pages
import PayTab from './PayTab'

//third party
import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Payments = ({ user }) => {


    const [payTabs, setPayTabs] = useState()


    const getCoinPay = async () => {

        try {

            const gett = await payApi.getPayTabs()
           
            setPayTabs(gett.data().coinStore)

            
        } catch (err) {
            
        }

    }


    useEffect(() => {

        getCoinPay()

    })



    return(
        <Fragment>

            <Col md={6} className="mb-5 pb-5">
                <h5 className="section-header"><FontAwesomeIcon icon="coins" /> Buy Coins</h5>

                <div className="formBox gt-shadow">
                    <Row>
                        {user.emailVerified ? 
                            payTabs && (payTabs.map(payTab => <PayTab key={payTab.type} payDetails={payTab} user={user} />))
                            :
                            <Col xs={12}>
                                Verified Email Address needed to purchase coin.
                            </Col>
                        }

                        <Col md={12} className="text-danger mt-2">7.5% VAT included in total charge</Col>
                    </Row>
                </div>
                
                

            </Col>
            



        </Fragment>
    )
}




export default Payments