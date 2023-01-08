import React, { Fragment, useState } from 'react'

//custom coponents
import commentApi from '../../api/comment'
import LikeButton from '../EventButtons/LikeButton'
import { timeAgo } from '../../Helpers/functions'
import { TIME_ZONE } from '../../Helpers/statics'

//third party components
import { Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





const ReplyList = ({ replyData, episodeData, commentData, user }) => {

    const[deleted, setDelete] = useState(false)


    const deleteReply = async () => {
        try {

            await commentApi.deleteComment(user.uid, episodeData.createdBy, episodeData.comicID, episodeData.id, commentData.id, replyData.id, `comics/${episodeData.comicID}/episodes/${episodeData.id}/comments/${commentData.id}/reply/${replyData.id}`)
            setDelete(true)
            
        } catch (err) {
            
        }
    }


    return(
        <Fragment>

            {!deleted && (

                <div className="commentBox mb-1 pb-2 pt-3">   
                    <strong>{replyData.poster[0]} {replyData.poster[1] === episodeData.createdBy && <Badge pill variant="success">Creator</Badge>}</strong>
                    <p>{replyData.message}</p>

                    <div className="commentAction">
                        <span className="mr-3">
                            {timeAgo(replyData.created - TIME_ZONE)}
                        </span>
                        <span className="mr-3">
                            <LikeButton creator={null} comicID={episodeData.comicID} episodeID={episodeData.id} commentID={commentData.id} replyID={replyData.id} user={user} likes={replyData.likes} type="reply" access={user.isAuthenticated ? true : false} />
                        </span>

                        {/* <span className="mr-3">
                            <button>Report</button>
                        </span> */}

                        <span className="float-right ml-3">
                            {user.isAuthenticated && user.uid === replyData.poster[1] && (<button onClick={e => deleteReply()}><FontAwesomeIcon icon="trash" /></button>)}
                        </span>
                    </div>

                    
                </div>

            )}

            

        </Fragment>
    )
}



export default ReplyList