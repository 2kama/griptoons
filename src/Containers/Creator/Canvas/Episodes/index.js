import React, { Fragment, useEffect, useState } from 'react'

//custom components
import comicApi from '../../../../api/comic'
import ErrorMessage from '../../../../components/Error/ErrorMessage';

//third party components
import firebase from '../../../../utils/Firebase'
import { v4 as uuidv4 } from 'uuid';
import { Col, Row } from 'react-bootstrap';

//pages
import EpisodeCase from './EpisodeCase'


const db = firebase.firestore()

const Episodes = ({ comicData }) => {

    const [submissionFailed, setFailed] = useState(false);
    const [errMessage, setErrMessage] = useState("")
    const [titles, setTitles] = useState()
    const [btnDisabled, setBtnDisabled] = useState(false)


    const createEpisode = async() => {

        setBtnDisabled(true)
        const episodeID = `e_${uuidv4()}`
       
            try{

                await comicApi.createEpisode(comicData.id, episodeID, comicData.createdBy)
                setFailed(false)
                setBtnDisabled(false)
                window.location.href = `/creator/canvas/${comicData.id}/${episodeID}`

            }catch(err) {

                setFailed(true)
                setErrMessage(err.code)
                setBtnDisabled(false)

            }

    }



    useEffect(() => {
        
        db.collection(`comics/${comicData.id}/episodes`).where("comicID", "==", comicData.id).orderBy('updated', 'asc').onSnapshot(dot => {
            setTitles(dot.docs)
        })


    }, [comicData.id])




    return(
        <Fragment>
           <Row>

                <Col md={8} className="pt-4">

                    <h5 className="section-header mt-4"> Published Episodes</h5>
                    <EpisodeCase episodes={titles} published={true} />
                        
             
                    <h5 className="section-header mt-4"> Unpublished Episodes</h5>
                    <EpisodeCase episodes={titles} published={false} />


                </Col>

                <Col md={4}>

                    <div className="formBox gt-shadow">
                        <div className="submitButtonWrap">
                            <button onClick={createEpisode} className="submitButton" disabled={btnDisabled}> + New Episode </button>
                        </div>

                        <div className="mt-4">We do not allow content with excessive / prolonged violence or gore or content that is meant to be sexually gratifying.</div>

                        <ErrorMessage error={errMessage} visible={submissionFailed} fieldError={false} />
                    </div>

                </Col>

           </Row>


           
        </Fragment>
    )

}




export default Episodes
