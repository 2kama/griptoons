import React, { Fragment, useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

//custom components
import readApi from '../../../api/read'
import Loading from '../../../components/Widgets/Loading'
import ErrorTab from '../../../components/Error/ErrorTab'
import Authenticate from '../../../components/Authenticate/'
import Header from '../../../components/Layouts/Header'
import { company_full } from '../../../Helpers/statics'

//third party components
import { Container, Tabs, Tab, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//pages
import AboutComic from './About/'
import Episodes from './Episodes'
import Footer from '../../../components/Layouts/Footer'



const Canvas = ({ match }) => {

    const[getFailed, setFailed] = useState(null)
    const[comicData, setComicData] = useState()
    const[errMessage, setErrMessage] = useState()
    const[comicStat, setComicStat] = useState()
    const { user, isLoading } = useSelector(state => ({
        user : state.user,
        isLoading : state.user.isLoading
    }), shallowEqual)





    const checkPermit = async(comicID) => {

        try {

            let ping = await readApi.getComicData(comicID)
            setFailed(false)
            setComicData(ping.data())
            getStatsData(ping.id)
            
        } catch (err) {
            setFailed(true)
            setErrMessage(err.code)
        }

    }

    const getStatsData = async (comicID, cData) => {
        try {

            const gett = await readApi.getComicStats(comicID)
            setComicStat(gett.data())

            
        } catch (err) {
            
        }
    }




    useEffect(() => {

        checkPermit(match.params.comic_id)

    }, [match.params.comic_id])







    return (
        <Fragment>


            <title>Series Dashboard | {comicData && comicData.name} | {company_full}</title>
            <meta name="robots" content="noindex" />
            <meta name="description" content="Become a Series Creator on GripToons, no matter your level of skill" />
            <meta property="og:title" content="Become a Series Creator on GripToons." />
            <meta property="og:description" content="Become a Series Creator on GripToons, no matter your level of skill. Earn money from purchases and reads." />
            <meta property="og:image" content="https://griptoons.com/img/bigRedBanner.jpg" />
            <meta property="og:url" content="https://griptoons.com/creator" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:site_name" content="GripToons Entertainment" />
            <meta name="twitter:image:alt" content="GripToons Entertainment" />


            <Authenticate inside={true} strict={true} />
            <Header />


            <Container className="mainContainer">
            
            {
                getFailed === null ? <Loading /> : (

                    getFailed ? <ErrorTab errorCode={errMessage} /> :

                    !isLoading && comicData && comicStat && (
                        user.uid !== comicData.createdBy ? <ErrorTab errorCode="permission-denied" /> : 

                        <>
                        <Col xs={12} className="back-button mb-4">
                            <span>
                                <a href="/creator" rel="no-opener no-referer"><FontAwesomeIcon icon="angle-double-left" />  Go back</a>
                            </span>
                        </Col>

                        <Tabs className="mainTab">
                
                            <Tab eventKey="about" title="About">
                                <AboutComic comicData={comicData} comicStat={comicStat} />
                            </Tab>

                            <Tab eventKey="episodes" title="Episodes">
                                <Episodes comicData={comicData} />
                            </Tab>
                            
                        </Tabs>
                        </>
                    )

                )

                
            }

            </Container>

            <Footer />

        </Fragment>
    )

}


export default Canvas