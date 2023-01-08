import React, { Fragment, useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

//custom components
import Authenticate from '../../../components/Authenticate/'
import Header from '../../../components/Layouts/Header'
import VerifyEmail from '../../../components/Widgets/VerifyEmail'
import { GENRE, company_full } from '../../../Helpers/statics'
import {  getIndexOfK } from '../../../Helpers/functions'
import Footer from '../../../components/Layouts/Footer'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Dropdown, Col } from 'react-bootstrap'

//pages
import GenreTab from './GenreTab'
import PageNotFound from '../../../components/Widgets/PageNotFound'

const Genre = ({ match }) => {


    const[orderBy, setOrderBy] = useState("subscribe")

    const K = getIndexOfK(GENRE, match.params.genre)

    const { user, isLoading } = useSelector(state => ({
        user : state.user,
        isLoading : state.user.isLoading,
    }), shallowEqual)


    return (
        <Fragment>

            {
                K === undefined ? <PageNotFound /> : (

                 <Fragment>   

                    <title>Series Collections | {GENRE[K[0]][0]} Series | {company_full}</title>
                    <meta name="description" content="Read wonderful comic series from your favorite creators" />
                    <meta name="keywords" content="GripToons, Nigerian comics, Nigerian webtoons" />
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


                    <Container className="mainContainer">

                        <Row>

                            <Col xs={6}>

                                <Dropdown>
                                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                                        {<FontAwesomeIcon icon={GENRE[K[0]][2][0]} />}<span>{GENRE[K[0]][0]}</span>
                                    </Dropdown.Toggle>
                                </Dropdown> 

                            </Col>

                            <Col xs={6} className="text-right">

                                <Dropdown>
                                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                                        <span>{orderBy === "likes" ? "by Likes" : "by Popularity"}</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={e => setOrderBy("likes")} eventKey="likeKey">
                                            by Likes
                                        </Dropdown.Item>

                                        <Dropdown.Item onClick={e => setOrderBy("subscribe")} eventKey="subscribeKey">
                                            by Popularity
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </Col>

                        </Row>


                        <GenreTab Genre={match.params.genre} orderBy={orderBy} display={true} />

                    </Container>

                  </Fragment>

                )
            }


            

            
            
            <Footer />
            
            
        </Fragment>
    )
}


export default Genre