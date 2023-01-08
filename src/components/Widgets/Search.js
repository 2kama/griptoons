import React, { Fragment, useState, useEffect } from 'react'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Form, Row, Modal } from 'react-bootstrap'


//custom components
import comicApi from '../../api/comic'


const Search = () => {
    

    const[show, toggleShow] = useState(false)
    const[indexes, putIndexes] = useState([])
    const[filterWords, setFilter] = useState([])
    const[valueSearch, setSearch] = useState("")
    const[searchLabels, setLabels] = useState([])

    const getSearchIndex = async () => {
        try {
            
            const gett = await comicApi.getSearchIndexes()
            const dataX = Object.values(gett.data().index)
            setLabels(dataX)
            putIndexes(dataX.map(sch => `${sch.name}${sch.creatorName}`))
            
            localStorage.GripToonsSearchIndexTime = new Date().getTime()
            localStorage.GripToonSearchIndex = JSON.stringify(gett.data().index)

        } catch (err) {
            
        }
    }





    const updateResult = (e) => {
        setSearch(e.target.value)
        const query = (e.target.value).toLowerCase().split(" ").join("")

        let newArray = []
        query === "" ? setFilter([]) : indexes.map((algo, idx) => (algo.toLowerCase().split(" ").join("")).includes(query) && newArray.push(idx) )

        setFilter(newArray)

        
    }



    useEffect(() => {

        if(localStorage.GripToonsSearchIndexTime === null || localStorage.GripToonsSearchIndexTime === undefined || (new Date().getTime() - localStorage.GripToonsSearchIndexTime > 43200000)) {
        
            getSearchIndex()
    
        }else {
           
            const dataX = Object.values(JSON.parse(localStorage.GripToonSearchIndex))
            setLabels(dataX)
            putIndexes(dataX.map(sch => `${sch.name}${sch.creatorName}`))

            
            
        }
        
    }, [])



    return(
        <Fragment>

        


          {
              indexes.length > 0 && (
                  <>


                        <Modal centered show={show} onHide={e => toggleShow(!show)} size="xl">
                            <Modal.Body>

                                <div className="formBox gt-shadow searchArea pl-5 pr-5 pt-4 pb-4">
                                    <Row>
                                        <Col md={12} className="mb-4 p-0">
                                            <input value={valueSearch} onChange={e => updateResult(e)} type="" name="searchBar" placeholder="Search for creators and Series" />
                                        </Col>

                                        
                                            {
                                                searchLabels && filterWords.length === 0 ? <Col md={12} className="text-center">No Search Results</Col> : filterWords.map(label => (
                                                    <Col key={`wds${label}`} md={4} className="searchLet mt-2 p-0">
                                                        <a className="p-2" href={`/comics/${searchLabels[label].genre}/${searchLabels[label].url}`}>
                                                            <strong>{searchLabels[label].name}</strong> by <i>{searchLabels[label].creatorName}</i>
                                                        </a>
                                                    </Col>
                                                    )
                                                )}

                                        
                                        
                                    </Row>
                                </div>

                            </Modal.Body>
                        </Modal>



                        <Form inline>
                            <div onClick={e => toggleShow(true)} className="formInput headerForm">
                                <FontAwesomeIcon icon="search" />
                                <input
                                    type="text"    
                                    placeholder="Search..."
                                    disabled
                                    />
                            </div>
                        </Form>




                  </>
              )
          }
           
        </Fragment>
    )
}



export default Search