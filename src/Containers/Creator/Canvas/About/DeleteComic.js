import React, { Fragment, useState } from 'react'


import { Modal } from 'react-bootstrap'
import comicApi from '../../../../api/comic'




const DeleteComic = ({ comicID, deletable }) => {

    
    const [show, toggleShow] = useState(false)


    const deleteComic = async () => {

        try {

            await comicApi.deleteComic(comicID)

            window.location.href = "/creator"
            
        } catch (err) {
            
        }

        
        
    }


    return(
        <Fragment>

           
                        <Modal centered show={show} onHide={e => toggleShow(!show)} size="md">
                            <Modal.Body>
                                <div className="formBox gt-shadow text-center">
                                {
                                    deletable ? (
                                        <>
                                            <h5>
                                                Are you sure you want to delete this Series?
                                            </h5>

                                            <button className="submitButton" onClick={e => deleteComic()}>Yes, Delete Series</button>
                                        </>
                                    ):(
                                        <h5>Cannot delete a published Series. Unpublish first!</h5>
                                    )
                                }
                                
                                
                                </div>
                            </Modal.Body>
                        </Modal>
                        <button onClick={e => toggleShow(true)} className="submitButton">Delete Series</button>
                 

        </Fragment>
    )
}


export default DeleteComic