import React, { Fragment } from 'react'

//third party
import { Container, Row, Col } from 'react-bootstrap'



const NoticeBanner = () => {



    return (
        <Fragment>

           


            <Container>

                <Row>

                    <Col md={1}></Col>

                    <Col md={10} className="noticeBanner pt-3 pb-2 text-center">

                       <p>
                            <a href="/notice"><strong>Notice : </strong></a> <a href="/notice/notice_0001">Earn this April</a> Apr 05, 2021
                       </p>

                    </Col>

                </Row>

            </Container>

 

        </Fragment>
    )
}



export default NoticeBanner