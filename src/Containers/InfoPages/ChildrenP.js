import React, { Fragment } from 'react'

//third party
import { Container, Row, Col } from 'react-bootstrap'

//custom
import Authenticate from '../../components/Authenticate'
import Footer from '../../components/Layouts/Footer'
import Header from '../../components/Layouts/Header'
import { company_full } from '../../Helpers/statics'





const ChildrenP = () => {



    return (
        <Fragment>

            <title>Children Privacy Policy | {company_full}</title>
            <meta name="keywords" content="Children Privacy Policy, GripToons" />
            <meta name="description" content="Please read this Agreement, Privacy Policy and other applicable rules, policies, and terms posted on GripToons' Website or GripToon's App before using GripToon's Website, GripToons' App and Digital Content." />
            <meta property="og:title" content="GripToons' Children Privacy Policy" />
            <meta property="og:description" content="Please read this Agreement, Privacy Policy and other applicable rules, policies, and terms posted on GripToons' Website or GripToon's App before using GripToon's Website, GripToons' App and Digital Content." />
            <meta property="og:image" content="https://griptoons.com/img/bigRedBanner.jpg" />
            <meta property="og:url" content="https://griptoons.com/children_policy" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:site_name" content="GripToons Entertainment" />
            <meta name="twitter:image:alt" content="GripToons Entertainment" />

            <Authenticate inside={true} strict={false} />
            <Header />


            <Container>

                <Row>

                    <Col md={1}></Col>

                    <Col md={10} className="legal pt-5 mt-5">

                        <h3>GRIPTOONS CHILDREN'S PRIVACY POLICY</h3>

                        <p>
                        GRIPTOONS ENTERTAINMENT (including its subsidiary, hereinafter together referred to as ‘’GRIPTOONS’’ “we”, “our” or “us”) recognizes the need to provide additional privacy protections when children visit our websites and apps on which this Children’s Privacy Policy is posted in order to use our services. The following guidelines supplement our general Privacy Policy. When we use the term “child” or “children” below we mean an individual under 13 years of age. When we use the term “parent” below, we mean to include legal guardians.
                        </p>


                        <ol>

                            <li>
                                <p>
                                    <strong>INFORMATION WE COLLECT</strong><br />

                                    Children under the age of 13 are not the primary audience for our services, however, upon valid consent from parents or legal guardians, children may use our services to access certain features and content. If we knowingly collect, use, or disclose personal contact information collected from a child, we will provide notice and obtain parental consent in accordance with applicable law. In general, we use the information we collect in a manner that is consistent with the services requested by the child. The following personal information is collected in connection with our services:<br />
                                    Information Children Create or Provide to Us<br />

                                    <ul>
                                        <li>
                                        To validate the age, we may ask for date of birth from children.
                                        </li>

                                        <li>
                                        When a child is under 13 years of age, we collect the child's name and parent's email address from the child to provide any necessary notice and to obtain parental consent.
                                        </li>

                                        <li>
                                        When a child creates an account and logs into the account, we may collect nickname, e-mail address and password.
                                        </li>

                                        <li>
                                        When a child logs into a third-party account or to a profile with us, we may ask for information such as a nickname and profile picture.
                                        </li>

                                        <li>
                                        To provide a response when a child contacts our Customer Care, we may collect any information the child provides, such as their requests or inquiries.
                                        </li>
                                    </ul>

                                    Information about Child's Use of Services<br />

                                    <ul>
                                        <li>
                                        Service usage information: A child's interactions with our services (such as search terms, used apps and features), dates and times of use of our services, any service usage information collected through cookies. For more information about how we use cookies for our Service, please see our <a href="/cookie_policy" target="_blank">Cookie Policy</a>;
                                        </li>

                                        <li>
                                        Information relating to the organization of contests and/or any promotional operations: date of participation, responses to the contests and nature of the prizes offered;
                                        </li>

                                        <li>
                                        Device and Login Information: Device and login information such as device model, OS version, IP address, setting of devices, nation based on IP address, URL and network type; and
                                        </li>

                                        <li>
                                        Transaction Data: We only process technical information that do not allow us to identify the user (e.g., transaction number) to validate the transactions.
                                        </li>
                                    </ul>

                                </p>
                            </li>


                            <li>
                                <p>
                                    <strong>HOW WE USE THE INFORMATION WE COLLECT</strong><br />
                                    In general, we use children’s information: to provide, maintain, and improve our services; to develop new services; to customize our services for children; to measure performance and understand how our services are used; to communicate directly with children in relation to our services; to communicate directly with children, for example about updates of subscribed series, new features, announcements and events, and free products; and to help improve the safety and reliability of our services.<br />
                                    We may also use a parent’s contact information to communicate with the parent regarding the child’s activities on our services. We will not use your child’s information to serve third party personalized ads to your child.<br />

                                </p>
                            </li>


                            <li>
                                <p>
                                    <strong>INFORMATION SHARING</strong><br />
                                    Except for the purpose of supporting the internal operations of our services, we will NOT provide or disclose to third parties, including other users of our services, the personal information of children under the age of 13 that we collect
                                </p>
                            </li>


                            <li>
                                <p>
                                    <strong>PARENT’S CHOICES AND ACCESS TO CHILDREN’S INFORMATION</strong><br />
                                    Parents may review the contact information we have collected from their child, refuse to permit us to collect further contact information from their child, and request that any contact information we have collected be deleted from our records. To review, update, or delete children’s contact information, please contact us (as further detailed below). To protect children’s safety, we ask for proof of your identification. We may deny access if we cannot verify your identity. Please note that certain information cannot be deleted because of other legal obligations.
                                </p>
                            </li>

                            <li>
                                <p>
                                    <strong>CONTACT US</strong><br />
                                    If you need further assistance, please contact us at <a href="mailto:info@griptoons.com">info@griptoons.com</a>.
                                </p>
                            </li>

                        </ol>

                    </Col>

                </Row>

            </Container>

            <Footer />

        </Fragment>
    )
}



export default ChildrenP