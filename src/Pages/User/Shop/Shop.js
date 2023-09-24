import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import RoutesSpinner from '../../../Components/Spinners/RoutesSpinner';
import Pagination from '../../../Components/Pagination/Pagination';
import ProductItem from './ProductItem/ProductItem';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const Shop = () => {
    const { t, i18n } = useTranslation()

    const [products, setProducts] = useState([])
    const numberOfPages = useRef(1)
    const loading = useRef(true)

    const getProductsPerPage = (currentPage = 1) => {
        axios.get(`${DR_BULK_API}/api/products?page=${currentPage}&limit=3`)
            .then(res => {
                setProducts(res.data.data)
                numberOfPages.current = res.data.pagination.numberOfPages
                loading.current = false
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getProductsPerPage()
    }, [])

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="page-section">
                                <h1 className="page-title ">{t("Shop")}</h1>
                                <div className="page-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li><Link to='/'>{t("Home")}</Link></li>
                                        <li>{t("Shop")}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 d-flex align-items-center">
                            <div className=" widget widget-search">
                                <form>
                                    <div className="search-form">
                                        <input type="text" className="form-control " placeholder="Search Here" />
                                        <button type="Submit"><i className="fa fa-search"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div> */}

                        {/* <div className="col-lg-6 col-md-6 col-sm-6 hidden-xs">
                            <div className="page-section">
                                <p>Please Enjoy!! Healthy Eating and Dietitian blogs. Get nutrition advice, tips and facts from Dr bulk</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="space-medium">
                <div className="container">
                    <div className="row">
                        {
                            loading.current ?
                                <RoutesSpinner />
                                :
                                products.map(product => {
                                    return (
                                        <div key={product._id} className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                            <ProductItem product={product} />
                                        </div>
                                    )
                                })
                        }

                        {
                            !loading.current &&
                            (
                                <div className='col-12'>
                                    <Pagination getProductsPerPage={getProductsPerPage} numberOfPages={numberOfPages.current} />
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;