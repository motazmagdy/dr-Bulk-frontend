import React from 'react'
import useAuthContext from '../../../../Hooks/AuthContextHook'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../../../Context/CartContext'
import './ProductItem.css'
import { useTranslation } from 'react-i18next'

const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const ProductItem = ({ product }) => {
    const { t, i18n } = useTranslation()
    const { state } = useAuthContext()
    const navigate = useNavigate()
    let { _id: id, title, category, description, price, points, images } = product
    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } = useCart()

    if (i18n.language == 'ar') {
        title = product.title.ar
        description = product.description.ar
        category = product.category.name.ar
    } else if (i18n.language == 'en') {
        title = product.title.en
        description = product.description.en
        category = product.category.name.en
    }

    return (
        <>
            <div className="post-block product-item border border-1">
                <div className="post-img">
                    <Link to={`/shop/${id}`} className="imghover">
                        <img src={images[0]?.replace('public\\uploads\\', DR_BULK_API + '/uploads/')} alt="product" className="img-responsive" />
                    </Link>
                </div>
                <div className="post-content">
                    <div className="meta">
                        <span className="meta-categories">{category}</span>
                        {/* <span className="meta-date">30 July, 2020</span> */}
                    </div>
                    <h4><Link to={`/shop/${id}`} className="title">{title}</Link></h4>
                    <div className="price-points">
                        <span className="price">{price} $</span>
                        <span className="points">{points} {points && <i className="fa fa-diamond" aria-hidden="true"></i>}</span>
                    </div>
                    <p>
                        {description?.length > 50 ? (description?.substring(0, 50) + '....') : description}
                    </p>

                    {
                        !getItemQuantity(id) ?
                            <button type='button' className='btn bulk-dark-btn' onClick={e => increaseItemQuantity(id)}><i className="fa-solid fa-cart-shopping me-2"></i>{t("Add to Cart")}</button>
                            :
                            // (state.userRole === "users" ?
                            <div className="quantityBtns">
                                {getItemQuantity(id) === 1 ?
                                    <button type='button' className='btn btn-danger' onClick={e => removeItem(id)}><i className="fa fa-times" aria-hidden="true"></i></button>
                                    :
                                    <button type='button' className='btn btn-dark' onClick={e => decreaseItemQuantity(id)}><i className="fa fa-minus" aria-hidden="true"></i></button>}

                                <div className="quantity"> {getItemQuantity(id)} {t("in Cart")}</div>
                                <button type='button' className='btn btn-dark' onClick={e => increaseItemQuantity(id)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                            </div>
                        //     :
                        //     <p className='cartLoginWarn'>{t("You need to ")}<span className='loginWord' onClick={() => navigate('/login')}>{t("Login")}</span>{t(" to Add to Cart")}</p>
                        // )
                    }
                </div>
            </div>
        </>
    )
}

export default ProductItem