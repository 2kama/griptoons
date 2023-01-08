import React, { Fragment } from 'react'

//third party components
import { Col, Spinner } from 'react-bootstrap'




const Loading = () => {



    return (
        <Fragment>
            
            <Col md={12} className="text-center mt-4">
                <Spinner animation="grow" />
            </Col>

        </Fragment>
    )
}


export default Loading