import React, { Fragment, useEffect, useState } from 'react'


//third party components
import { v4 as uuidv4 } from 'uuid';
import { Row, Col } from 'react-bootstrap';


//pages
import CommentList from './CommentList'
import CommentForm from './CommentForm'


//custom components
import commentApi from '../../api/comment'
import ErrorTab from '../../components/Error/ErrorTab';
import ErrorMessage from '../../components/Error/ErrorMessage';
import { thousands_separators } from '../../Helpers/functions';
import { TIME_ZONE } from '../../Helpers/statics'




const Comment = ({ episodeData, user, listNum }) => {


    const[comments, setComments] = useState()
    const[newComment, setNewComment] = useState([])
    const[sortBy, setSortBy] = useState(["likes", "desc"])

    const [submissionFailed, setFailed] = useState(false);
    const [errMessage, setErrMessage] = useState("")
    const [message, setMessage] = useState("")

    


    const getComments = async (comicID, episodeID, num, orderBy, start = null) => {

        setSortBy(orderBy)

        start ? console.log() : setComments(null)

        try {

            const gett = await commentApi.getComments(comicID, episodeID, num, orderBy, start)
            start ? setComments([...comments, ...gett.docs]) : setComments(gett.docs)
            
        } catch (err) {
            console.log(err)
        }
    }


    const change = (e) => {

        setMessage(e.target.value)

    }

    


    const submitForm = async (message) => {

        const commentID = uuidv4()
        const poster = [user.username, user.uid]
        setFailed(false)

        if(message === "") {

            

        }else {

            try {

                await commentApi.postComment(episodeData.createdBy, episodeData.comicID, episodeData.id, commentID, null, poster, message, `comics/${episodeData.comicID}/episodes/${episodeData.id}/comments/${commentID}`)
                setNewComment([...newComment, {
                    id: commentID,
                    poster,
                    message,
                    likes: 0,
                    total_reply: 0,
                    created: new Date().getTime() + TIME_ZONE
                }])

                setMessage("")
    
               
                
            } catch (err) {
                setErrMessage(err.code)
                
                setFailed(true)
            }

        }

        

    }


    useEffect(() => {

        getComments(episodeData.comicID, episodeData.id, listNum, ["likes", "desc"])

    }, [episodeData.comicID, episodeData.id, listNum])


    return (
        <Fragment>


            <Row>

                <Col xs={6} className="">
                    <h6>{thousands_separators(episodeData.total_comments + newComment.length)} Comments</h6>
                </Col>

                <Col xs={6} className="text-right">

                    {
                        episodeData.total_comments > 3 && (
                            <div className="arrange">
                                <span className={`pointer pr-2 ${sortBy[0] === "likes" && 'text-danger'}`} onClick={e => getComments(episodeData.comicID, episodeData.id, 10, ["likes", "desc"])}>by Likes</span>
                                <span>|</span>
                                <span className={`pointer pl-2 ${sortBy[0] !== "likes" && 'text-danger'}`} onClick={e => getComments(episodeData.comicID, episodeData.id, 10, ["created", "asc"])}>by Date</span>
                            </div>
                        )
                    }
                    

                </Col>

                <Col xs={12} className="">

                        {
                            user.isAuthenticated ? 
                            <>
                                <CommentForm text={message} textCount={message.length} maxlength={500} post={submitForm} change={change} />
                                <ErrorMessage error={errMessage} visible={submissionFailed} fieldError={true} />
                            </>
                            
                            : (
                                <ErrorTab errorCode="You need to be logged in to comment" />
                            )
                        }

                </Col>


                <Col xs={12} className="">

                    {newComment.slice(0).reverse().map(comment => <CommentList key={comment.id} commentData={comment} episodeData={episodeData} user={user}  top={false} listNum={10} />)}
                    {comments && comments.map((comment, idx) => <CommentList key={comment.id} commentData={comment.data()} episodeData={episodeData} user={user} top={sortBy[0] === "likes" ? idx <= 2 ? true : false : false} listNum={10} />)}

                    

                </Col>


                <Col xs={12} className="text-center mt-4 mb-5">
                    {comments && episodeData.total_comments > comments.length && (<button onClick={e => getComments(episodeData.comicID, episodeData.id, 10, sortBy, comments[comments.length - 1])}>load more...</button>)}
                </Col>
            </Row>

                


                
            

            
            
            

            

            
            

            

            

        </Fragment>
    )
}





export default Comment