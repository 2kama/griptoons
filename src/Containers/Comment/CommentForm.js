
import React, { Fragment } from 'react'

//custom components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//third party components



const CommentForm = ({ maxlength, textCount, text, post, change }) => {




    return(
        <Fragment>

            <div className="commentForm">
                <textarea onChange={e => change(e)} value={text} maxLength={maxlength} className="p-3" rows="3" placeholder="up to 500 characters..."></textarea>
                <button onClick={e => post(text)}>
                    <FontAwesomeIcon icon="arrow-circle-right" />
                </button>
                <div className="commentFoot text-right">
                    {textCount}/{maxlength}
                </div>
            </div>

        </Fragment>
    )
}




export default CommentForm