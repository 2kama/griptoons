import React, { Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { company_full } from '../../Helpers/statics'

import FourOhFour from '../../img/404.png'


const PageNotFound = () => {


    return(
        <Fragment>
            <title>Page Not Found | {company_full}</title>


            <Container>
                <Row className="FourOhFour">

                    <Col md={8}>
                        <h1>404</h1>
                        <p>
                            What can I say?<br />
                            I tried all I could and still couldn't find the page you requested
                        </p>

                        <p>
                            You might wanna start from <a href="/">home</a> again.
                        </p>
                    </Col>

                    <Col md={4} className="text-center">
                        <img src={FourOhFour} alt="404" />
                    </Col>

                </Row>
            </Container>
        </Fragment>
    )
}


export default PageNotFound