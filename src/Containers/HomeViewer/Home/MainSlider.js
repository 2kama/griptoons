import React, { Fragment } from 'react'


import { Col, Row } from 'react-bootstrap'
import Slider from "react-slick"



import webOne from '../../../img/web/slide01.png'
import mobileOne from '../../../img/mobile/slide01.png'

const MainSlider = () => {



    const settings = {
        className: "mainSliderPanel",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 1,
        speed: 500,
        dots: true,
        autoplaySpeed: 4000,
        autoplay: true,
        pauseOnHover: true,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                dots: false
            }
            }
        ]
      };


      const settings2 = {
        className: "mainSliderPanel2",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 1,
        speed: 500,
        dots: true,
        autoplaySpeed: 4000,
        autoplay: true,
        pauseOnHover: true,
        
      };


    return (
        <Fragment>

                    <Row>
                        <Col md={12} className="d-none d-sm-block">

                            <Slider {...settings}>

                                <div>
                                    <a href="/comics">
                                    <img src={webOne} alt="dance01" />
                                    </a>
                                    
                                </div>


                            </Slider>

                        </Col>


                        <Col xs={12} className="d-block d-sm-none">

                            <Slider {...settings2}>

                                <div>
                                    <a href="/comics">
                                        <img src={mobileOne} alt="dance01"/>
                                    </a>
                                </div>

                            </Slider>

                        </Col>
                    </Row>

              
        </Fragment>
    )
}


export default MainSlider