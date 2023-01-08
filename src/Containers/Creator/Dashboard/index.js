import React, { Fragment, useEffect, useState } from 'react'

//custom components
import comicApi from '../../../api/comic'
import ErrorTab from '../../../components/Error/ErrorTab'
import { company_full } from '../../../Helpers/statics'

//third party components
import { Tab, Tabs } from 'react-bootstrap'

//pages
import Series from './Series'
import Profile from './Profile'


const Dashboard = ({ user }) => {


    const [titles, setTitles] = useState([])
    const [errorTabMsg, setErrorTabMsg] = useState(null)


    const getComics = async (myuid) => {
        try {

            let ping = await comicApi.getComicsByUid(myuid)
            setErrorTabMsg(null)
            setTitles(ping.docs)
            
        } catch (err) {
            setErrorTabMsg(err.code)
        }
    }



    useEffect(() => {

        getComics(user.uid)

    }, [user])



    return(
        <Fragment>


            <title>Creator Dashboard | {company_full}</title>
            <meta name="robots" content="noindex" />
            <meta name="description" content="Become a Series Creator on GripToons, no matter your level of skill" />
            <meta property="og:title" content="Become a Series Creator on GripToons." />
            <meta property="og:description" content="Become a Series Creator on GripToons, no matter your level of skill. Earn money from purchases and reads." />
            <meta property="og:image" content="https://griptoons.com/img/bigRedBanner.jpg" />
            <meta property="og:url" content="https://griptoons.com/creator" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:site_name" content="GripToons Entertainment" />
            <meta name="twitter:image:alt" content="GripToons Entertainment" />

            

            <Tabs className="mainTab">
                
                <Tab eventKey="series" title="Series">
                    <Series uid={user.uid} name={user.username} titles={titles} />
                </Tab>

                <Tab eventKey="profile" title="Profile">
                    <Profile user={user} titles={titles} />
                </Tab>
                
            </Tabs>

            {errorTabMsg !== null && (<ErrorTab errorCode={errorTabMsg} />)}

            
            


        </Fragment>
    )
}



export default Dashboard