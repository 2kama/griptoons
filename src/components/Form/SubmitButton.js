import React from "react";
import { Fragment } from "react";

//third party components
import { useFormikContext } from "formik";
import { Alert } from "react-bootstrap";


const SubmitButton = ({ title, disable }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Fragment>
      <div className="submitButtonWrap">
        {disable === false && (<button className="submitButton" type="submit" onClick={handleSubmit}>{title}</button>)}
        {disable === true && (<button className="submitButton" type="submit" disabled>{title}</button>)}
        {disable !== true && disable !== false && (<Alert variant="success text-center">{disable}</Alert>)}
       </div>
    </Fragment>
    
  
  )
}




export default SubmitButton;
