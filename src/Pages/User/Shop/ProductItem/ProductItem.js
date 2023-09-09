import React from 'react'
import useAuthContext from '../../../../Hooks/AuthContextHook'
import { Link , useNavigate } from 'react-router-dom'
import { useCart } from '../../../../Context/CartContext'
import './ProductItem.css'

const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const ProductItem = ({ product }) => {
    const { state } = useAuthContext()
    const navigate  = useNavigate()
    const { _id: id, title, category, description, price, points, images } = product
    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } = useCart()

    return (
        <>
            <div className="post-block product-item">
                <div className="post-img">
                    <Link to={`/shop/${id}`} className="imghover">
                        <img src={images[0]?.replace('public\\uploads\\', DR_BULK_API + '/uploads/')} alt="product" className="img-responsive" />
                    </Link>
                </div>
                <div className="post-content">
                    <div className="meta">
                        <span className="meta-categories">{category?.name.en}</span>
                        {/* <span className="meta-date">30 July, 2020</span> */}
                    </div>
                    <h4><Link to={`/shop/${id}`} className="title">{title.en}</Link></h4>
                    <div className="price-points">
                        <span className="price">{price} $</span>
                        <span className="points">{points} {points && <i className="fa fa-diamond" aria-hidden="true"></i>}</span>
                    </div>
                    <p>
                        {description.en?.length > 50 ? (description.en?.substring(0, 50) + '....') : description.en}
                    </p>

                    {
                        !getItemQuantity(id) ?
                            <button type='button' className='btn bulk-dark-btn' onClick={e => increaseItemQuantity(id)}><i className="fa-solid fa-cart-shopping me-2"></i>Add to Cart</button>
                            : 
                            (state.userRole === "users" ?
                            <div className="quantityBtns">
                                {getItemQuantity(id) === 1 ?
                                    <button type='button' className='btn btn-danger' onClick={e => removeItem(id)}><i className="fa fa-times" aria-hidden="true"></i></button>
                                    :
                                    <button type='button' className='btn btn-dark' onClick={e => decreaseItemQuantity(id)}><i className="fa fa-minus" aria-hidden="true"></i></button>}

                                <div className="quantity">{getItemQuantity(id)} in Cart</div>
                                <button type='button' className='btn btn-dark' onClick={e => increaseItemQuantity(id)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                            </div> 
                            : 
                            <p className='cartLoginWarn'>You need to <span className='loginWord' onClick={()=>navigate('/login')}>Login</span> to Add to Cart</p>
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default ProductItem