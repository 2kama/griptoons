import React, { Fragment, useState, useEffect} from 'react'

//third party component
import { Col, Row, Modal } from 'react-bootstrap'

//custom component
import comicApi from '../../../../api/comic'
import { TIME_ZONE } from '../../../../Helpers/statics'





const AdRevenue = ({ comicID }) => {

    const [financeData, addFinanceData] = useState()
    const [show, toggleShow] = useState(false)


    const sendRequest = async (comicID, apply) => {

        try {

            await comicApi.adRequest(comicID, apply)
            const newData = {
                ...financeData,
                adRevenue : "pending"
            }

            addFinanceData({...newData})
            
        } catch (err) {
            
        }

    }

    

    const getData = async (comicID) => {

        try {

            const gett = await comicApi.getFinance(comicID)
            addFinanceData(gett.data())
            
        } catch (err) {
            
        }

    }



    useEffect(() => {

        getData(comicID)
        
    }, [comicID])

  

    return (
        <Fragment>


               {
                   financeData && (typeof financeData.adRevenue === 'string' || (financeData.adRevenue + 5184000000 - TIME_ZONE) > new Date().getTime()) && (

                    <div className="formBox gt-shadow mt-2 mb-2">
                        <Row>

                            <Col md={12}>
                                {
                                    financeData.adRevenue === "enrolled" && (
                                        <>

                    <Modal centered show={show} onHide={e => toggleShow(!show)} size="md">
                        <Modal.Body>
                            <div className="formBox gt-shadow text-center">

                                <p>Are you sure you want to revoke the membership of this Series?</p>

                                <Row>
                                    <Col xs={6}>
                                        <button onClick={e => toggleShow(false)} className="submitButton negative">No</button>
                                    </Col>

                                    <Col xs={6}>
                                        <button onClick={e => sendRequest(comicID, false)} className="submitButton">Yes</button>
                                    </Col>
                                </Row>

                            </div>
                        </Modal.Body>
                    </Modal>


                                            <div className="text-success">Approved Ad Revenue Member</div>
                                            <button onClick={e => toggleShow(true)} className="btn btn-danger">Revoke your Ad Revenue Sharing Membership</button>
                                        </>
                                        
                                    )
                                }


                                {
                                    financeData.adRevenue === "pending" && (
                                        <>
                                            <div className="text-info">Approval could take about 48 hours</div>
                                            <button className="btn btn-info">Approval Pending...</button>
                                        </>
                                        
                                    )
                                }

                                {
                                    financeData.adRevenue !== "pending" && financeData.adRevenue !== "enrolled" && (
                                        <>
                                            <button onClick={e => sendRequest(comicID, true)} className="btn btn-success">Enroll series in Ad Revenue Sharing Scheme</button>
                                        </>
                                        
                                    )
                                }
                               
                            </Col>

                        </Row>
                    </div>

                   )
               }

                
     

        </Fragment>
    )
}



export default AdRevenue