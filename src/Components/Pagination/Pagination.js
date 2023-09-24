import React from 'react'
import ReactPaginate from 'react-paginate';
import './Pagination.css'
import { useTranslation } from "react-i18next";

const Pagination = ({ getProductsPerPage, numberOfPages }) => {
    const [t, i18n] = useTranslation();

    const handlePageClick = (data) => {
        const currentPage = data.selected + 1
        getProductsPerPage(currentPage)
    }

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel={t("next")}
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                pageCount={numberOfPages}
                previousLabel={t("previous")}

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