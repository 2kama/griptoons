import React, { Fragment, useState, useEffect } from 'react'


import { Col, Row } from 'react-bootstrap'
import Slider from "react-slick"
import readApi from '../../../api/read'
import ComicBlock from '../../../components/ComicBox/ComicBlock'


const PopularView = () => {

    const [titles, setTitles] = useState([])


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

      

      const getStat = async (item) => {
          try {

            const gett = await readApi.getComicStats(item.id)
            let fullData = titles
            fullData.push({...item, ...gett.data()})
            setTitles([...fullData])

            localStorage.gripToonsPopularJSONData = JSON.stringify([...fullData])
              
          } catch (err) {
              
          }
      }
  

      const getPopularData = async () => {

            try {

                const gett = await readApi.showPopular()


                if(gett.docs.length <= 3) {
                    localStorage.gripToonsPopularSuffleTimer = new Date().getTime() + 21600000
                }else {
                    localStorage.gripToonsPopularSuffleTimer = new Date().getTime() + 86400000
                }

                if(gett.docs.length === 0) {
                    setTitles([])
                    localStorage.gripToonsPopularJSONData = JSON.stringify([])
                }else {


                    gett.docs.map(dat => getStat(dat.data()))

                    
                    
                }

                
            } catch (err) {
                
            }

      }


      const loadData = () => {

        if(localStorage.gripToonsPopularSuffleTimer === undefined || localStorage.gripToonsPopularSuffleTimer === null || localStorage.gripToonsPopularSuffleTimer <= new Date().getTime()) {
            
            getPopularData()

        }else {

            setTitles(JSON.parse(localStorage.gripToonsPopularJSONData))
        }

      }

   

      useEffect(() => {

        loadData()

      },[])


    return (
        <Fragment>

       

                    <Row>
                        <Col className="scrollHead mt-5" md={12}>
                            <h4>Check Out</h4>
                        </Col>

                      
                            {
                                titles.length > 0 && (

                                    <Slider {...settings}>

                                        {
                                                    
                                            titles.map(mainData => (
                                                <div key={mainData.id}>
            
                                                    <div className="homeComic mb-3">
                                                        <ComicBlock comic={mainData} showLikes={true} />
                                                    </div>
            
                                                </div>
                                            ))
            
                                                
                                        }

                                    </Slider>

                                )
                            }
                            

                        
                    </Row>

              
        </Fragment>
    )
}


export default PopularView