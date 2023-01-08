import React, { Fragment } from 'react'

//third party
import { Container, Row, Col, Button } from 'react-bootstrap'

//custom
import Authenticate from '../../../../components/Authenticate'
import Footer from '../../../../components/Layouts/Footer'
import Header from '../../../../components/Layouts/Header'
import { company_full } from '../../../../Helpers/statics'





const Notice_0001 = () => {



    return (
        <Fragment>

            <title>Notice | Earn this April | {company_full}</title>
            <meta name="keywords" content="Read Comics in Nigeria, Original Comics, Read any Genre, GripToons, About GripToons" />
            <meta name="description" content="Read wonderful comic series from your favorite creators" />
            <meta property="og:title" content="Earn this April" />
            <meta property="og:description" content="Read wonderful comic series from your favorite creators" />
            <meta property="og:image" content="https://griptoons.com/img/bigRedBanner.jpg" />
            <meta property="og:url" content="https://griptoons.com/notice/notice_0001" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:site_name" content="GripToons Entertainment" />
            <meta name="twitter:image:alt" content="GripToons Entertainment" />

            <Authenticate inside={true} strict={false} />
            <Header />


            <Container>

                <Row>

                    <Col md={1}></Col>

                    <Col md={10} className="legal pt-5 mt-5">

                        <h3>Earn this April</h3>

                        <p>
                            Apr 05, 2021<br /><br />
                            To Welcome you to Griptoons and to reward you for being one of the first creators to use our platform, we are tweaking our payment policy in the month of April.<br /><br />

                            Per our payment policy, you get paid for every read you have in the month provided you have a cumulative of 3,000 reads in the month.<br /><br />

                            But for the month of April, you get paid for every read regardless of whether or not you get up to 3,000 reads in the month!  This is our way of saying Thank you and Welcome.<br /><br />

                            P.S. Don't enjoy this alone. Invite your friends too!
                        </p>


                    </Col>

                    <Col md={12} className="text-right">
                        <Button href="/notice" variant="danger">List</Button>
                    </Col>

                </Row>

            </Container>

            <Footer />

        </Fragment>
    )
}



export default Notice_0001