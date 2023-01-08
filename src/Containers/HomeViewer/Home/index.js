import React, { Fragment } from 'react'
import { useSelector, shallowEqual } from 'react-redux'


import { Container } from 'react-bootstrap'

import { company_full } from '../../../Helpers/statics'

import Authenticate from '../../../components/Authenticate/'
import Footer from '../../../components/Layouts/Footer'

import Header from '../../../components/Layouts/Header'
import VerifyEmail from '../../../components/Widgets/VerifyEmail'


import SubscribedView from './SubscribedView'
import MainSlider from './MainSlider'
import PopularView from './PopularView'



const Home = () => {


    const { user, isLoading } = useSelector(state => ({
        user : state.user,
        isLoading : state.user.isLoading,
    }), shallowEqual)



    


    return (
        <Fragment>

                    <title>Home | {company_full}</title>
                    <meta name="description" content="Read wonderful comic series from your favorite creators" />
                    <meta name="keywords" content="GripToons, Nigerian comics, free comics, read, comics, Nigerian web series" />
                    <meta property="og:title" content="Read wonderful comic series from your favorite creators" />
                    <meta property="og:description" content="Different Genres and Creators to pick from." />
                    <meta property="og:image" content="https://griptoons.com/img/bigRedBanner.jpg" />
                    <meta property="og:url" content="https://griptoons.com" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta property="og:site_name" content="GripToons Entertainment" />
                    <meta name="twitter:image:alt" content="GripToons Entertainment" />



            <Authenticate inside={true} strict={false} />
            {
                !isLoading && user.isAuthenticated && !user.emailVerified && <VerifyEmail userEmail={user.email} />
            }
            <Header />

              <Container fluid className="p-0">

                    <MainSlider />

              </Container>


                <Container className="mainContainer">

                    {!isLoading && user.isAuthenticated && <SubscribedView subscription={user.subscription} />}

                    <PopularView />

                </Container>



            <Footer />
        </Fragment>
    )
}


export default Home