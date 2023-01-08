import React, { Fragment, useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'



//third party components
import { Navbar, Nav, NavDropdown, Container, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


//custom components
import authApi from '../../api/auth'

//media
import logoImg from '../../img/logo.svg'


//pages
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import ForgotPassword from '../Auth/ForgotPassword'
import Search from '../Widgets/Search'
import NoticeBanner from '../Widgets/NoticeBanner'


const Header = () => {


    const [show, setShow] = useState(false)
    const [formType, setFormType] = useState("showLogin")
    const handleShow = () => setShow(!show)


    const { user, isLoading } = useSelector(state => ({
        user : state.user,
        isLoading : state.user.isLoading,
    }), shallowEqual)



    return(
        <Fragment>
            
            {
                !isLoading && !user.isAuthenticated && (
                    <Modal show={show} onHide={e => handleShow()} size="md" centered>

                        <Modal.Body>

                            <div className="AuthSlider">
                            <div className="AuthRow">

                                {
                                    formType === "showLogin" && (
                                        <div className="AuthContent">
                                            <Login setFormType={setFormType} />
                                        </div>
                                    )
                                }

                                {
                                    formType === "showRegister" && (
                                        <div className="AuthContent">
                                            <Register setFormType={setFormType} />
                                        </div>
                                    )
                                }

                                {
                                    formType === "showForgotPassword" && (
                                        <div className="AuthContent">
                                            <ForgotPassword setFormType={setFormType} />
                                        </div>
                                    )
                                }
                                    

                            </div>
                                

                            </div>

                        </Modal.Body>
                    </Modal>
                )
            }

            


     

            <Navbar collapseOnSelect expand="lg" className="grip-header">
              <Container fluid>
                <Navbar.Brand href="/">
                    <img src={logoImg} alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="mr-auto">
                        <Nav.Link href="/comics">Genres</Nav.Link>

                        {
                            !isLoading && user.isAuthenticated && <Nav.Link href="/creator">Creator</Nav.Link>
                        }
                        
                        
                    </Nav>

                    <Nav className="mr-auto">
                        <Search />
                    </Nav>

                    <Nav>

                    

                    {
                        !isLoading && (
                            user.isAuthenticated ? (
                                <>

                                    
                                    <Navbar.Text><FontAwesomeIcon icon="coins" /> {user.coin}</Navbar.Text>
                                    <NavDropdown title={user.username} id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/options">Options</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#" onClick={e => authApi.logout()}>Logout</NavDropdown.Item>
                                    </NavDropdown>

                                    
                                </>
                            ) : (
                                <Nav.Link onClick={e => handleShow()} href="#" rel="no-opener no-referrer">Login</Nav.Link>
                            )
                        )
                    }

                        
                    </Nav>


                </Navbar.Collapse>
                </Container>
            </Navbar>

            <NoticeBanner />
            
        </Fragment>
    )
}


export default Header