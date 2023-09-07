import React from 'react'
import ReactPaginate from 'react-paginate';
import './Pagination.css'

const Pagination = ({ getProductsPerPage, numberOfPages }) => {
    const handlePageClick = (data) => {
        const currentPage = data.selected + 1
        getProductsPerPage(currentPage)
    }

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                pageCount={numberOfPages}
                previousLabel="previous"

                containerClassName={'pagination justify-content-center'}
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                activeClassName="active"
            />
        </>
    )
}

export default Pagination