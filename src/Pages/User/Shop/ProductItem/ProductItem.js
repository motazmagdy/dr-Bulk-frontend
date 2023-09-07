import React from 'react'
import { Link } from 'react-router-dom'
import './ProductItem.css'

const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const ProductItem = ({ product }) => {
    const { _id, title, category, description, price, points, images } = product

    return (
        <>
            <div className="post-block">
                <div className="post-img">
                    <Link to={`/shop/${_id}`} className="imghover">
                        <img src={images[0]?.replace('public\\uploads\\', DR_BULK_API + '/uploads/')} alt="product" className="img-responsive" />
                    </Link>
                </div>
                <div className="post-content">
                    <div className="meta">
                        <span className="meta-categories">{category?.name.en}</span>
                        {/* <span className="meta-date">30 July, 2020</span> */}
                    </div>
                    <h4><Link to={`/shop/${_id}`} className="title">{title.en}</Link></h4>
                    <div className="price-points">
                        <span className="price">{price} $</span>
                        <span className="points">{points} {points && <i className="fa fa-diamond" aria-hidden="true"></i>}</span>
                    </div>
                    <p>
                        {description.en?.length > 50 ? (description.en?.substring(0, 50) + '....') : description.en}
                    </p>
                    <Link to={`/shop/${_id}`} className="btn-link">read more</Link>
                </div>
            </div>
        </>
    )
}

export default ProductItem