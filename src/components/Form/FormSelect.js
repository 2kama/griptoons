import React, { useState } from "react";

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from "react-bootstrap";



const FormSelect = ({ icon, options, value, select }) =>{
  


  const [show, toggleShow] = useState(false)
  const [currentVal, setVal] = useState(value)


  const choose = (idx) => {
      setVal(idx)
      toggleShow(false)
      select(idx)
  }

  return (
    <>


                    <Modal centered show={show} onHide={e => toggleShow(!show)} size="md">
                        <Modal.Body>
                            <div className="formBox gt-shadow text-center">

                               {
                                   options.map((tag, idx) => <div onClick={e => choose(idx)} key={tag[1]} className={`${value === idx && 'selected'} optionsTag`}>{tag[0]}</div>)
                               }
                                
                                

                            </div>
                        </Modal.Body>
                    </Modal>

     <div className={`formInput`} onClick={e => toggleShow(true)}>
      <FontAwesomeIcon icon={icon} />
 
        <input
          value={options[currentVal][0]}
          type="text"   
          disabled
          
        />
       
     </div>
      
      

    
    </>
  );
}



export default FormSelect;
