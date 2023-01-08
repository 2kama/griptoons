import React, { Fragment } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

//custom components
import Authenticate from '../../components/Authenticate/'
import ErrorTab from '../../components/Error/ErrorTab'
import Header from '../../components/Layouts/Header'
import VerifyEmail from '../../components/Widgets/VerifyEmail'

//third party components
import { Container } from 'react-bootstrap'

//pages
import BecomeACreator from './BecomeACreator/'
import Dashboard from './Dashboard/'
import Footer from '../../components/Layouts/Footer'





const Creator = () => {

    const { user, isLoading } = useSelector(state => ({
        user : state.user,
        isLoading : state.user.isLoading,
    }), shallowEqual)

    return(
        <Fragment>
            <Authenticate inside={true} strict={true} />
            {
                !isLoading && !user.emailVerified && <VerifyEmail userEmail={user.email} />
            }
            
            <Header />
            
            
            <Container className="mainContainer sizeBody">
                {
                    !isLoading && user.role && (user.role === "reader" ? <BecomeACreator uid={user.uid} emailVerified={user.emailVerified} /> : <Dashboard user={user} />)
                }

                {
                    !isLoading && user.role === undefined && (<ErrorTab errorCode="no-internet" />)
                }
          </Container>

          <Footer />
        </Fragment>
    )
}


export default Creator