import React, { Fragment } from 'react'

//third party
import { Container, Row, Col } from 'react-bootstrap'

//custom
import Authenticate from '../../components/Authenticate'
import Footer from '../../components/Layouts/Footer'
import Header from '../../components/Layouts/Header'
import { company_full } from '../../Helpers/statics'





const Community = () => {



    return (
        <Fragment>

            <title>Community Policy | {company_full}</title>
            <meta name="keywords" content="Community Policy, GripToons" />
            <meta name="description" content="Please read this Agreement, Privacy Policy and other applicable rules, policies, and terms posted on GripToons' Website or GripToon's App before using GripToon's Website, GripToons' App and Digital Content." />
            <meta property="og:title" content="GripToons' Community Policy" />
            <meta property="og:description" content="Please read this Agreement, Privacy Policy and other applicable rules, policies, and terms posted on GripToons' Website or GripToon's App before using GripToon's Website, GripToons' App and Digital Content." />
            <meta property="og:image" content="https://griptoons.com/img/bigRedBanner.jpg" />
            <meta property="og:url" content="https://griptoons.com/community_policy" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:site_name" content="GripToons Entertainment" />
            <meta name="twitter:image:alt" content="GripToons Entertainment" />

            <Authenticate inside={true} strict={false} />
            <Header />


            <Container>

                <Row>

                    <Col md={1}></Col>

                    <Col md={10} className="legal pt-5 mt-5">

                        <h2>GRIPTOONS COMMUNITY POLICY AND UPLOADING GUIDELINES</h2>

                        <p>
                            <strong>
                            GRIPTOONS is not just comics. We thrive to be a community of creatives, illustrators, artists, writers and fans. We are a storytelling destination that pushes the boundaries of creativity, art and narrative. As a platform, we want to create a safe and welcoming space for all creators and readers. To ensure this, we have outlined our community policy below.
                            </strong>
                        </p>


                        <ol>

                            <li>
                                <p>
                                    <strong>Publishing on GRIPTOONS on the Creator Dashboard</strong><br />
                                    The Creator Dashboard is our self-publishing platform, where you can publish your own comics. When you post on GRIPTOONS Creator Dashboard, you will always keep ownership over your work. You will own all of your intellectual property, and you can continue to promote your work on social media or other publishing platforms, while utilizing the tools we offer.
                                </p>

                                <p>
                                You must own all the rights to your uploads, and your content must not infringe on the copyright, trademark, or publicity right of any other party.
                                </p>

                                <p>
                                To help promote your series, we may use your series/episode assets for promotional marketing purposes.
                                </p>
                            </li>


                            <li>
                                <p>
                                <strong>Content Guidelines</strong><br />

                                <ol type="A">

                                    <li>
                                        <strong>Abusive or Hateful Content</strong><br />
                                        Malicious or abusive content or comment toward creators or other users is not allowed. This includes revealing an individual’s personal information (e.g. real name, contact information, address, social security numbers etc.).<br /><br />
                                        Hateful content or comment that promotes or encourages violence, or has the primary purpose of inciting hate towards individuals or groups based on race, ethnic origin, religion, disability, gender, age, veteran status, sexual orientation, gender identity, political orientation, etc. is not allowed.
                                    </li>

                                    <li>
                                        <strong>Copyright</strong><br />
                                        Posting, distributing or transmitting any third party’s copyrighted content without the copyright holder’s consent is not allowed. Examples of prohibited content include:<br />

                                        <ul>
                                            <li>
                                            Posting, distributing or transmitting any third party’s copyrighted content without the copyright holder’s consent
                                            </li>

                                            <li>
                                            Using a creative work commercially without proper permission
                                            </li>

                                            <li>
                                            Copying or linking materials from another website or service without permission
                                            </li>

                                            <li>
                                            Providing free downloads of copyrighted CDs, sharing serial numbers or CD keys, or selling backup CDs of copyrighted material
                                            </li>

                                            <li>
                                            Infringing any third party’s intellectual property right including, without limitation, copyright, trademark, design rights, patent rights, etc.
                                            </li>
                                        </ul>
                                    </li>


                                    <li>
                                        <strong>Mature or Sexual Content</strong><br />
                                        Content that contains nudity or intended to be sexually gratifying is not allowed. This includes, but is not limited to, full and partial nudity, as well as graphic depictions of sexual acts.<br /><br />
                                        The ‘Adult Content’ feature should be used to identify mature themes and content, including topics of sexuality. However, please note that utilizing the ‘Adult Content’ feature does not mean that nudity or explicit sexual content is allowed on the platform.
                                    </li>

                                    <li>
                                        <strong>Violent or Graphic Content</strong><br />
                                        We do not allow graphic depictions of gratuitous violence, or content that promote acts of violence. Examples of prohibited content include:<br />
                                        
                                        <ul>
                                            <li>Brutal, extended, graphic acts of violence</li>
                                            <li>Depiction of sadism, or glorification/promotion of inflicting harm on others</li>
                                            <li>Glorification or promotion of self-harm</li>
                                        </ul>
                                    </li>

                                    <li>
                                        <strong>Spam and Advertising</strong><br />
                                        Posting unsolicited or unwanted content or links is not allowed. This includes creating profiles or uploading content with the primary purpose to drive traffic to external websites. Using automated means to increase view counts or perform social interactions, or creating multiple accounts to increase view counts or perform social interactions will result in account suspension or removal.
                                    </li>

                                </ol>

                                </p>
                                
                            </li>


                            <li>
                                <p>
                                <strong>Reporting Inappropriate Content</strong><br />

                                <ol type="A">

                                    <li>
                                        <strong>Reporting Comments</strong><br />
                                        To report inappropriate comments, click on the “Report” link below every comment. Reported comments will be reviewed by our moderation team, and comments in violation with our policies will be removed. Users with multiple violations may be suspended or permanently blocked from commenting.

                                    </li>
                                    

                                    <li>
                                        <strong>Reporting Series and Episodes</strong><br />
                                        To report episodes that violate our content guidelines, click on the “Report” button available at the end of each episode.<br /><br />
                                        Episodes with multiple reports may be automatically removed until further review. If the same episode or series is reported repetitively, and if we determine that the report is justified, the episode or series may be removed, and the user will receive a warning for inappropriate content.<br /><br />
                                        In cases where the content is found to be excessively inappropriate or a user has multiple violations, we may suspend or terminate the user’s account and access to the platform.<br /><br />
                                        If your content has been removed due to policy violations, you may contact our Creator Support team at <a href="mailto:creatorcare@griptoons.com">creatorcare@griptoons.com</a>.
                                    </li>
                                </ol>
                               </p>
                            </li>


                            <li>
                                <p>
                                <strong>Copyright Infringement</strong><br />

                                <ol type="A">
                                    <li>
                                        <strong>Process for Reporting Copyright Infringement</strong><br />
                                        If you believe a user's content violates your copyright or if you are the legal representative to represent the copyright holder, you may send a takedown notice to creatorcare@griptoons.com with the following information. These requests should only be submitted by the copyright owner or any agent authorized to act on the owner’s behalf.<br />

                                        <ul>
                                            <li>
                                            A signature of the copyright holder or the copyright holder’s legal representative;
                                            </li>

                                            <li>
                                            Materials which prove that the person is the copyright holder;
                                            </li>

                                            <li>
                                            The specific URL of the infringing content on GRIPTOONS;
                                            </li>

                                            <li>
                                            Information of the copyright holder or legal representative sufficient to permit the service provider to contact you such as address, phone number, or e-mail address;
                                            </li>

                                            <li>
                                            A statement that you have good belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law”; and
                                            </li>

                                            <li>
                                            A statement that the information in this notification is accurate, and under penalty of perjury, you are the owner, or an agent authorized to act on behalf of the owner, of an exclusive right that is allegedly infringed.
                                            </li>
                                        </ul>

                                        When we receive a takedown notice, we will immediately take down the content at issue and notify the user. If we do not receive a response from the user within 14 days, the content will remain blocked.

                                    </li>


                                    <li>
                                        <strong>Counter-notice</strong><br />

                                        If you believe that your content that was removed is not infringing, or if you have authorization from the copyright holder, the copyright owner’s agent, or pursuant to law, you may send a counter-notice to our creatorcare@griptoons.com with the following information.<br />

                                        <ul>
                                            <li>
                                            Your physical or electronic signature;
                                            </li>

                                            <li>
                                            Identification of the removed content and the specific URL of the content on GRIPTOONS;
                                            </li>

                                            <li>
                                            A statement that you have a good faith belief that the content was removed or disabled as a result of mistake or misidentification of the content;
                                            </li>

                                            <li>
                                            Your name, address, phone number, and e-mail address;
                                            </li>

                                            <li>
                                            A statement that you consent to the jurisdiction of Federal District Court for the judicial district in which your address is located, and that you will accept service of process from the person who provided the original DMCA notification or an agent of such person.
                                            </li>

                                            
                                        </ul>

                                        When a valid counter-notice is received, we may forward the notice to the notifying party who submitted the original copyright infringement notification. The original notifying party will then have 10 days to file legal action relating to the allegedly infringing material. Unless notice of legal action is received, the removed content may be replaced in 10 business days or more at GRIPTOONS’s sole discretion.

                                    </li>
                                </ol>

                                </p>
                            </li>


                            <li>
                                <p>
                                <strong>Questions and Feedback</strong><br />
                                If you have any questions or feedback about our community and content guidelines, or if have safety concerns about the platform, feel free to contact us at <a href="mailto:creatorcare@griptoons.com">creatorcare@griptoons.com</a>.
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



export default Community