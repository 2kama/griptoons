import React, { Fragment } from 'react'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




const FormRadioBox = ({ checked, choice, text, clicker, error, icon }) => {


    return(
        <Fragment>

            <div className={`form-check-box forRadio ${checked === choice ? "green" : ""} ${error && checked === "" ? "red" : ""}`}>
                <div className="picker" onClick={e => clicker(choice)}>
                    {
                        checked === choice ? <FontAwesomeIcon icon={icon[0]} className="picked" /> : <FontAwesomeIcon icon={icon[1]} className={`not-picked ${error && checked === "" ? 'pls-pick' : ''}`} />
                    }
                    
                </div>
                <div className="picker-title-2">{text}</div>
            </div>

        </Fragment>
    )
}





export default FormRadioBox