import React, { Fragment } from 'react'

//third party
import { Container, Row, Col } from 'react-bootstrap'

//custom
import Authenticate from '../../components/Authenticate'
import Footer from '../../components/Layouts/Footer'
import Header from '../../components/Layouts/Header'
import { company_full } from '../../Helpers/statics'





const About = () => {



    return (
        <Fragment>

            <title>About | {company_full}</title>
            <meta name="keywords" content="Read Comics in Nigeria, Original Comics, Read any Genre, GripToons, About GripToons" />
            <meta name="description" content="Read wonderful comic series from your favorite creators" />
            <meta property="og:title" content="About GripToons" />
            <meta property="og:description" content="Read wonderful comic series from your favorite creators" />
            <meta property="og:image" content="https://griptoons.com/img/bigRedBanner.jpg" />
            <meta property="og:url" content="https://griptoons.com/about" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:site_name" content="GripToons Entertainment" />
            <meta name="twitter:image:alt" content="GripToons Entertainment" />

            <Authenticate inside={true} strict={false} />
            <Header />


            <Container>

                <Row>

                    <Col md={2}></Col>

                    <Col md={8} className="infoPage pt-5 mt-5">

                        <h2>GripToons Entertainment</h2>

                        <p className="pt-3">
                            We started GripToons because we noticed a lot of storytelling and digital art skills were going unnoticed in the Nigerian space.
                            Many feel their skills weren't good enough and some felt it didn't serve as a means of earning some income.
                        </p>

                        <p className="pt-3">
                            That's why we created this platform; now storystellers and digital artists could come together depict their stories in comic strips in 
                            any genre of their choice (comedy, romance, thriller, action, history, drama etc), irrespectively of their skill level. The only goal will be 
                            to entertain the readers with your wonderful stories and artistic signature while earning some income from it.
                        </p>

                        <p className="pt-3">
                            We want to create a platform where readers are entertained and creators are compensated for doing what they love doing best.
                        </p>

                        <h4 className="pt-5">Contact</h4>
                        <p><strong>ads@griptoons.com </strong>: For Advertisement and Partnership opportunities</p>
                        <p><strong>press@griptoons.com</strong>: For press/media inquires</p>

                    </Col>

                </Row>

            </Container>

            <Footer />

        </Fragment>
    )
}



export default About