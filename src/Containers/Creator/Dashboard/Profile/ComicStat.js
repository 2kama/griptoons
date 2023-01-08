import React, { Fragment, useEffect, useState } from 'react'

//custom components
import comicApi from '../../../../api/comic'
import { TIME_ZONE } from '../../../../Helpers/statics'
import { thousands_separators } from '../../../../Helpers/functions'

//third party components
import moment from 'moment'
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Slider from 'react-slick'

//pages
import Charts from './Charts'




const ComicStat = ({ title, user, averages }) => {


    const[financeData, setFinanceData] = useState()




    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true
    }


    const settings2 = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true
    }



    const getFinanceData = async () => {

        try {

            const gett = await comicApi.getFinance(title.id)
            setFinanceData(gett.data())
            
        } catch (err) {
            //alert(err)
        }
    }



    useEffect(() => {

        getFinanceData()
   
   
    }, [title.id])



    return(
        <Fragment>

            <Row>

                <Col md={8}>

                    <div className="formBox mt-4 gt-shadow">

                        

                            {financeData && (
                                
                                <Slider {...settings}>

                                    <div>
                                        <h6 className="text-center">Earnings Statistics ({title.name})</h6>

                                        <Charts name="Earnings"
                                            userData={financeData.monthlyStats.map(data => data.total_earnings)}
                                            averageData={financeData.monthlyStats.length === 0 ? [] : (averages.map(data => data.earnings)).slice(-(financeData.monthlyStats.length))}
                                            categories={financeData.monthlyStats.length === 0 ? [] : (averages.map(data => `${data.month}/${data.year}`)).slice(-(financeData.monthlyStats.length))}
                                        />
                                    </div>

                                    <div>

                                        <h6 className="text-center">Reads Statistics ({title.name})</h6>

                                        <Charts name="Reads"
                                            userData={financeData.monthlyStats.map(data => data.total_reads)}
                                            averageData={financeData.monthlyStats.length === 0 ? [] : (averages.map(data => data.reads)).slice(-(financeData.monthlyStats.length))}
                                            categories={financeData.monthlyStats.length === 0 ? [] : (averages.map(data => `${data.month}/${data.year}`)).slice(-(financeData.monthlyStats.length))}
                                        />

                                    </div>

                                </Slider>

                            )}


                        

                    </div>

                </Col>

                <Col md={4}>




                    <h5 className="section-header"><FontAwesomeIcon icon="clipboard-list" /> Current Month Details</h5>

                        <div className="formBox gt-shadow mb-5">


                            <div className="wallet text-center mb-5">
                                <FontAwesomeIcon icon="wallet" /> 
                                <sup> &#8358;</sup>{thousands_separators((user.wallet).toFixed(2))}
                            </div>


                            {
                                financeData && (

                                    <Row className="mt-4">
                                        <Col xs={4} className="wallet-comp text-center">
                                            <FontAwesomeIcon icon="book-reader" />
                                            <div>{thousands_separators(financeData.totalReadPay)}</div>
                                        </Col>

                                        <Col xs={4} className="wallet-comp text-center">
                                            <FontAwesomeIcon icon="donate" />
                                            <div>{thousands_separators(financeData.totalCoinPay)}</div>
                                        </Col>

                                        <Col xs={4} className="wallet-comp text-center">
                                                <FontAwesomeIcon icon="hand-holding-usd" />
                                                <div>&#8358;{thousands_separators(financeData.totalDonation.toFixed(2))}</div>
                                        </Col>
                                    </Row>

                                )
                            }

                            
                            
                            

                        </div>



                        <h5 className="section-header"><FontAwesomeIcon icon="hand-holding-usd" /> Donations</h5>
                        

                        {
                            financeData && (
                                <>
                                <div className="formBox gt-shadow">
                                    <span className="float-left"><strong>Total So Far</strong></span>
                                    <span className="float-right">&#8358;{financeData.donationList.length === 0 ? (0).toFixed(2) : thousands_separators(((financeData.donationList.reduce((a, b) => ({amount: a.amount + b.amount}))).amount).toFixed(2))}</span>
                                    </div>

                                    <div className="formBox gt-shadow mt-2">
                                        
                                        <Slider {...settings2}>
                                            <Row>

                                            {
                                                financeData.donationList.length === 0 ? (
                                                <div className="text-center">
                                                    No donations yet!
                                                </div>
                                                ) : (
                                                financeData.donationList.slice(0).reverse().map((donation, idx) => (

                                                    <div key={`donate${idx}`}>
                                                    <Col xs={12}>
                                                        <h6>
                                                            <span className="float-left">{donation.donor === "" ? <i>Anonymous</i> : donation.donor}</span>
                                                            <span className="float-right">&#8358;{thousands_separators(donation.amount.toFixed(2))}</span>
                                                        </h6>
                                                    </Col>
                                                    <Col xs={12} className="float-left mt-2">
                                                        {donation.remark}

                                                        <p>
                                                        <sup className="mt-2">{moment(donation.created - TIME_ZONE).format("ll")}</sup>
                                                        </p>
                                                    </Col>
                                                    
                                                    
                                                    </div>
                                                    
                                                ))
                                                )
                                            }
                                            </Row>
                                        
                                        </Slider>

                                    </div>

                                </>
                            )
                        }
                        




                </Col>

            </Row>

        </Fragment>
    )
}






export default ComicStat