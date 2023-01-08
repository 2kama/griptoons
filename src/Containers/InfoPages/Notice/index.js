import React, { Fragment } from 'react'

//third party
import { Container, Row, Col, Table } from 'react-bootstrap'

//custom
import Authenticate from '../../../components/Authenticate'
import Footer from '../../../components/Layouts/Footer'
import Header from '../../../components/Layouts/Header'
import { company_full } from '../../../Helpers/statics'





const Notice = () => {



    return (
        <Fragment>

            <title>Notice | {company_full}</title>
            <meta name="keywords" content="Read Comics in Nigeria, Original Comics, Read any Genre, GripToons, About GripToons" />
            <meta name="description" content="Read wonderful comic series from your favorite creators" />
            <meta property="og:title" content="Notice | GripToons" />
            <meta property="og:description" content="Read wonderful comic series from your favorite creators" />
            <meta property="og:image" content="https://griptoons.com/img/bigRedBanner.jpg" />
            <meta property="og:url" content="https://griptoons.com/notice" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:site_name" content="GripToons Entertainment" />
            <meta name="twitter:image:alt" content="GripToons Entertainment" />

            <Authenticate inside={true} strict={false} />
            <Header />


            <Container>

                <Row>

                    <Col md={1}></Col>

                    <Col md={10} className="legal pt-5 mt-5">

                        <h2>Notices <br /></h2>

                        <p>
                            <Table responsive="md" className="gt-table">

                                <thead>
                                    <tr>
                                        <th>Topic</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    <tr>
                                        <td>
                                            <a href="/notice/notice_0001">Earn this April</a>
                                        </td>
                                        <td>Apr 05, 2021</td>
                                    </tr>

                                </tbody>

                            </Table>
                        </p>

                    </Col>

                </Row>

            </Container>

            <Footer />

        </Fragment>
    )
}



export default Notice