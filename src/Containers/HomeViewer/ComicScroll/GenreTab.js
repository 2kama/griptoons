import React, { Fragment, useEffect, useState } from 'react'

//third party components
import { Row, Col } from 'react-bootstrap'

//custom components
import ErrorMessage from '../../../components/Error/ErrorMessage'
import readApi from '../../../api/read'
import ErrorTab from '../../../components/Error/ErrorTab'

//pages
import ComicBlock from '../../../components/ComicBox/ComicBlock'

const list = 20


const GenreTab = ({ Genre, orderBy, display }) => {


    const [getFailed, setFailed] = useState(false);
    const [errMessage, setErrMessage] = useState("")
    const [comics, setComics] = useState(null)
    const [getMore, setGetMore] = useState(false)
    const [btnDisabled, setDisable] = useState(false)



    const getComicDetails = async (genre, order, num, from = null) => {

        setDisable(true)
        if(from === null) setComics(null)

        try {

            

            let ping = await readApi.getComicsByOrder(genre, from, order, num)
            setFailed(false)
            from ? setComics([...comics, ...ping.docs]) : setComics(ping.docs)
            
            ping.docs.length < num ? setGetMore(false) : setGetMore(true)
            
            setDisable(false)
            
        } catch (err) {
            setFailed(true)
            setErrMessage(err.code)
            setDisable(false)
        }

    }


    useEffect(() => {
        
        getComicDetails(Genre, orderBy, list)

    }, [Genre, orderBy])

    return (
        <Fragment>
           
          <Row className="mt-5 sizeBody" style={{display: display ? 'flex' : 'none'}}>
            
            {comics && (comics.length === 0 ? <ErrorTab errorCode="no-genre" /> : comics.map(comic => (

                
                <Col key={comic.id} md={3} sm={4} xs={6} className="homeComic mb-3">
                    <ComicBlock comic={comic} showLikes={true} />
                </Col>
                
            )))}
            
            {getMore && (<Col xs={12} className="mt-5 submitButtonWrap"><button className="submitButton" disabled={btnDisabled} onClick={e => getComicDetails(Genre, orderBy, list, comics[comics.length - 1])}>Load More</button></Col>)}

            <ErrorMessage
                error={errMessage}
                visible={getFailed}
                fieldError={false}
            />

            </Row>
        </Fragment>
    )
}




export default GenreTab