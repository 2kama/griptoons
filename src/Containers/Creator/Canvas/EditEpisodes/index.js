import React, { Fragment, useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'


//third party components
import * as Yup from 'yup'
import { Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//custom components
import comicApi from '../../../../api/comic'
import readApi from '../../../../api/read'
import Authenticate from '../../../../components/Authenticate'
import Header from '../../../../components/Layouts/Header'
import ErrorMessage from '../../../../components/Error/ErrorMessage'
import { Form, FormField, FormToggle, SubmitButton } from '../../../../components/Form/'
import Loading from '../../../../components/Widgets/Loading'
import { company_full } from '../../../../Helpers/statics'
import { thousands_separators } from '../../../../Helpers/functions'
import ErrorTab from '../../../../components/Error/ErrorTab'

//pages
import ImageList from './ImageList'
import Footer from '../../../../components/Layouts/Footer'
import UploadImage from '../../../../components/Widgets/UploadImage'
import MultipleUpload from '../../../../components/Widgets/MultipleUpload'


const validationSchema = Yup.object().shape({
    title: Yup.string().required().label("Episode Title")
});


const EditEpisode = ({ match }) => {

    const[getFailed, setFailed] = useState(false)
    const[episodeData, setEpisodeData] = useState()
    const[episodeStat, setEpisodeStat] = useState()
    const[errMessage, setErrMessage] = useState()
    const[images, setImages] = useState()
    const[disableBtn, setButtonDisable] = useState(false)
    const[monitize, setMonitize] = useState(false)

    const [imageError, setImageError] = useState(false)
    const [imageErrorMsg, setImageErrorMessage] = useState()

    const getImageError = (eRR, eRRmSG) => {

        setImageError(eRR)
        setImageErrorMessage(eRRmSG)

    }
    


    const { user, isLoading } = useSelector(state => ({
        user : state.user,
        isLoading : state.user.isLoading
    }), shallowEqual)


    const updateImages = (Img) => {
        setImages({...images, images : Img})
    }




    const submitForm = async ({ title }) => {

             setButtonDisable(true)

            try {
                await comicApi.updateEpisode(title, episodeData, monitize, images.images)
                setFailed(false)
                setEpisodeData({...episodeData, title})
                setButtonDisable("Episode Updated Successfully!")

                setTimeout(() => {
                    setButtonDisable(false)
                }, 3000)

            } catch (err) {
               setFailed(true);
               setErrMessage(err.code)
               setButtonDisable(false)
            }

       
        
        
    }


    const getEpisodeStat = async (comicID, episodeID) => {

        try {

            let ping = await readApi.getEpisodeStat(comicID, episodeID)
            setEpisodeStat(ping.data())
            
        } catch (err) {
            setFailed(true)
            setErrMessage(err.code)
        }

    }


    const checkPermit = async(comicID, episodeID) => {

        try {

            let ping = await comicApi.getEpisode(comicID, episodeID)
            setFailed(false)
            setEpisodeData(ping.data())
            setMonitize(ping.data().pay)
            getImages(comicID, episodeID)
            getEpisodeStat(comicID, episodeID)
            
        } catch (err) {
            setFailed(true)
            setErrMessage(err.code)
        }

    }



    const getImages = async (comicID, episodeID) => {
        try {

            const gett = await comicApi.getImages(comicID, episodeID)
            setImages(gett.data())
            
        } catch (err) {
            setFailed(true)
            setErrMessage(err.code)
        }
    }


    


    useEffect(() => {

        checkPermit(match.params.comic_id, match.params.episode_id)

        

    }, [match.params.comic_id, match.params.episode_id])


    




    return (
        <Fragment>


            <title>Edit Episode | {episodeData && episodeData.title} | {company_full}</title>
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
                            !isLoading && episodeData && episodeStat ? (
                            user.uid !== episodeData.createdBy ? <Redirect to={`creator/canvas/${match.params.comic_id}`} /> : 
                            
                            <Row>

                                <Col xs={12} className="back-button mb-4">
                                    <span>
                                        <a href={`/creator/canvas/${episodeData.comicID}`} rel="no-opener no-referer"><FontAwesomeIcon icon="angle-double-left" />  Go back</a>
                                    </span>
                                </Col>

                                <Col md={4}>

                                   <Row>
                                     

                                        <Col xs={6} className="mb-3">

                                            <UploadImage 
                                                defaultImage={episodeData.thumbnail} 
                                                getUploadError={getImageError} 
                                                fileDisplay="smallImageUpload" 
                                                sizeLimit={204800}  
                                                fileDestination={`comic/${episodeData.comicID}/episodes/${episodeData.id}/thumb/thumbnail`}
                                                updateDetails={{Location : `comics/${episodeData.comicID}/episodes/${episodeData.id}`, Field : "thumbnail"}}
                                                dataClass="episode-image"
                                                fileType={['image/jpg', 'image/png', 'image/jpeg']}
                                            />

                                        </Col>

                                        <Col xs={6}>
                                            <div className="formBox gt-shadow episodeStat">

                                                <div className="mb-3">
                                                    <FontAwesomeIcon icon="heart" /> {thousands_separators(episodeStat.likes)}
                                                </div>

                                                <div className="mb-3">
                                                    <FontAwesomeIcon icon="book-reader" /> {thousands_separators(episodeStat.reads)}
                                                </div>

                                                <div>
                                                    <FontAwesomeIcon icon="comment" /> {thousands_separators(episodeStat.total_comments)}
                                                </div>


                                            </div>
                                        </Col>

                                    </Row>

                                    <ErrorMessage error={imageErrorMsg} visible={imageError} fieldError={false} />

                                    <div className="formBox gt-shadow">
                                            Images should be in png or jpeg/jpg format.<br />
                                            Thumbnail Image should be an image from the episode<br />
                                            Thumbnail Image preferably should be a square and no larger than 200KB
                                    </div>
                                   

                                    <div className="formBox gt-shadow mt-3 mb-4">

                                        <Form
                                            initialValues={{ title: episodeData.title}}
                                            onSubmit={submitForm}
                                            validationSchema={validationSchema}
                                        >

                                            <FormField
                                            type="text"
                                            name="title"
                                            placeholder="Title of this episode"
                                            icon="book-reader"
                                            />


                                            <FormToggle 
                                                text="Monitize ?" 
                                                btnStyle={{fontSize: "30px", marginTop : "-2px", marginLeft : "20px"}} 
                                                control={setMonitize} 
                                                currentState={monitize} 
                                            />

                                

                                            <SubmitButton title="Save Changes" disable={disableBtn} />
                                            <sup className="text-danger">Ensure every changes (Image deletes, Image swaps, Image uploads, title updates) are saved before leaving the page.</sup>
                                            <ErrorMessage error={errMessage} visible={getFailed} fieldError={false} />

                                        
                                        </Form>

                                    </div>
                                    
                                    
                                    </Col>

                                    <Col md={8}>

                                        
                                        { images && (
                                            <MultipleUpload 
                                                fileArray={images.images}
                                                updateArray={updateImages}
                                                fileType={['image/jpeg', 'image/jpg', 'image.png']}
                                                sizeLimit={2097152}
                                                inputID="seriesPages"
                                                inputText="Drag N Drop Pages here or Click"
                                                fileDestination={`comic/${episodeData.comicID}/episodes/${episodeData.id}/pages`}
                                            />)}


                                        {
                                            images && (
                                            <div className="formBox gt-shadow mt-3">
                                                <sup> You can rearrange page images by swapping. To swap just click on an image and then click on the image you wish to swap with<br />
                                                    Images are numbered from left to right, up to down. They will be displayed for readers in that number arrangement scrolling top to bottom.
                                                    <br /><br />
                                                </sup>
                                                <ImageList comicImages={images.images} updateImages={updateImages} />
                                            </div>
                                            
                                            
                                            )
                                        }


                                    </Col>



                            </Row>
                        ) : (
                            <>
                            <Loading />
                            <ErrorTab errorCode={errMessage} />
                            </>
                        )

                        
                    }


                </Container>


                <Footer />
            
        </Fragment>
    )

}


export default EditEpisode