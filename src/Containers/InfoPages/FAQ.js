import React, { Fragment } from 'react'

//third party
import { Container, Row, Col } from 'react-bootstrap'

//custom
import Authenticate from '../../components/Authenticate'
import Footer from '../../components/Layouts/Footer'
import Header from '../../components/Layouts/Header'
import { company_full } from '../../Helpers/statics'





const FAQ = () => {



    return (
        <Fragment>

            <title>FAQ | {company_full}</title>
            <meta name="keywords" content="FAQ, GripToons" />
            <meta name="description" content="FAQ, GripToons" />
            <meta property="og:title" content="GripToons' FAQ" />
            <meta property="og:description" content="FAQ GripToons" />
            <meta property="og:image" content="https://griptoons.com/img/bigRedBanner.jpg" />
            <meta property="og:url" content="https://griptoons.com/faq" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:site_name" content="GripToons Entertainment" />
            <meta name="twitter:image:alt" content="GripToons Entertainment" />

            <Authenticate inside={true} strict={false} />
            <Header />


            <Container>

                <Row>

                    <Col md={1}></Col>

                    <Col md={10} className="infoPage pt-5 mt-5">

                        <h2>Frequently Asked Questions</h2>

                        <dt></dt>
                        <dd></dd>

                    </Col>

                </Row>

            </Container>

            <Footer />

        </Fragment>
    )
}



export default FAQ