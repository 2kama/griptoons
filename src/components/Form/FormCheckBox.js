import React, { Fragment } from 'react'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const FormCheckBox = ({ checked, text, clicker, error }) => {


    return(
        <Fragment>

            <div className="form-check-box">
                <div className="picker" onClick={e => clicker(!checked)}>
                    {
                        checked ? <FontAwesomeIcon icon="check-circle" className="picked" /> : <FontAwesomeIcon icon={['far', 'check-circle']} className={`not-picked ${error ? 'pls-pick' : ''}`} />
                    }
                    
                </div>
                <div className="picker-title">{text}</div>
            </div>

        </Fragment>
    )
}




export default FormCheckBox