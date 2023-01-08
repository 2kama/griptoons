import React, { Fragment } from 'react'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//custom components
import { errorCodes } from '../../Helpers/statics'


const ErrorMessage = ({ error, visible, fieldError }) => {

    if (!visible || !error) return null;

    return (
        <Fragment>
            {
            fieldError ? 
            <span className="fieldError"><FontAwesomeIcon icon="exclamation-circle" /> {errorCodes[error] ? errorCodes[error] : error}</span> : 
            <span className="formError"><FontAwesomeIcon icon="exclamation-circle" /> {errorCodes[error] ? errorCodes[error] : error}</span> 
            }
        </Fragment>
    )

}



export default ErrorMessage
