import React, { Fragment } from 'react'

//third party components
import { Table } from 'react-bootstrap'

//custom components
import ErrorTab from '../../../../components/Error/ErrorTab'
import Loading from '../../../../components/Widgets/Loading'
import EpisodeBlock from './EpisodeBlock'



const EpisodeCase = ({ episodes, published }) => {


    return (
        <Fragment>
            { episodes ? (

                episodes.length !== 0 ? 
                <Table responsive="md" className="gt-table">
                    <tbody>
                        {episodes.map(item =>  item.data().published === published ? <EpisodeBlock episode={item.data()} published={published} key={item.id}  /> : null)} 
                    </tbody> 
                </Table>  :  <ErrorTab errorCode="no-episodes" />

            ) : <Loading />}
        </Fragment>
    )
}





export default EpisodeCase