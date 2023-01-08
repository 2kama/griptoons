import React, { Fragment } from 'react'

//third party components
import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const ErrorTab = ({ errorCode }) => {


    const pick = () => {

        switch (errorCode) {
            case "no-internet":
                return (
                    <>
                        <FontAwesomeIcon icon="wifi" />
                        <p>
                            We are having issues connecting to our server, Refresh!
                        </p>
                    </>
                );
            case "no-comics":
                return (
                    <>
                        <FontAwesomeIcon icon="stream" />
                        <p>
                            There are no Series to display at the moment.
                        </p>
                    </>
                );
            case "permission-denied":
                return (
                    <>
                        <FontAwesomeIcon icon="exclamation" />
                        <p>
                            You don't seem to have access to this directory. You might wanna check if you entered the right url.
                        </p>
                    </>
                );
            case "no-episodes":
                return (
                    <>
                        <FontAwesomeIcon icon="list-ol" />
                        <p>There are no episodes here</p>
                    </>
                );
            case "no-pages":
                return (
                    <>
                        <FontAwesomeIcon icon="exclamation" />
                        <p>No pages have been uploaded</p>
                    </>
                );
            case "comic-not-found":
                return (
                    <>
                        <FontAwesomeIcon icon="exclamation" />
                        <p>This Series doesn't exist in our archive.</p>
                    </>
                );
            case "no-genre":
                return (
                    <>
                        <FontAwesomeIcon icon="exclamation" />
                        <p>This Genre has no Series</p>
                    </>
                );
            case "no-available-episodes":
                return (
                    <>
                        <FontAwesomeIcon icon="exclamation" />
                        <p>There are no episodes published yet</p>
                    </>
                );
            case "payment successful":
                return(
                    <>
                        <FontAwesomeIcon icon="check-circle" />
                        <p>Transaction was Successful. Your Coin wallet will be updated in about a minute</p>
                    </>
                )
            default:
                return (
                    <>
                        <FontAwesomeIcon icon="exclamation" />
                        <p>{errorCode}</p>
                    </>
                )
        }

    }


    return (
        <Fragment>
            <Row style={{width: "100%"}}>
                <Col md={12} className="mt-4 mb-4 errorTab text-center">
                    {pick()}
                </Col>
            </Row>

        </Fragment>
    )
}




export default ErrorTab