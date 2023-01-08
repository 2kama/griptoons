import React, { Fragment, useState } from 'react'

//third party components
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Container, Row } from 'react-bootstrap'

//media
import fullLogo from '../../img/fullLogo.svg'
import { createCookie, readCookie } from '../../Helpers/cookieFunc'


const Footer = () => {

    const[checkCookie, setCheckCookie] = useState(readCookie("cookieAgree"))

    const cookieAgree = () => {
        createCookie("cookieAgree", "yes", 365)
        setCheckCookie("yes")
    }


    return(
        <Fragment>

            {
                checkCookie === null && (
                    <div className="cookieDiv gt-shadow text-center p-3 pt-4 mt-5">
                        We use cookies to give you a better experience on our site. By using our website, you agree to our <a href="/cookie_policy" target="_blank">Cookie Policy</a> and <a href="/terms">Terms</a>.  
                        <button className="ml-5 p-2 mt-2" onClick={e => cookieAgree()}>I understand</button>
                    </div>
                )
            }
            
           
           <Container className="mt-5 pt-5">
               <Row>

                    <Col md={12} className="footerLogo text-center mb-4 mt-5">
                        <img src={fullLogo} alt="gripToons Logo" />
                    </Col>

                    {/* <Col md={12} className="footerSocials text-center mb-4">
                        <a href="/" target="_blank">
                            <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                        </a>
                        <a href="/" target="_blank">
                            <FontAwesomeIcon icon={["fab", "twitter"]} />
                        </a>
                        <a href="/" target="_blank">
                            <FontAwesomeIcon icon={["fab", "instagram"]} />
                        </a>
                        <a href="/" target="_blank">
                            <FontAwesomeIcon icon={["fab", "youtube"]} />
                        </a>
                    </Col> */}

                    <Col md={12} className="footerLinks text-center mb-4">
                        <a href="/about" target="_blank">About</a><span> | </span>
                        <a href="/terms" target="_blank">Terms of Use</a><span> | </span>
                        <a href="/privacy_policy" target="_blank">Pivacy Policies</a><span> | </span>
                        <a href="/faq" target="_blank">FAQ</a><span> | </span>
                        <span className="pl-4">&copy; GripToons Entertainment.</span>
                    </Col>

               </Row>
           </Container>
            
        </Fragment>
    )
}


export default Footer