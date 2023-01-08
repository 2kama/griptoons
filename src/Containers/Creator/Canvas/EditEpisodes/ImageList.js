import React, { Fragment, useState } from 'react'

//custom components
import ErrorTab from '../../../../components/Error/ErrorTab'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Row } from 'react-bootstrap'



const ImageList = ({  comicImages, updateImages }) => {

    const[firstSwap, setfirstSwap] = useState()
    const[deleteIcon, toggleDeleteIcon] = useState(false)



    const swapMe = (index) => {
        if(firstSwap === undefined) {
            setfirstSwap(index)
        }else {
            [comicImages[firstSwap], comicImages[index]] = [comicImages[index], comicImages[firstSwap]]
            updateImages(comicImages)
            setfirstSwap(undefined)
        }
    }



    const deleteImage = (index) => {
      
            comicImages.splice(index, 1)
            updateImages(comicImages)

    }


    return(
        <Fragment>
            

            {
                comicImages && comicImages.length > 0 ? (
                    <Row>
                        <Col md={3} sm={4} xs={6} className="trash mb-3">
                            <FontAwesomeIcon icon={deleteIcon ? "times" : "trash"} onClick={e => toggleDeleteIcon(!deleteIcon)} />
                        </Col>
                        
                        {comicImages.map((img, index) => (
                                <Col className="mb-3 pageCase" md={3} sm={4} xs={6} key={index}>
                                    {
                                        deleteIcon && <FontAwesomeIcon icon="times-circle" onClick={e => deleteImage(index)} />
                                    }
                                    
                                    <img className={`gt-shadow ${firstSwap === index || deleteIcon ? "raise" : ""}`} onClick={e => swapMe(index)} src={img.url} alt="GripToons Comic" />
                                </Col>
                            ))}
                    </Row>
                ) : (
                    <ErrorTab errorCode="no-pages" />
                )
            }
        </Fragment>
    )
}



export default ImageList