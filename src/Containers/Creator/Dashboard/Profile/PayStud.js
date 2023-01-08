import React, { Fragment, useState } from 'react'

//custom components
import { months } from '../../../../Helpers/statics'
import { thousands_separators } from '../../../../Helpers/functions'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Table } from 'react-bootstrap'



const PayStud = ({ Inv, index }) => {


    const [show, toggleShow] = useState(false)



    return(
        <Fragment>


                <Modal centered show={show} onHide={e => toggleShow(!show)} size="lg">
                        <Modal.Body>
                            <div className="formBox gt-shadow">


                                <h4 className="text-center">PayStub</h4>

                                <Table responsive="md" size="sm" striped className="gt-table mb-5">
                                    <thead>
                                        <tr>
                                            <th>GripToons Entertainment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Month</td>
                                            <td></td>
                                            <td>{months[Inv.month][1]}</td>
                                        </tr>
                                        <tr>
                                            <td>Year</td>
                                            <td></td>
                                            <td>{Inv.year}</td>
                                        </tr>
                                        {
                                            Inv.payOut ? (
                                                <tr>
                                                    <td>{Inv.accountName}</td>
                                                    <td>{Inv.bankName}</td>
                                                    <td>{Inv.accountNumber}</td>
                                                </tr>
                                            ) : (
                                                <tr>
                                                    <td>----</td>
                                                    <td>-----</td>
                                                    <td>------</td>
                                                </tr>
                                            )
                                        }
                                        
                                    </tbody>
                                </Table>

                                <Table responsive="md" hover size="sm" striped className="gt-table">

                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Quantity</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>

                                    
                                

                                    {
                                        Inv.comics.map((comic, idx) => (<tbody key={idx}>

                                            

                                                    <tr>
                                                        <th>{comic.name}</th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                    <tr>
                                                        <td>Coins</td>
                                                        <td>{thousands_separators(comic.coins)}</td>
                                                        <td>&#8358;{thousands_separators((comic.coinPay).toFixed(2))}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Reads</td>
                                                        <td>{thousands_separators(comic.reads)}</td>
                                                        <td>&#8358;{thousands_separators((comic.readPay).toFixed(2))}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Donations</td>
                                                        <td>----</td>
                                                        <td>&#8358;{thousands_separators((comic.donations).toFixed(2))}</td>
                                                    </tr>
                                                    <tr><td></td><td></td><td></td></tr>
                                                

                                        </tbody>))
                                    }

                                        <tbody>
                                                <tr><td></td><td></td><td></td></tr>
                                                <tr>
                                                    <td>Roll-Overs</td>
                                                    <td>From previous months</td>
                                                    <td>&#8358;{thousands_separators((Inv.rollover).toFixed(2))}</td>
                                                </tr>
                                                <tr><td></td><td></td><td></td></tr>
                                                <tr><td></td><td></td><td></td></tr>
                                                <tr>
                                                        <th>Net Pay</th>
                                                        <th>----</th>
                                                        <th>&#8358;{thousands_separators((Inv.calAmount).toFixed(2))}</th>
                                                </tr>

                                        </tbody>
                                           
                                    </Table>



                                    <Table size="sm" hover responsive="md" striped className="gt-table">

                                        <thead>
                                            <tr>
                                                <th>ACTION</th>
                                                <th></th>
                                                <th>
                                                    {Inv.payOut ? "Net Pay is at least N5,000. Total Net Pay paid out to provided Account Details" : 
                                                    "Net Pay is less than N5,000. Total Net Pay rolled over to Wallet."}
                                                </th>
                                            </tr>
                                        </thead>

                                    </Table>

                                    

                                

                            </div>
                        </Modal.Body>
                    </Modal>

            <tr key={Inv.date}>
                <td>{index + 1}</td>
                <td>{months[Inv.month][0]}, {Inv.year}</td>
                <td>&#8358;{thousands_separators((Inv.amount).toFixed(2))}</td>
                <td>{Inv.bankName}</td>
                <td>{Inv.accountName}</td>
                <td>{Inv.accountNumber}</td>
                <td><span onClick={e => toggleShow(true)} className="pointer"><FontAwesomeIcon icon="clipboard-list" /></span></td>               
            </tr>

        </Fragment>
    )
}




export default PayStud