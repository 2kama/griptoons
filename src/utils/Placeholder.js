import React, { Fragment } from 'react'


import { Col, Container, Row } from 'react-bootstrap'
import { company_full } from './constants'

import placeholder from '../img/placeholder.svg'


const Placeholder = () => {



    


    return (
        <Fragment>

                    <title>Home | {company_full}</title>
                    <meta name="description" content="Read wonderful comic series from your favorite creators" />
                    <meta name="keywords" content="GripToons, Nigerian comics, free comics, read, comics, Nigerian web series" />
                    <meta property="og:title" content="Read wonderful comic series from your favorite creators" />
                    <meta property="og:description" content="Different Genres and Creators to pick from." />
                    <meta property="og:image" content="https://griptoons.com/img/bigRedBanner.jpg" />
                    <meta property="og:url" content="https://griptoons.com" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta property="og:site_name" content="GripToons Entertainment" />
                    <meta name="twitter:image:alt" content="GripToons Entertainment" />



            

              <Container fluid className="placeholder text-center">

                    <Row>
                        <Col md={12}>
                            <img src={placeholder} alt="placeholder box"/>
                        </Col>
                        <Col md={12} className="mt-5">
                            <h2>Tuesday, March 2, 2021 [15:00 GMT+1]</h2>
                        </Col>

                        
                    </Row>
                    

              </Container>


        </Fragment>
    )
}


export default Placeholder