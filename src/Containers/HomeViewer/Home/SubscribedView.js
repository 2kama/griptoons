import React, { Fragment, useEffect, useState } from 'react'


import { Col, Row } from 'react-bootstrap'
import Slider from "react-slick"


import readApi from '../../../api/read'
import ComicBlock from '../../../components/ComicBox/ComicBlock'

const SubscribedView = ({ subscription }) => {

    const [subData, addSubData] = useState([])



    const settings = {
        className: "boxSlide",
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 500,
        arrows: true,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
            }
            }
        ]
      };



      const doNothing = () => {}


      const getDATA = async (item) => {

        const oldData = subData

        try {

            const gett = await readApi.getComicData(item)
            oldData.push(gett.data())
            addSubData([...oldData])

            
        } catch (err) {
            
        }

      }


      const checkSub = () => {

        if(subscription !== null && subscription !== undefined) {
            if(Object.keys(subscription).length > 0) {


                Object.keys(subscription).map(sub => subscription[`${sub}`] === true ? getDATA(sub) : doNothing())
    
             }

        }

        

      }


      useEffect(() => {

      
        checkSub()
         

      }, [subscription])


    return (
        <Fragment>
                
                    <Row>
                        <Col className="scrollHead mt-5" md={12}>
                            <h4>Subsribed Series</h4>
                        </Col>

                        {
                            subData.length > 0 ? (


                                <Slider {...settings}>

                                {
                                                   
                                        subData.map(mainData => (
                                            <div key={mainData.id}>

                                                <div className="homeComic mb-3">
                                                    <ComicBlock comic={mainData} showDate={true} />
                                                </div>

                                            </div>
                                        ))

                                    
                                }

   

                            </Slider>



                            ) : (
                                
                                <Col md={12}>
                                    No subscribed Series 
                                </Col>
                            )
                        }

                            

                        
                    </Row>

              
        </Fragment>
    )
}


export default SubscribedView