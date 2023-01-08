import React from "react";

//third party components
import { useFormikContext } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//custom components
import ErrorMessage from "../Error/ErrorMessage"

const TextareaField = ({ name, placeholder, rows, maxlength, icon }) =>{
  const {
    handleBlur,
    handleChange,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <div className={`formInput ${errors[name] && touched[name] ? 'error' : ''}`}>
      <FontAwesomeIcon icon={icon} />
      <textarea
        onBlur={handleBlur}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxlength}
        value={values[name]}
      ></textarea>
      <ErrorMessage error={errors[name]} visible={touched[name]} fieldError={true} />

    
    </div>
  );
}


export default TextareaField;
