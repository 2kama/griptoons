import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

//third party components
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


//custom components
import Authenticate from '../../components/Authenticate'
import readApi from '../../api/read'
import Header2 from '../../components/Layouts/Header2'
import Loading from '../../components/Widgets/Loading'
import ErrorTab from '../../components/Error/ErrorTab'
import LikeButton from '../EventButtons/LikeButton'
import { Col, Container, Row, Spinner, Modal } from 'react-bootstrap'
import SubscribeButton from '../EventButtons/SubscribeButton'
import Donations from '../Donations'
import { readCookie, createCookie } from '../../Helpers/cookieFunc'
import { company_full } from '../../Helpers/statics'

//pages
import Comment from '../Comment'
import Footer from '../../components/Layouts/Footer'





const Chapter = ({ match }) => {

    const[episodeData, setEpisodeData] = useState()
    const[episodeStat, setEpisodeStat] = useState()
    const[imageData, setImages] = useState()
    const[Allowed, setAccess] = useState(null)
    const[mainData, setMainData] = useState()
    const[creatorRelated, setCreatorRelated] = useState()
    const[genreRelated, setGenreRelated] = useState()
    const[show, toggleShow] = useState(readCookie("gripToonsAge") === null ? true : false)


    const[disabledBtn, setDisabled] = useState(false)
    const[currentStatus, setStatus] = useState(`Pay 1 coin`)


    const{ user } = useSelector(state => ({
        user : state.user
    }))


    const setAge = () => {
        createCookie("gripToonsAge", "true", 1)
        toggleShow(false)
    }


    const showThisComic = async (genre, comic) => {
        try {

            const gett = await readApi.showThisComic(genre, comic)
            setMainData(gett.docs[0].data())
            
        } catch (err) {
            
        }
    }


    const relatedToCreator = async (creator, comicID) => {

        try {

            const gett = await readApi.relatedToCreator(creator, comicID)
            setCreatorRelated(gett.docs)
            
        } catch (err) {
           
        }

    }


    const relatedToGenre = async (creator, genre) => {

        try {

            const gett = await readApi.relatedToGenre(creator, genre)
            setGenreRelated(gett.docs)
            
        } catch (err) {
           
        }

    }



    const getData = async (genre, comic, episode) => {

        try {

            const gett = await readApi.getEpisode(genre, comic, episode)

            if(gett.docs.length !== 1) {

                window.location.href = `/comics/${genre}/${comic}`

            }else {

                const gott = gett.docs[0].data()
                setEpisodeData(gott)
                showThisComic(genre, comic)

                if(!gott.pay || (gott.pay && user.isAuthenticated && (user.paid[`${gott.comicID}_${gott.id}`])) || (user.isAuthenticated && user.uid === gott.createdBy)) {

                    getStat(gott.comicID, gott.id)
                    getImages(gott.comicID, gott.id)
                    readCount(gott.comicID, gott.id, gott.createdBy)
                    relatedToCreator(gott.createdBy, gott.comicID)
                    relatedToGenre(gott.createdBy, genre)
                    setAccess(true)
                }else {
                    setAccess(false)
                }

            }

            
            
            
        } catch (err) {
            window.location.href = `/comics/${genre}/${comic}`
        }

    }


    const readCount = (comicID, episodeID, createdBy) => {


        if(user.isAuthenticated) {


            if(user.uid !== createdBy) {

                if(localStorage.JSONForReadOnGripToonWeb === undefined || localStorage.JSONForReadOnGripToonWeb === null) {
                    const newRead = {[`${comicID}_${episodeID}`] : true}
                    localStorage.JSONForReadOnGripToonWeb = JSON.stringify(newRead)
    
                    if(user.read[`${comicID}_${episodeID}`]) {
    
                    }else {
            
                        const requestID = uuidv4()
                        readApi.readCount(comicID, episodeID, user.uid, requestID)
            
                    }
    
    
                }else {
    
                    const formerRead = JSON.parse(localStorage.JSONForReadOnGripToonWeb)
    
                    if(formerRead[`${comicID}_${episodeID}`]) {
    
                    }else {
    
                        const newRead = {...formerRead, [`${comicID}_${episodeID}`] : true}
                        localStorage.JSONForReadOnGripToonWeb = JSON.stringify(newRead)
    
                        if(user.read[`${comicID}_${episodeID}`]) {
    
                        }else {
                
                            const requestID = uuidv4()
                            readApi.readCount(comicID, episodeID, user.uid, requestID)
                
                        }
    
    
                    }
    
                    
    
                }


            }

            

        }else {

            if(localStorage.JSONForReadOnGripToonWeb === undefined || localStorage.JSONForReadOnGripToonWeb === null) {
                const newRead = {[`${comicID}_${episodeID}`] : true}
                localStorage.JSONForReadOnGripToonWeb = JSON.stringify(newRead)

                const requestID = uuidv4()
                readApi.readCount(comicID, episodeID, null, requestID)

            }else {

                const formerRead = JSON.parse(localStorage.JSONForReadOnGripToonWeb)

                if(formerRead[`${comicID}_${episodeID}`]) {

                }else {

                    const newRead = {...formerRead, [`${comicID}_${episodeID}`] : true}
                    localStorage.JSONForReadOnGripToonWeb = JSON.stringify(newRead)

                    const requestID = uuidv4()
                    readApi.readCount(comicID, episodeID, null, requestID)

                }

            }

        }

        
        
    }




    const getImages = async (comicID, episodeID) => {

        try {

            const gett = await readApi.getImages(comicID, episodeID)
            setImages(gett.data())
            
        } catch (err) {
            
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
            window.location.href = "/options"
        }else {

            setDisabled(true)

            try {

                await readApi.payForRead(comicID, episodeID, userID)
                setStatus(<Spinner animation="grow" variant="light" />)
            
            } catch (err) {
                
            }

        }
        
    }



    useEffect(() => {

        if(!user.isLoading) {
            getData(match.params.genre, match.params.comic, match.params.episode)
        }

       
    }, [match.params.genre, match.params.comic, match.params.episode, user.isLoading])


    return (
        <Fragment>

            {
                mainData && episodeData && (
                    <>
                        <title>{episodeData.title} | {mainData.name} | {company_full}</title>
                        <meta name="description" content={mainData.about} />
                        <meta name="keywords" content="GripToons, Nigerian comics, Nigerian webtoons" />
                        <meta property="og:title" content={`${mainData.name} - ${episodeData.title}`} />
                        <meta property="og:description" content={mainData.about} />
                        <meta property="og:image" content={mainData.images.large} />
                        <meta property="og:url" content={`https://griptoons.com/comics/${mainData.genre}/${mainData.url}/${episodeData.serial}`} />
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta property="og:site_name" content="GripToons Entertainment" />
                        <meta name="twitter:image:alt" content={`${mainData.name} - ${episodeData.title}`} />
                    </>
                )
            }



            <Authenticate inside={true} strict={false} />
            
            {mainData && episodeData && <Header2 name={mainData.name} genre={mainData.genre} url={mainData.url} title={episodeData.title} page={episodeData.serial} noOfEpisodes={mainData.noOfEpisodes} />}


            {
                mainData && (
                    mainData.adult && (
                        <Modal centered show={show} onHide={e => toggleShow(!show)} size="md" backdrop="static" keyboard={false}>
                            <Modal.Body>
                                <div className="formBox gt-shadow text-center">

                                <h5>
                                    This series is intended for adult audience. Are you at least 18 years or of legal adult age in your area of residence?
                                </h5>

                                <sup><strong>Note:</strong> Any persons younger than 13 years of age is not an audience for GripToons</sup>

                                <Row className="pt-5">
                                    <Col xs={6}>
                                        <a href={`/comics/${mainData.genre}`}>
                                                <button className="submitButton negative">No</button>
                                        </a>
                                            
                                    </Col>

                                    <Col xs={6}>
                                            <button className="submitButton" onClick={e => setAge()}>Yes</button>
                                    </Col>
                                </Row>

                                
                                

                                </div>
                            </Modal.Body>
                        </Modal>
                    )
                    
                )
            }


            <Container>

            {Allowed === null && (<Loading />)}

            {Allowed === false && !user.isLoading && (
                user.isAuthenticated ? (
                <Row className="mt-5 pt-5 text-center">
                    <ErrorTab errorCode="Use one coin to gain Access to Chapter" />
                    <div className="submitButtonWrap">
                        <button className="submitButton" onClick={e => payForRead(episodeData.comicID, episodeData.id, user.uid, episodeData.serial)} disabled={disabledBtn}>{currentStatus}</button>
                    </div>
                    
                    {user.paid[`${episodeData.comicID}_${episodeData.id}`] && window.location.reload()}
                </Row>
                ) : (
                    <Row className="mt-5 pt-5 text-center">
                        <ErrorTab errorCode="You need to be logged in to view this Chapter" />
                    </Row>
                    
                )
            )}

            {Allowed === true && !user.isLoading && episodeData && imageData && (

                <Row>
                    <Col md={12} className="readerDiv pt-4 mt-5">
                        {imageData.images.map(image => (
                            <img 
                                key={image.imageName} 
                                alt={image.imageName} 
                                data-url={image.url} 
                                onSelect={e => e.preventDefault()} 
                                onDragStart={e => e.preventDefault()} 
                                onContextMenu={e => e.preventDefault()} 
                                src={image.url} 
                            />
                        ))}
                    </Col>
                    

                    <Col md={12} className="gt-shadow formBox">
                        <Row>
                        <Col md={{span : 4, offset: 4}}>
                            <Row className="eventButtonBox row text-center">

                                {
                                    user.isAuthenticated ? (
                                        <div className="infoTab col-12 mb-3">
                                            Enjoy this episode?<br />
                                            show your support for the creator!
                                        </div>
                                    ) : (
                                        <div className="infoTab col-12 mb-3">
                                            Enjoy this episode?<br />
                                            Login and show your support for the creator!
                                        </div>
                                    )
                                }
                                

                                <div className="infoTab col-4">
                                    {episodeStat && (<LikeButton creator={episodeData.createdBy} comicID={episodeData.comicID} episodeID={episodeData.id} commentID={null} replyID={null} user={user} likes={episodeStat.likes} type="episode" access={user.isAuthenticated && user.uid !== episodeData.createdBy ? true : false} />)}
                                </div>

                                <div className="infoTab col-4">
                                    <SubscribeButton user={user} comic={{id : episodeData.comicID, createdBy : episodeData.createdBy}} subscribeData={0} full={false} />
                                </div>
                                
                                <div className="infoTab col-4">
                                    <Donations user={user} comicID={episodeData.comicID} creator={episodeData.createdBy} />
                                </div>

                                
                                {
                                    mainData && (
                                        <Col xs={12} className="share pt-4 text-center">
                                            <span>Share : </span>
                                            <a rel="no-opener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=https://griptoons.com/comics/${mainData.genre}/${mainData.url}/${episodeData.serial}`} target="_blank">
                                                <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                                            </a>
                                            <a rel="no-opener noreferrer" href={`https://twitter.com/intent/tweet?text=https://griptoons.com/comics/${mainData.genre}/${mainData.url}/${episodeData.serial}`} target="_blank">
                                                <FontAwesomeIcon icon={["fab", "twitter"]} />
                                            </a>
                                        </Col>
                                    )
                                }
                                
                                
                            </Row>
                        </Col>
                        </Row>
                    </Col>

                    
                    <Col md={12} className="mt-5">
                        <Row>

                            <Col md={8}>
                                
                                {episodeStat && (<Comment episodeData={{...episodeData, ...episodeStat}} user={user} listNum={10} />)}
                                
                            </Col>

                            <Col md={4} className="">

                                <h4>You might also like:</h4>

                                {
                                    creatorRelated && mainData && creatorRelated.map(relatd => relatd.id !== mainData.id && (
                                        <div key={`comic-${relatd.id}`} className="formBox mb-2 gt-shadow">
                                           <div className="episodeSquare" style={{backgroundImage : relatd.data().images.thumbnail === "" ? `url("https://via.placeholder.com/150")` : `url(${relatd.data().images.thumbnail})`}}></div>
                                           <div className="related pl-3 float-left">
                                               <a href={`/comics/${relatd.data().genre}/${relatd.data().url}`}>
                                                    <h6>{relatd.data().name}</h6>
                                                    <span>{relatd.data().creatorName}</span>
                                               </a>
                                           </div>
                                        </div>
                                    ))
                                }

                                {   
                                    genreRelated && mainData && genreRelated.map(relatd => relatd.id !== mainData.id && (
                                        <div key={`comic-${relatd.id}`} className="formBox mb-2 gt-shadow">
                                           <div className="episodeSquare" style={{backgroundImage : relatd.data().images.thumbnail === "" ? `url("https://via.placeholder.com/150")` : `url(${relatd.data().images.thumbnail})`}}></div>
                                           <div className="related pl-3 float-left">
                                               <a href={`/comics/${relatd.data().genre}/${relatd.data().url}`}>
                                                    <h6>{relatd.data().name}</h6>
                                                    <span>{relatd.data().creatorName}</span>
                                               </a>
                                           </div>
                                        </div>
                                    ))
                                }
                                
                            </Col>

                        </Row>
                    </Col>

                        

                    

                    
                
                    
                </Row>

            )}
           
           </Container>

           <Footer />

        </Fragment>
    )
}


export default Chapter