
import React, { Fragment } from 'react'

//third party components
import { Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'

//custom components
import { shrinkNumber } from '../../Helpers/functions'
import { TIME_ZONE } from '../../Helpers/statics'

//media
import defaultSquare from '../../img/default-square.png'

const ComicBlock = ({ comic, showLikes, showDate }) => {


    return (
        <Fragment>
            {
                comic && (
                   
                    <>
                        <a href={`/comics/${comic.genre}/${comic.url}`}>
                            <div className="homeComicImage gt-shadow" style={{backgroundImage : comic.images.thumbnail === "" ? `url(${defaultSquare})` : `url(${comic.images.thumbnail})`}}></div>
                        </a>
                        <div className="hanger">
                            <div className="small-text">{comic.creatorName}</div>
                            <div className="title-text"><a href={`/comics/${comic.genre}/${comic.url}`}>{comic.name}</a></div>
                            <div className="stat-text">

                                {
                                    showLikes && (<><FontAwesomeIcon icon="heart" /> {shrinkNumber(comic.likes)}</>)
                                }

                                {
                                    showDate && (<>Updated {moment((comic.updated - TIME_ZONE)).format('ll')}</>)
                                }

                                {comic.completed ? <Badge pill variant="danger" className="float-right">completed</Badge> : null}
                                
                            </div>
                        </div>
                    </>

                  
                )
            }
            
        </Fragment>
    )
}




export default ComicBlock