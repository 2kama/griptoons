import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

//custom components
import readApi from '../../api/read'
import { company_full, GENRE } from '../../Helpers/statics'
import { getIndexOfK } from '../../Helpers/functions'
import { readCookie, createCookie } from '../../Helpers/cookieFunc'
import Authenticate from '../../components/Authenticate'
import Header from '../../components/Layouts/Header'
import SubscribeButton from '../EventButtons/SubscribeButton'
import ErrorTab from '../../components/Error/ErrorTab'
import RatingButton from '../EventButtons/RatingButton'
import VerifyEmail from '../../components/Widgets/VerifyEmail'
import Pagination from '../../components/Widgets/Pagination'

//pages
import EpisodeList from './EpisodeList'

//third party components
import { Badge, Col, Container, Modal, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageNotFound from '../../components/Widgets/PageNotFound'
import Footer from '../../components/Layouts/Footer'


//media 
import defaultSquare from '../../img/default-square.png'
import defaultRect from '../../img/default-rect.png'



if(localStorage.JSONForReadOnGripToonWeb === undefined || localStorage.JSONForReadOnGripToonWeb === null) {
    const start = {"start" : true}

    localStorage.JSONForReadOnGripToonWeb = JSON.stringify(start)
}


const ShowComic = ({ match }) => {

    const[error, setError] = useState()
    const[mainData, setMainData] = useState()
    const[statData, setStatData] = useState()
    const[episodes, setEpisodes] = useState()
    const[ErrMessage, setErrMessage] = useState("")
    const[show, toggleShow] = useState(readCookie("gripToonsAge") === null ? true : false)


    const K = (genre) => {
        let idx = getIndexOfK(GENRE, genre)
        return GENRE[idx[0]][0]
        
    }


    const setAge = () => {
        createCookie("gripToonsAge", "true", 1)
        toggleShow(false)
    }
    
    

    const { user, isLoading } = useSelector(state => ({
        user : state.user,
        isLoading : state.user.isLoading
    }), shallowEqual)





    const getComicPageData = async (genre, comic) => {

        try {

            const gett = await readApi.showThisComic(genre, comic)
            if(gett.docs.length !== 1) {
                setError(true)
                setErrMessage("comic-not-found")
            } else {

                setMainData(gett.docs[0].data())
                getStatsData(gett.docs[0].id)
                getEpisodes(gett.docs[0].id, gett.docs[0].data().noOfEpisodes)

            }

            
            
        } catch (err) {
            setError(true)
            setErrMessage(err.code)
        }

    }

    const getStatsData = async (comicID) => {
        try {

            const gett = await readApi.showComicStats(comicID)
            setStatData(gett.data())

            
        } catch (err) {
            
        }
    }


    const getEpisodes = async (comicID, noOfEpisodes) => {
        try {

            const gett = await readApi.getEpisodes(comicID, noOfEpisodes)
            if(gett.docs.length === 0) {
                setError(true)
                setErrMessage("no-available-episodes")
            }else {
                setEpisodes(gett.docs)
            }
            
            
        } catch (err) {
            setError(true)
            setErrMessage(err.message)
        }
    }


    const scrollEpisodes = (endAt) => {
        getEpisodes(mainData.id, endAt)
    }


    useEffect(() => {

        getComicPageData(match.params.genre, match.params.comic)

    }, [match.params.genre, match.params.comic])


    return (
        <Fragment>


            {getIndexOfK(GENRE, match.params.genre) === undefined ? <PageNotFound /> : (

                <Fragment>
            {
                mainData && (
                    <>
                        <title>{mainData.name} | {company_full}</title>
                        <meta name="description" content={mainData.about} />
                        <meta name="keywords" content="GripToons, Nigerian comics, Nigerian webtoons" />
                        <meta property="og:title" content={mainData.name} />
                        <meta property="og:description" content={mainData.about} />
                        <meta property="og:image" content={mainData.images.large} />
                        <meta property="og:url" content={`https://griptoons.com/comics/${mainData.genre}/${mainData.url}`} />
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta property="og:site_name" content="GripToons Entertainment" />
                        <meta name="twitter:image:alt" content={mainData.name} />
                    </>
                )
            }


            <Authenticate inside={true} strict={false} />

            {
                !isLoading && user.isAuthenticated && !user.emailVerified && <VerifyEmail userEmail={user.email} />
            }

            <Header />


            

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




            <Container className="mainContainer">
                
                <Row>

                <Col md={8}>
                    <Row>
                    {mainData && (

                        <>
                            <Col xs={12}>
                                <div className="bigImage gt-shadow" style={{backgroundImage : mainData.images.large === "" ? `url(${defaultRect})` : `url(${mainData.images.large})`}}></div>
                            </Col>
                            
                            <Col sm={{span:4, offset:0}} xs={{ span: 10, offset: 1 }} className="small-help">
                                <div className="smallImage gt-shadow" style={{backgroundImage : mainData.images.thumbnail === "" ? `url(${defaultSquare})` : `url(${mainData.images.thumbnail})`}}></div>
                            </Col>

                            <Col sm={{ span:8, offset: 0 }} xs={{ span: 10, offset: 1}}>
                                <div className="formBox gt-shadow ml-1 mt-3 eventButtonBox row">

                                    <span className="infoTab col-6">

                                        {statData && !user.isLoading && (
                                            <SubscribeButton subscribeData={statData.subscribe} comic={mainData} user={user} full={true} />
                                        )}
                                    </span>

                                    <div className="infoTab col-6">
                                        
                                        {statData && !user.isLoading && (
                                            <RatingButton comic={mainData} rating={statData.rating} user={user} />
                                        )}
                                    </div>

                                </div>
                            </Col>


                            <Col xs={12}>
                                <div className="formBox gt-shadow mt-3 topicHouse">
                                    <h4>
                                        {mainData.name} 
                                        {
                                            mainData.sGenre !== "" && <Badge className="float-right" variant="success">{K(mainData.sGenre)}</Badge>
                                        }
                                        <Badge variant="danger" className="float-right">{K(mainData.genre)}</Badge>
                                        
                                        </h4> 
                                    <div>{mainData.creatorName}</div>
                                </div>
                            </Col>
                            
                        </>

                    )}
                    
                    </Row>

                 
                        {error && <ErrorTab errorCode={ErrMessage} />}
                        {!error && <h5 className="section-header mt-4"><FontAwesomeIcon icon="list-ol" /> Episodes</h5>}
                        <Table responsive="md" className="gt-table">
                            <tbody>
                            {episodes && !user.isLoading && (
                                episodes.map(episode => <EpisodeList key={episode.id} episodeData={episode} url={`${mainData.genre}/${mainData.url}`} user={user} />)
                            )}
                            </tbody>
                        </Table>
                        
                        {mainData && <Pagination total={mainData.noOfEpisodes} limit={10} scroll={scrollEpisodes} />}

                    
                </Col>



                <Col md={4} className="mt-2">

                    {mainData && (
                    

                        <div className="formBox gt-shadow mt-3">
                            <h5 className="text-left">About</h5>
                            <p>{mainData.about}</p>

                            {mainData.completed && <Badge pill variant="danger">Completed</Badge>}

                            <Col xs={12} className="share pt-4">
                                <span>Share : </span>
                                <a rel="no-opener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=https://griptoons.com/comics/${mainData.genre}/${mainData.url}`} target="_blank">
                                    <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                                </a>
                                <a rel="no-opener noreferrer" href={`https://twitter.com/intent/tweet?text=https://griptoons.com/comics/${mainData.genre}/${mainData.url}`} target="_blank">
                                    <FontAwesomeIcon icon={["fab", "twitter"]} />
                                </a>
                            </Col>

                            <a rel="no-opener no-referer" href={`/comics/${mainData.genre}/${mainData.url}/1`}><button className="submitButton mt-5">Go To First Episode</button></a>

                        </div>
                    
                    )}


                </Col>
                </Row>

            </Container>

            <Footer />

            </Fragment>
            )}

            
        </Fragment>
    )
}


export default ShowComic