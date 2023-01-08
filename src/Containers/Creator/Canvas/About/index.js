import React, { Fragment, useState } from 'react'

//third party component
import * as Yup from 'yup'
import slug from 'slug'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Row } from 'react-bootstrap'

//custom component
import comicApi from '../../../../api/comic'
import ErrorMessage from '../../../../components/Error/ErrorMessage'
import { Form, FormField, FormToggle, SubmitButton, TextareaField, FormRadioBox } from '../../../../components/Form/'
import { GENRE } from '../../../../Helpers/statics'
import { thousands_separators } from '../../../../Helpers/functions'

//pages
import AdRevenue from './AdRevenue'
import DeleteComic from './DeleteComic'
import UploadImage from '../../../../components/Widgets/UploadImage'

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Comic Name"),
    about: Yup.string().max(500).label("Comic Summary"),
  });


const AboutComic = ({ comicData, comicStat }) => {

    const [disableButton, setDisableButton] = useState(false)
    const [submissionFailed, setFailed] = useState(false);
    const [errMessage, setErrMessage] = useState("")
    const [Genre, setGenre] = useState(comicData.genre)
    const [preGenre, setPreGenre] = useState(comicData.genre)
    const [sGenre, setsGenre] = useState(comicData.sGenre)
    const [publish, setPublish] = useState(comicData.published)
    const [prePublish, setPrePublish] = useState(comicData.published)
    const [completed, setCompleted] = useState(comicData.completed)
    const [adult, setAdult] = useState(comicData.adult)
    const [currentData, setCurrentData] = useState({
        name : comicData.name,
        about : comicData.about
    })

    const [noGenre, setNoGenre] = useState(false)

    const [imageError, setImageError] = useState(false)
    const [imageErrorMsg, setImageErrorMessage] = useState()

    const getImageError = (eRR, eRRmSG) => {

        setImageError(eRR)
        setImageErrorMessage(eRRmSG)

    }

    const submitForm = async ({name, about}) => {
        setFailed(false)
        setNoGenre(false)

        if(Genre === "") {
            setFailed(true)
            setNoGenre(true)
            setErrMessage("You need to pick a Primary Genre. This can be changed later")
        }else {

            setDisableButton(true)

            try {
                await comicApi.updateComic(comicData.createdBy, name, slug(name), about, Genre, preGenre, sGenre, publish, prePublish, adult, completed, comicData.id, comicData.creatorName, comicData.url, currentData.name !== name)
                setFailed(false)
                setCurrentData({name, about})
                setPreGenre(Genre)
                setPrePublish(publish)
                
                setDisableButton("Comic Updated Successfully!")
                setTimeout(() => {
                    setDisableButton(false)
                }, 3000)

            } catch (err) {
               setFailed(true);
               setErrMessage(err.code)
               setDisableButton(false)
            }

        }
        
        
    }

  

    return (
        <Fragment>

            <Row>

                <Col md={7} className="pt-4">


                    <UploadImage 
                        defaultImage={comicData.images.large} 
                        getUploadError={getImageError} 
                        fileDisplay="largeImageUpload" 
                        sizeLimit={512000}  
                        fileDestination={`comic/${comicData.id}/profile/large`}
                        updateDetails={{Location : `comics/${comicData.id}`, Field : "images.large"}}
                        dataClass="big-comic-image"
                        fileType={['image/jpg', 'image/png', 'image/jpeg']}
                    />


                    <Col xs={4} className="small-help">

                    <UploadImage 
                        defaultImage={comicData.images.thumbnail} 
                        getUploadError={getImageError} 
                        fileDisplay="smallImageUpload" 
                        sizeLimit={204800}  
                        fileDestination={`comic/${comicData.id}/profile/thumbnail`}
                        updateDetails={{Location : `comics/${comicData.id}`, Field : "images.thumbnail"}}
                        dataClass="small-comic-image"
                        fileType={['image/jpg', 'image/png', 'image/jpeg']}
                    />

                    </Col>

                    <ErrorMessage error={imageErrorMsg} visible={imageError} fieldError={false} />

                    <div className="formBox gt-shadow mt-2 mb-3">
                        Images should be in png or jpeg/jpg format.<br />
                        Cover-Image preferably should scale 5:3 and no larger than 500KB<br />
                        Thumbnail-Image preferably should be a square and no larger than 200KB
                    </div>

                    {
                        comicStat.subscribe >= 1000 && <AdRevenue comicID={comicData.id} />
                    }

                    

                </Col>




                <Col md={5}>
                    <h5 className="section-header mt-4"><FontAwesomeIcon icon="chart-area" /> Series Stats</h5>
                    <div className="formBox gt-shadow">

                        <Row>

                            <Col xs={6} className="wallet-comp text-center mb-5">
                                <FontAwesomeIcon icon="heart" />
                                <div>{thousands_separators(comicStat.likes)}</div>
                            </Col>

                            <Col xs={6} className="wallet-comp text-center">
                                <FontAwesomeIcon icon="star" />
                                <div>{comicStat.rating.total_points === 0 ? "No Data" : `${(comicStat.rating.total_points / comicStat.rating.total_users).toFixed(2)} (${thousands_separators(comicStat.rating.total_users)} users)`}</div>
                            </Col>

                            <Col xs={6} className="wallet-comp text-center">
                                <FontAwesomeIcon icon="user-plus" />
                                <div>{thousands_separators(comicStat.subscribe)}</div>
                            </Col>

                            <Col xs={6} className="wallet-comp text-center">
                                <FontAwesomeIcon icon="book-reader" />
                                <div>{thousands_separators(comicStat.reads)}</div>
                            </Col>

                        </Row>
                        

                    </div>

                    <div className="formBox gt-shadow mt-2 mb-2">
                        <Row>

                            <Col md={12}>
                               Comic URL : <strong>https://griptoons.com/comics/{comicData.genre}/{comicData.url}</strong>
                            </Col>

                            <Col md={12} className="mt-3">
                                <sup>Please keep in mind that your Comic URL changes when you update your Comic Name and/or your comic's primary genre</sup>
                                <sup>Reload page after changing any of these two fields to get your updated comic URL</sup>
                            </Col>

                        </Row>
                    </div>

                    

                    <ErrorMessage
                                error="Save changes before leaving page or changes will be lost"
                                visible={true}
                                fieldError={false}
                                />


                </Col>

                    



                <Col md={8}>

                    <h5 className="section-header mt-4"><FontAwesomeIcon icon="info-circle" /> Series Details</h5>
                    <div className="formBox gt-shadow mb-5">


                    <Form
                            initialValues={{ name: currentData.name, about: currentData.about }}
                            onSubmit={submitForm}
                            validationSchema={validationSchema}
                        >

                                <FormField
                                    type="text"
                                    name="name"
                                    placeholder="Series Name"
                                    icon="book-reader"
                                />


                                <FormToggle 
                                    text="Series Completed?" 
                                    btnStyle={{fontSize: "30px", marginTop : "-2px", marginLeft : "20px"}} 
                                    control={setCompleted} 
                                    currentState={completed} 
                                />

                                <FormToggle 
                                    text="Publish" 
                                    btnStyle={{fontSize: "30px", marginTop : "-2px", marginLeft : "20px"}} 
                                    control={setPublish} 
                                    currentState={publish} 
                                />


                                <FormToggle 
                                    text="Is this series meant for adult audience." 
                                    btnStyle={{fontSize: "30px", marginTop : "-2px", marginLeft : "20px"}} 
                                    control={setAdult} 
                                    currentState={adult} 
                                />

                                <sup>
                                    This is not an invitation to violate our policy on excessive gore/violence scene nor is it an approval for sexaully gratifying content.
                                    Please refer to our <a href="/community_policy" target="_blank">Community Policy</a> and 
                                    <a href="/terms" target="_blank"> Terms of Use</a> page for more clarity.
                                </sup>

                                <h6 className="mt-4">Primary Genre</h6>
                                <Row>
                                    {GENRE.map(gnr => <Col key={`pr-gnr-${gnr[1]}`} md={4} sm={6} xs={6}><FormRadioBox icon={gnr[2]} clicker={setGenre} choice={gnr[1]} checked={Genre} text={gnr[0]} error={noGenre} /></Col>)}
                                </Row>


                                <h6 className="mt-4">Secondary Genre (optional)</h6>
                                <Row className="mb-4">
                                    {GENRE.map(gnr => <Col key={`pr-gnr-${gnr[1]}`} md={4} sm={6} xs={6}><FormRadioBox icon={gnr[2]} clicker={setsGenre} choice={gnr[1]} checked={sGenre} text={gnr[0]} error={false} /></Col>)}
                                </Row>
                                

                                


                                <TextareaField
                                
                                name="about"
                                placeholder="Short synoptics of the Series"
                                maxlength="500"
                                rows="6" 
                                icon="info-circle"
                                />

                                
                                
                                <SubmitButton title="Save Changes" disable={disableButton} />
                             
                                

                                <ErrorMessage
                                error={errMessage}
                                visible={submissionFailed}
                                fieldError={false}
                                />
                            </Form>


                    </div>
                    
                    </Col>
                    


                    <Col md={4} className="mt-5">
                        <div className="formBox mt-2 gt-shadow text-center">
                        <DeleteComic comicID={comicData.id} deletable={!prePublish} />
                        </div>
                        
                    </Col>
                

            </Row>
            
     

        </Fragment>
    )
}



export default AboutComic