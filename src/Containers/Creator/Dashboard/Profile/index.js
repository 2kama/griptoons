import React, { Fragment, useEffect, useState } from 'react'

//custom components
import profileApi from '../../../../api/profile'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tabs, Tab, Row, Col, Table } from 'react-bootstrap'

//pages
import ComicStat from './ComicStat'
import PayStud from './PayStud'




const Profile = ({ user, titles }) => {

  const [averages, setAvg] = useState()
    


  const getGlobalVar = async () => {

    try {

        const gett = await profileApi.getAverageData()
        setAvg(gett.data().earnings)
        
    } catch (err) {
        
    }
   

  }




   useEffect(() => {

     getGlobalVar()


   }, [user])



    return(
        <Fragment>

           <Row>

              <Col md={12}>

                <Tabs className="mainTab mini mt-5">

                    {
                      averages && titles.map(title => (

                          <Tab key={title.id} eventKey={title.id} title="a">
                              <ComicStat title={title.data()} user={user} averages={averages} />
                          </Tab>

                      ))
                    }
                  
                </Tabs>


                

              </Col>




              


              <Col md={8}>

                  
                <div className="col-md-12 float-left mt-4 pt-4 pl-0 pr-0">

                    <h5 className="section-header"><FontAwesomeIcon icon="money-check-alt" /> Payments</h5>

                    <Table responsive="md" className="gt-table mb-0">

                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Period</th>
                              <th>Amount Paid</th>
                              <th>Bank Name</th>
                              <th>Account Name</th>
                              <th>Account No</th>
                              <th></th>
                              </tr>
                          </thead>


                    </Table>

                      <div className="vertical-scroll mb-4" style={{maxHeight : "400px"}}>
                        <Table responsive="md" className="gt-table">


                          <tbody>
                              
                              {
                                user.paymentInvoice.length === 0 ? (
                                  <tr>
                                    <td className="text-center">No Data</td>
                                  </tr>
                                ) : (

                                  user.paymentInvoice.slice(0).reverse().map((Inv, index) => <PayStud key={`my${index}`} Inv={Inv} index={index} />)

                                )
                              }
                          
                              
                              
                          </tbody>
                        </Table>
                        </div>

                    </div>

                  

              </Col>

           </Row>

       
            

        </Fragment>
    )
}





export default Profile