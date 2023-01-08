
import React, { Fragment } from 'react'

//third party components
import { Col } from 'react-bootstrap'

//media
import defaultSquare from '../../../../img/default-square.png'

const SeriesBlock = ({ comic }) => {


    return (
        <Fragment>
            
            
            <Col md={3} sm={6} xs={6} className="canvasComic mb-4">
                <a href={`/creator/canvas/${comic.id}`}>
                    <div className="canvasImage gt-shadow" style={{"backgroundImage": comic.data().images.thumbnail === "" ? `url(${defaultSquare})` : `url(${comic.data().images.thumbnail})`}}></div>
                </a>
                <div className="comicName">{comic.data().name === "" ? "??????" : comic.data().name}</div>
                
            </Col>

    

        </Fragment>
    )
}




export default SeriesBlock