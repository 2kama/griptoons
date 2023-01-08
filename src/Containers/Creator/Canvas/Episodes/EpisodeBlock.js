
import React, { Fragment, useState } from 'react'

//custom components
import comicApi from '../../../../api/comic'
import { FormToggle } from '../../../../components/Form'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from 'react-bootstrap'

//media
import defaultSquare from '../../../../img/default-square.png'


const EpisodeBlock = ({ episode, published }) => {

    const [show, toggleShow] = useState(false)


    const setPublish = (opp) => {

        comicApi.publishEpisode(episode.comicID, episode.id, opp, episode.createdBy)

    }

    const deleteEpisode = () => {
        toggleShow(false)
        comicApi.deleteEpisode(episode.comicID, episode.id)
        
    }


    return (
        <Fragment>


            {
                !published && 
                
                <Modal centered show={show} onHide={e => toggleShow(!show)} size="md">
                <Modal.Body>
                    <div className="formBox gt-shadow text-center">

                    <h5>
                        Are you sure you want to delete this episode?
                    </h5>

                        <button className="submitButton" onClick={e => deleteEpisode()}>Yes, Delete episode</button>
                      
                    </div>
                </Modal.Body>
            </Modal>
            }
        
            <tr className="episode-tr">
                {
                    published && <td>#{episode.serial}</td>
                }
                <td>
                    <span className="episodeSquare" style={{backgroundImage : episode.thumbnail === "" ? `url(${defaultSquare})` : `url(${episode.thumbnail})`}}></span>
                </td>
                 <td>{episode.title === "" ? <i>????????</i> : episode.title}</td>
                 <td><a href={`/creator/canvas/${episode.comicID}/${episode.id}`}><FontAwesomeIcon icon="edit" /></a></td>
                 {
                     !published && <td><span onClick={e => toggleShow(true)} className="pointer"><FontAwesomeIcon icon="trash" /></span></td>
                 }
                 <td>
                    <FormToggle 
                        text="" 
                        btnStyle={{fontSize: "30px", marginBottom : "-24px"}} 
                        control={setPublish} 
                        currentState={published} 
                    />
                 </td>
             </tr>    
         
            
        </Fragment>
    )
}




export default EpisodeBlock