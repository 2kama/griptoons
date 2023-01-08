import React, { Fragment, useEffect, useState } from 'react'

//third party components
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//custom components
import commentApi from '../../api/comment'
import readApi from '../../api/read'
import { thousands_separators } from '../../Helpers/functions'




const LikeButton = ({ creator, comicID, episodeID, commentID, replyID, user, likes, type, access }) => {

    const[likeController, setLikes] = useState(likes)
    const[liked, setLiked] = useState(null)


    let likeStatus = null

   
    useEffect(() => {

        if(access) {

            switch (type) {
                case "episode":
                    setLiked(user.episodeLiked[`${comicID}_${episodeID}`] ? true : false)
                    break
                case "comment":
                    setLiked(user.commentLiked[`${comicID}_${episodeID}_${commentID}`] ? true : false)
                    break
                case "reply":
                    setLiked(user.replyLiked[`${comicID}_${episodeID}_${commentID}_${replyID}`] ? true : false)
                    break
                default:
                    return null
            }

        }

        

    }, [access, comicID, episodeID, commentID, replyID, user, type])

    


    const add = async (action) => {

        if(action === likeStatus) {

        }else {

            likeStatus = action
            const requestID = uuidv4()
            
            try {

                switch (type) {
                    case "episode":
                        await readApi.likeEpisode(creator, comicID, episodeID, user.uid, requestID)
                        break

                    default:
                        await commentApi.likeComment(comicID, episodeID, commentID, replyID, user.uid, requestID)
                        break
                }

                
                
                action === 1 ? setLiked(true) : setLiked(false)
                action === 1 ? setLikes(likeController + 1) : setLikes(likeController - 1)
                
            } catch (err) {
                
            }

        }

        
    }



    return(
        <Fragment>

           

            {
                !access ? (
                    <>
                    <FontAwesomeIcon icon={["far", "heart"]} /> <span>{thousands_separators(likeController)}</span>
                    </>
                ) : (
                            <button className="eventButton" onClick={e => liked ? add(-1) : add(1)}>
                                <FontAwesomeIcon icon={liked ? "heart" : ["far", "heart"]} /> {thousands_separators(likeController)}
                            </button>
                     
                    
                )
            }

        </Fragment>
    )
}



export default LikeButton