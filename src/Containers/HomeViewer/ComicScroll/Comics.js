import React, { Fragment, useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

//custom components
import Authenticate from '../../../components/Authenticate/'
import Header from '../../../components/Layouts/Header'
import VerifyEmail from '../../../components/Widgets/VerifyEmail'
import { GENRE, company_full } from '../../../Helpers/statics'

//third party components
import { Container, Row, Dropdown, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//pages
import Footer from '../../../components/Layouts/Footer'
import GenreTab from './GenreTab'

const Comics = () => {


    const[orderBy, setOrderBy] = useState("subscribe")
    const[genre, setGenre] = useState(GENRE[0])

    const { user, isLoading } = useSelector(state => ({
        user : state.user,
        isLoading : state.user.isLoading,
    }), shallowEqual)




    return (
        <Fragment>

            <title>Series Collections | {company_full}</title>
            <meta name="description" content="Read wonderful comic series from your favorite creators" />
            <meta name="keywords" content="GripToons, Nigerian comics, Nigerian webtoons" />
            <meta property="og:title" content="Read wonderful comic series from your favorite creators" />
            <meta property="og:description" content="Different Genres and Creators to pick from." />
            <meta property="og:image" content="https://griptoons.com/img/bigRedBanner.jpg" />
            <meta property="og:url" content="https://griptoons.com/comics" />
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
                                    {<FontAwesomeIcon icon={genre[2][0]} />}<span>{genre[0]}</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        GENRE.map((item, index) => <Dropdown.Item onClick={e => setGenre(GENRE[index])} key={item[1]} eventKey={item[1]}>
                                            <FontAwesomeIcon icon={item[2][0]} />
                                            <span>{item[0]}</span>
                                        </Dropdown.Item>)
                                    }
                                    
                                </Dropdown.Menu>
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

                    
                    {GENRE.map(item =>  <GenreTab key={item[1]} Genre={item[1]} orderBy={orderBy} display={genre === item} /> )}
                    


                </Container>
                


                <Footer />
            
           
            
        </Fragment>
    )
}


export default Comics