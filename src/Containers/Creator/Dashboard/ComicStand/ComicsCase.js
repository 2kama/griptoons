import React, { Fragment } from 'react'


//custom component
import ErrorTab from '../../../components/ErrorTab'
import Loading from '../../../components/Loading'

//pages
import ComicBlock from './ComicBlock'

//third party components



const ComicCase = ({ comics }) => {


   

    return (
        <Fragment>
            { comics ? (

                comics.length !== 0 ? comics.map(item => <ComicBlock comic={item} key={item.id} />) : <ErrorTab errorCode="no-comics" />

            ) : <Loading />}
        </Fragment>
    )
}




export default ComicCase