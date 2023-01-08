import React, { Fragment } from 'react'

//third party components
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

//media
import logoImg from '../../img/logo2.svg'




const Header2 = ({ name, genre, url, title, page, noOfEpisodes }) => {

    const tit = `: ${title}`
    const pag = `#${page}`

    let epid = []

    for(let i = 0; i < noOfEpisodes; i++) {
        epid[i] = i + 1
    }

    return(
        <Fragment>
            
            <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" className="grip-header dark">
              <Container fluid>
                <Navbar.Brand href="/">
                    <img src={logoImg} alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="mr-auto">
                        <Nav.Link href={`/comics/${genre}/${url}`} rel="no-opener no-referrer">{name}</Nav.Link>
                        <Nav.Link href="#" rel="no-opener no-referrer">{tit}</Nav.Link>
                        
                    </Nav>
                    <Nav className="mr-auto">
                        
                      
                        {
                            page !== 1 && <Nav.Link href={`/comics/${genre}/${url}/${page - 1}`} rel="no-opener no-referrer"> &lt; Prev </Nav.Link>
                        }

                        <NavDropdown title={pag} id="collasible-nav-dropdown">

                            {
                                epid.map(pager => <NavDropdown.Item key={`page${pager}`} href={`/comics/${genre}/${url}/${pager}`}>#{pager}</NavDropdown.Item>)
                            }
                            
                        </NavDropdown>

                        {
                            page < noOfEpisodes && <Nav.Link href={`/comics/${genre}/${url}/${page + 1}`} rel="no-opener no-referrer"> Next &gt; </Nav.Link>
                        }
                        
                    </Nav>

             


                </Navbar.Collapse>
                </Container>
            </Navbar>
            
        </Fragment>
    )
}



export default Header2