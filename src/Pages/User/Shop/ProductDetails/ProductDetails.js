import React, { useEffect, useRef, useState } from 'react'
import './ProductDetails.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RoutesSpinner from '../../../../Components/Spinners/RoutesSpinner'
import { useCart } from '../../../../Context/CartContext'
import { useTranslation } from 'react-i18next'

const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const ProductDetails = () => {
    const { id: productId } = useParams()
    const [productDetails, setProductDetails] = useState({})
    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } = useCart()
    const loading = useRef(true)
    const { t , i18n } = useTranslation()

    useEffect(() => {
        axios.get(`${DR_BULK_API}/api/products/${productId}`)
            .then(res => {
                setProductDetails(res.data.data)
                loading.current = false
            })
            .catch(err => console.log(err))
    }, [])

    let { category, price, points, images } = productDetails
    const title = i18n.dir() === "ltr" ? productDetails.title.en : productDetails.title.ar ;
    const description = i18n.dir() === "ltr" ? productDetails.description.en : productDetails.description.ar ;

    images = images?.map(img => img.replace('public\\uploads\\', DR_BULK_API + '/uploads/'))

    return (
        <>
            {
                loading.current ?
                    <RoutesSpinner />
                    :
                    <div className="space-medium product-details">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 col-md-11 col-sm-11 col-xs-12">
                                    <div className="post-block">
                                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                            <div className="carousel-indicators">
                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className='active' aria-current="true" aria-label={`Slide 1`}>
                                                    <img src={images[0]} className="d-block w-100" alt="product" />
                                                </button>

                                                {
                                                    images.length &&
                                                    images.map((img, index) => {
                                                        return (
                                                            index !== 0 &&
                                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} aria-label={`Slide ${index + 1}`}>
                                                                <img src={img} className="d-block w-100" alt="product" />
                                                            </button>
                                                        )
                                                    })
                                                }
                                            </div>

                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img src={images[0]} className="d-block" alt="product" />
                                                </div>

                                                {
                                                    images.length &&
                                                    images.map((img, index) => {
                                                        return (
                                                            index !== 0 &&
                                                            <div className="carousel-item">
                                                                <img src={img} className="d-block" alt="product" />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">{t("previous")}</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">{t("next")}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-7 col-sm-8 col-xs-12 ms-md-5">
                                    <div className=" widget">
                                        {/* <h2 className="widget-title">Pay Now</h2> */}
                                        <div className=" author-block">
                                            <div className="author-post-content ">
                                                <div className="author-header">
                                                    <h3><span className="title">ghhjhhf jhghjghj jkhkjhkjj {title}</span></h3>
                                                </div>
                                                <div className="author-meta ">{category.name.en}</div>
                                                <div className="author-content">
                                                    <p className='price'>{price} $</p>
                                                    <p className='points'>{points} {points && <i className="fa fa-diamond" aria-hidden="true"></i>}</p>
                                                    {/* <button className="btn bulk-dark-btn">Add To Cart</button>*/}
                                                    {
                                                        !getItemQuantity(productId) ?
                                                            <button type='button' className='btn bulk-dark-btn' onClick={e => increaseItemQuantity(productId)}><i className="fa-solid fa-cart-shopping me-2"></i>Add to Cart</button>
                                                            :
                                                            <div className="quantityBtns">
                                                                {getItemQuantity(productId) === 1 ?
                                                                    <button type='button' className='btn btn-danger' onClick={e => removeItem(productId)}><i className="fa fa-times" aria-hidden="true"></i></button>
                                                                    :
                                                                    <button type='button' className='btn btn-dark' onClick={e => decreaseItemQuantity(productId)}><i className="fa fa-minus" aria-hidden="true"></i></button>}

                                                                <div className="quantity">{getItemQuantity(productId)} in Cart</div>
                                                                <button type='button' className='btn btn-dark' onClick={e => increaseItemQuantity(productId)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-8 col-md-10 col-sm-10 col-xs-12">
                                    <div className="post-block">
                                        <div className="post-content">
                                            <div className="post-header">
                                                <h2 className="post-title">
                                                    <span className="title">{t("Description")} : </span>
                                                </h2>
                                            </div>
                                            <p>{description}</p>
                                        </div>
                                    </div>

                                    {/* <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                            <div className=" widget widget-categories">
                                                <h2 className="widget-title">Categories</h2>
                                                <ul className="angle angle-right">
                                                    <li><a href="#">Diet tips (10)</a></li>
                                                    <li><a href="#">Health Care (12)</a></li>
                                                    <li><a href="#">Healthy Recepies (14)</a></li>
                                                    <li><a href="#">Weight Loss Tips (16)</a></li>
                                                    <li><a href="#">Diet Programs (20)</a></li>
                                                </ul>
                                            </div>
                                        </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default ProductDetails