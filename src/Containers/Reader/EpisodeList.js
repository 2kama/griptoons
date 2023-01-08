import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'

//third party components
import moment from "moment"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Spinner } from 'react-bootstrap'

//custom components
import readApi from '../../api/read'
import { shrinkNumber } from '../../Helpers/functions'
import { TIME_ZONE } from '../../Helpers/statics'

//media
import defaultSquare from '../../img/default-square.png'



const EpisodeList = ({ episodeData, url, user }) => {

    const[episodeStat, setEpisodeStat] = useState()
    const[show, toggleShow] = useState(false)
    const[disabledBtn, setDisabled] = useState(false)
    const[currentStatus, setStatus] = useState("Unlock")

    const Iread = () => {
        
        if(user.isAuthenticated) {

            if(user.read[`${episodeData.data().comicID}_${episodeData.id}`]) {
                return true
            }else {
                return false
            }

        }else {

            const read = JSON.parse(localStorage.JSONForReadOnGripToonWeb)

            if(read[`${episodeData.data().comicID}_${episodeData.id}`]) {
                return true
            }else {
                return false
            }

        }

    }

    const getStat = async (comicID, episodeID) => {
        
        try {
            const gett = await readApi.getEpisodeStat(comicID, episodeID)
            setEpisodeStat(gett.data())
        } catch (err) {
           
        }
    }


    const payForRead = async (comicID, episodeID, userID) => {

        if(user.coin <= 0) {
            console.log("no money")
        }else {

            setDisabled(true)

            try {

                await readApi.payForRead(comicID, episodeID, userID)
                setStatus(<Spinner animation="grow" variant="light" />)

                setTimeout(() => {
                    toggleShow(false)
                }, 3000)
            
            } catch (err) {
                
            }

        }
        
    }


    useEffect(() => {
        getStat(episodeData.data().comicID, episodeData.id)
    }, [episodeData])


    const { pay, comicID, thumbnail, title, serial, createdBy, updated } = episodeData.data()

    return (
        <Fragment>

            
            {!pay || (pay && user.isAuthenticated && user.paid[`${comicID}_${episodeData.id}`]) || (user.isAuthenticated && createdBy === user.uid) ? (

                
                <tr className={`episode-tr  ${Iread() ? "read" : ""}`}>
                    <td>#{serial}</td>
                    <td><a href={`/comics/${url}/${serial}`}><span className="episodeSquare" style={{backgroundImage : thumbnail === "" ? `url(${defaultSquare})` : `url(${thumbnail})`}}></span></a></td>
                    <td>
                        <div>
                            <a href={`/comics/${url}/${serial}`}>{title}</a>
                            <span className="time">
                                {moment(updated - TIME_ZONE).format('ll')} &emsp;
                                <FontAwesomeIcon icon={["far", "heart"]} /> {episodeStat && shrinkNumber(episodeStat.likes)} &emsp;
                                <FontAwesomeIcon icon="comment" /> {episodeStat && shrinkNumber(episodeStat.total_comments)}
                            </span>
                        </div>
                    </td>
                   
                    <td><a href={`/comics/${url}/${serial}`}><FontAwesomeIcon icon="arrow-circle-right" /></a></td>
                </tr>

            ) : 
            
            user.isAuthenticated ? (

                <>

                    
                    <Modal centered show={show} onHide={e => toggleShow(!show)} size="md">
                        <Modal.Body>
                            <div className="formBox gt-shadow text-center">

                                {
                                   user.coin <= 0 ? (
                                       <>
                                       <h4>You do not have sufficient coins to access this episode</h4>
                                       <a className="text-danger" href="/options" rel="no-opener no-referer"><h6>Buy Coins</h6></a>
                                       </>
                                   ) : (
                                       <>
                                         <span className="episodeSquare" style={{margin : "2% 45%", backgroundImage : thumbnail === "" ? `url(${defaultSquare})` : `url(${thumbnail})`}}></span>
                                         <h4>1 <FontAwesomeIcon icon="copyright" /></h4>
                                         <h6>Unlock access to <span className="text-danger">{title}</span></h6>
                                         <sub>By clicking "Unlock", you agree to our <a rel="no-opener no-referer" href="/terms">Terms of Use</a>  and <a rel="no-opener no-referer" href="/privacy_policy">Privacy Policy</a>.</sub>
                                         <div className="mt-4"><button disabled={disabledBtn} onClick={e => payForRead(comicID, episodeData.id, user.uid)} className="btn btn-danger">{currentStatus}</button></div>
                                       </>
                                   )
                                }

                                

                            </div>
                        </Modal.Body>
                    </Modal>

                <tr className="episode-tr">
                    <td>#{serial}</td>
                    <td><span className="episodeSquare" style={{backgroundImage : thumbnail === "" ? `url(${defaultSquare})` : `url(${thumbnail})`}}></span></td>
                    <td>
                        <div>
                            <span onClick={e => toggleShow(true)} className="payBtn">{title}</span>
                            <span className="time">
                                {moment(updated - TIME_ZONE).format('ll')} &emsp;
                                <FontAwesomeIcon icon={["far", "heart"]} /> {episodeStat && shrinkNumber(episodeStat.likes)} &emsp;
                                <FontAwesomeIcon icon="comment" /> {episodeStat && shrinkNumber(episodeStat.total_comments)}
                            </span>
                        </div>
                    </td>
                    <td><span onClick={e => toggleShow(true)} className="payBtn">1 <FontAwesomeIcon icon="copyright" /></span></td>
                </tr>
                </>

            ) : (

                <tr className="episode-tr auth">
                    <td>#{serial}</td>
                    <td><span className="episodeSquare" style={{backgroundImage : thumbnail === "" ? `url(${defaultSquare})` : `url(${thumbnail})`}}></span></td>
                    <td>
                        <div>
                            <span>{title}</span>
                            <span className="time">Login to unlock episode</span>
                        </div>
                    </td>
                    <td><span> <FontAwesomeIcon icon="exclamation-circle" /></span></td>
                </tr>

            )
            
            }


        </Fragment>
    )
}




export default EpisodeList