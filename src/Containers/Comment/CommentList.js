import React, { Fragment, useEffect, useState } from 'react'

//third party components
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Col } from 'react-bootstrap';

//custom components
import commentApi from '../../api/comment'
import ErrorMessage from '../../components/Error/ErrorMessage';
import LikeButton from '../EventButtons/LikeButton';
import { thousands_separators, timeAgo } from '../../Helpers/functions';
import { TIME_ZONE } from '../../Helpers/statics'


//pages
import ReplyList from './ReplyList';
import CommentForm from './CommentForm'






const CommentList = ({ commentData, episodeData, user, top, listNum }) => {

    
    const[replyController, setReplyController] = useState(commentData.total_reply)
    const[replies, setReplies] = useState()
    const[newReply, setNewReply] = useState([])
    const[deleted, setDelete] = useState(false)

    

    const [submissionFailed, setFailed] = useState(false);
    const [errMessage, setErrMessage] = useState("")
    const[openReply, setOpenReply] = useState(false)
    const [message, setMessage] = useState("")

    


    const deleteComment = async () => {
        try {

            await commentApi.deleteComment(user.uid, episodeData.createdBy, episodeData.comicID, episodeData.id, commentData.id, null, `comics/${episodeData.comicID}/episodes/${episodeData.id}/comments/${commentData.id}`)
            setDelete(true)
            
        } catch (err) {
            
        }
    }


    const change = (e) => {

        setMessage(e.target.value)

    }


    const getReplies = async (comicID, episodeID, commentID, num, start = null) => {

        start ? console.log() : setReplies(null)

        try {

            const gett = await commentApi.getReplies(comicID, episodeID, commentID, num, start)
            start ? setReplies([...replies, ...gett.docs]) : setReplies(gett.docs)
            
        } catch (err) {
            
        }
    }


    const submitForm = async ( message ) => {

        const replyID = uuidv4()
        const poster = [user.username, user.uid]
        setFailed(false)


        if(message === "") {

        }else {

            try {

                await commentApi.postComment(episodeData.createdBy, episodeData.comicID, episodeData.id, commentData.id, replyID, poster, message, `comics/${episodeData.comicID}/episodes/${episodeData.id}/comments/${commentData.id}/reply/${replyID}`)
                
                setNewReply([...newReply, {
                    id: replyID,
                    poster,
                    message,
                    likes: 0,
                    created: new Date().getTime() + TIME_ZONE
                }])
    
                setMessage("")
    
                setReplyController(replyController + 1)
                
            } catch (err) {
                setFailed(true)
                setErrMessage(err.code)
            }

        }

        
    }


    useEffect(() => {
        getReplies(episodeData.comicID, episodeData.id, commentData.id, listNum)
    }, [episodeData.comicID, episodeData.id, commentData.id, listNum])


    return(

        <Fragment>
            {!deleted && ( 
            <>
            <div className="commentBox pb-2 mb-1 pt-3">
                <strong>{commentData.poster[0]} {commentData.poster[1] === episodeData.createdBy && <Badge pill variant="success">Creator</Badge>} {top && <Badge pill variant="danger">TOP</Badge>}</strong>
                <p>{commentData.message}</p>
                
                <div className="commentAction">
                    <span className="mr-3">
                        {timeAgo(commentData.created - TIME_ZONE)}
                    </span>
                    <span className="mr-3">
                        <LikeButton creator={null} comicID={episodeData.comicID} episodeID={episodeData.id} commentID={commentData.id} replyID={null} user={user} likes={commentData.likes} type="comment" access={user.isAuthenticated ? true : false} />
                    </span>

                    {/* <span className="mr-3">
                        <button>Report</button>
                    </span> */}

                    <span className="mr-3">
                        <button onClick={e => setOpenReply(!openReply)}><FontAwesomeIcon icon={["far", "comment"]} /> {thousands_separators(replyController)} <FontAwesomeIcon icon={openReply ? "arrow-up" : "arrow-down"} /></button> 
                    </span>

                    <span className="float-right ml-3">
                        {user.isAuthenticated && user.uid === commentData.poster[1] && (<button onClick={e => deleteComment()}><FontAwesomeIcon icon="trash" /></button>)}
                    </span>
                    
                </div>
            
                
            
                <div className="replyArea pl-5 pt-3" style={{display : openReply ? "block" : "none"}}>

                        {replies && replies.map(reply => <ReplyList key={reply.id} commentData={commentData} episodeData={episodeData} user={user} replyData={reply.data()} />)}
                        {newReply.map(reply => <ReplyList key={reply.id} commentData={commentData} episodeData={episodeData} replyData={reply} user={user} />)}
                        
                        <Col xs={12} className="float-left text-center mt-3 mb-3">
                            {replies && commentData.total_reply > replies.length && (<button onClick={e => getReplies(episodeData.comicID, episodeData.id, commentData.id, 10, replies[replies.length - 1])}>load more...</button>)}
                        </Col>
                        

                        {
                            user.isAuthenticated &&
                            <>
                                <CommentForm text={message} textCount={message.length} maxlength={500} post={submitForm} change={change} />
                                <ErrorMessage error={errMessage} visible={submissionFailed} fieldError={true} />
                            </>
                            
                        }


                </div>

            
            </div>


            

          </>
        )}
        </Fragment>
    )
}



export default CommentList