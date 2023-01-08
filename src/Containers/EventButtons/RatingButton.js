import React, { Fragment, useState } from 'react'

//third party components
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal} from 'react-bootstrap'

//custom components
import readApi from '../../api/read'
import ErrorMessage from '../../components/Error/ErrorMessage'

const starValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]




const RatingButton = ({ comic, rating, user }) => {

    const [rated, setRated] = useState(user.isAuthenticated ? user.ratings[`${comic.id}`] ? true : false : null)
    const [alreadyRated, setAlreadyRated] = useState(user.isAuthenticated ? user.ratings[`${comic.id}`] ? {done : true, given : user.ratings[`${comic.id}`]} : {done : false, given : 0} : null)
    const [error, setError] = useState(false)
    const [calRating, setRating] = useState(rating)
    const [show, toggleShow] = useState(false)
    const [starChoice, chooseStar] = useState(user.isAuthenticated ? alreadyRated.given : null)


    const doNothing = () => {
        toggleShow(false)
        setRated(true)
    }

    const updateRate = async (num) => {
        const requestID = uuidv4()
        setError(false)

        try {
            await readApi.updateRate(comic.id, user.uid, num, requestID)
            setRated(true)
            toggleShow(false)

            if(alreadyRated.done) {

                setRating({
                    ...calRating, 
                    total_points : rating.total_points - alreadyRated.given + num
                }) 

            }else {

                setRating({
                    total_points : rating.total_points + num,
                    total_users : rating.total_users + 1
                })

            } 

            setAlreadyRated({
                done : true,
                given : num
            })
            
        } catch (err) {
            setError(true)
        }
        
    }


    return(
        <Fragment>

        <span><FontAwesomeIcon icon="star" /> {calRating.total_points === 0 ? "--" : (calRating.total_points / calRating.total_users).toFixed(2)}</span>
        
         {
             user.isAuthenticated && user.uid !== comic.createdBy && (

                <>

                    <Modal centered show={show} onHide={e => toggleShow(!show)} size="md">
                        <Modal.Body>
                            <div className="formBox gt-shadow text-center">

                                {
                                    rated ? (
                                        <>
                                        <h4 className="mb-5">You already Rated this Series. <br />Wanna Update your rating?</h4>
                                        <button className="submitButton" onClick={e => setRated(false)}>Yes</button>
                                        </>
                                    ) : (
                                        
                                        <>
                                        <h2>{starChoice}</h2>
                               
                                        {
                                            starValue.map(val => <span className="star" key={`point${val}`} onClick={e => chooseStar(val)}><FontAwesomeIcon icon={val <= starChoice ? "star" : ["far", "star"]}  /></span>)
                                        }
                                        <div className="mb-4">Click to choose a star rating</div>
                                        <button disabled={starChoice === 0} onClick={e => starChoice === alreadyRated.given ? doNothing() : updateRate(starChoice)} className="submitButton">send</button>
                                        
                                        </>
                                    )
                                }

                                <ErrorMessage error="Try again, something went wrong" visible={error} fieldError={true} />

                            </div>
                        </Modal.Body>
                    </Modal>


                    

                    <button onClick={e => toggleShow(true)} className={`eventButton ${rated ? "btn-danger" : "btn-outline-danger"}`}>{rated ? "Rated" : "Rate"}</button> 
                
                
                </>

             )
         }
            
            

        </Fragment>
    )
}


export default RatingButton