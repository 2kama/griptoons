import React, { Fragment } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

//custom components
import Authenticate from '../../components/Authenticate'
import Header from '../../components/Layouts/Header'
import { company_full } from '../../Helpers/statics'
import VerifyEmail from '../../components/Widgets/VerifyEmail'

//pages
import Account from './Account'
import Payments from './Payments/'

//third party components
import { Container, Row } from 'react-bootstrap'
import Footer from '../../components/Layouts/Footer'




const Options = () => {


    const { user, isLoading } = useSelector(state => ({
        user : state.user,
        isLoading : state.user.isLoading,
    }), shallowEqual)



    return(
        <Fragment>

            <title>User Options | {company_full}</title>
            <meta name="robots" content="noindex" />
            <meta name="description" content="Become a Series Creator on GripToons, no matter your level of skill" />
            <meta property="og:title" content="Become a Series Creator on GripToons." />
            <meta property="og:description" content="Become a Series Creator on GripToons, no matter your level of skill. Earn money from purchases and reads." />
            <meta property="og:image" content="https://griptoons.com/img/bigRedBanner.jpg" />
            <meta property="og:url" content="https://griptoons.com/creator" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:site_name" content="GripToons Entertainment" />
            <meta name="twitter:image:alt" content="GripToons Entertainment" />
            <Authenticate inside={true} strict={true} />

            {
                !isLoading && user.isAuthenticated && !user.emailVerified && <VerifyEmail userEmail={user.email} />
            }

            <Header />


            <Container>

                <Row className="mt-5">

                    {
                        !isLoading && user.isAuthenticated && (
                            <>
                            <Payments user={user} />
                            <Account user={user} />

                            
                            </>
                        )
                    }

                </Row>


            

            </Container>


            <Footer />
            

        </Fragment>
    )
}



export default Options