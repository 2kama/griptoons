import React, { Fragment, useState } from 'react'

//custom component
import comicApi from '../../../../api/comic'
import ErrorMessage from '../../../../components/Error/ErrorMessage';

//third party components
import { v4 as uuidv4 } from 'uuid';
import { Col, Row } from 'react-bootstrap';

//custom component
import ErrorTab from '../../../../components/Error/ErrorTab'
import Loading from '../../../../components/Widgets/Loading'

//pages
import SeriesBlock from './SeriesBlock'





const Series = ({ uid, name, titles }) => {

    const [submissionFailed, setFailed] = useState(false);
    const [errMessage, setErrMessage] = useState("")
    const [disableButton, setDisableButton] = useState(false)


    const createComic = async() => {
        
        setDisableButton(true)
        const comicid = `${uuidv4()}_${new Date().getTime()}`
       
            try{

                await comicApi.createComic(uid, name, comicid)
                setFailed(false)
                window.location.href = `/creator/canvas/${comicid}`

            }catch(err) {

                setFailed(true)
                setErrMessage(err.code)
                setDisableButton(false)
            }

    }





    return(
        <Fragment>
            

            <Row>

                <Col md={8} className="pt-4">
                    <Row>

                        { titles ? (

                            titles.length !== 0 ? titles.map(item => <SeriesBlock comic={item} key={item.id} />) : <ErrorTab errorCode="no-comics" />

                        ) : <Loading />}


                    </Row>
                </Col>

                <Col md={4} className="pt-4">

                    <div className="formBox gt-shadow">
                        <div className="submitButtonWrap">
                            <button onClick={createComic} className="submitButton" disabled={disableButton}> + New Series </button>
                        </div>

                        <div className="mt-4">We do not allow content with excessive / prolonged violence or gore or content that is meant to be sexually gratifying.</div>

                        <ErrorMessage error={errMessage} visible={submissionFailed} fieldError={false} />
                    </div>

                </Col>

            </Row>

          
            
        </Fragment>
    )

}




export default Series
