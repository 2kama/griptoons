import React, { Fragment, useState } from 'react'

//third party components


const Pagination = ({ total, limit, scroll }) => {

    const[loop, setLoop] = useState(1)
    const packageList = 5
    
    const noOfPages = Math.ceil(total / limit)
    const[currentPage, setCurrentPage] = useState(1)
    const totalLoop = Math.ceil(noOfPages / packageList)

    let pages = []

    for(let i = 0; i < noOfPages; i++) {
        pages[i] = i + 1
    }

    const clickPage = (page) => {

        if (page !== currentPage) {
         
            setCurrentPage(page)
            scroll(total - ((page - 1) * limit))

        }

    }


    return(
        <Fragment>

            <div className="mt-4 pages">
                    
                    <span onClick={e => loop > 1 && setLoop(loop - 1)} className={loop === 1 ? "disable" : ""}>&lt;</span>
                    {
                        pages.length >= 2 && pages.map(page => <span onClick={e => clickPage(page)} key={`page${page}`} className={`${page <= (packageList * (loop - 1)) || page > (packageList * loop) ? "hide" : ""} ${currentPage === page ? "onPage" : ""}`}>{page}</span>)
                    }
                    <span onClick={e => loop < totalLoop && setLoop(loop + 1)} className={totalLoop === loop || totalLoop === 0 ? "disable" : ""}>&gt;</span>
                </div>


        </Fragment>
    )
}





export default Pagination