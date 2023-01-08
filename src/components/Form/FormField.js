import React from "react";

//third party components
import { useFormikContext } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


//custom components
import ErrorMessage from "../Error/ErrorMessage"



const AppFormField = ({ name, type, placeholder, icon }) =>{
  const {
    handleBlur,
    handleChange,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <>

     <div className={`formInput ${errors[name] && touched[name] ? 'error' : ''}`}>
      <FontAwesomeIcon icon={icon} />
      <input
          onBlur={handleBlur}
          onChange={handleChange}
          value={values[name]}
          name={name}
          type={type}    
          placeholder={placeholder}
        />
       <ErrorMessage error={errors[name]} visible={touched[name]} fieldError={true} />
     </div>
      
      

    
    </>
  );
}




export default AppFormField;
