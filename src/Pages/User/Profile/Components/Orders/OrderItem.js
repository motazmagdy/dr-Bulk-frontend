import React from 'react'
import useAuthContext from '../../../../../Hooks/AuthContextHook'
import { Link } from 'react-router-dom'
import './OrderItem.css'
import { useTranslation } from 'react-i18next'
const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const OrderItem = ({ order }) => {
    const { t , i18n } = useTranslation()
    const { createdAt , bill , status , paymentMethod , items } = order

    return (
        <>
          <div className="card rounded-0 mb-5">
            <div className="post-block product-item">
                <div className="post-content">
                    <div>
                        <p>{t("Order Placed")}</p>
                        <p>{createdAt.slice(0,10)} {t("at")} {createdAt.slice(12,16)} </p>
                    </div>
                    <div>
                        <p>{t("Total")}</p>
                        <p>{bill}</p>
                    </div>
                    <div>
                        <p>{t("Payment Method")}</p>
                        <p>{t(paymentMethod)}</p>
                    </div>
                    <div>
                        <p>{t("Status")}</p>
                        <p>{t(status)}</p>
                    </div>
                </div>
                {items?.map((item)=>{
                    return (
                            <div className='order-item' key={item?._id}>
                                <div className="post-img">
                                    <Link to={`/orders`} className="imghover">
                                        <img src={item?.productId?.images[0]?.replace('public\\uploads\\', DR_BULK_API + '/uploads/')} alt="product" className="img-responsive" />
                                    </Link>
                                </div>
                                <div>
                                    <p><b>{t("Product Name")} : </b>
                                    {i18n.dir() === 'ltr' ? 
                                        item?.productId?.title?.en :
                                        item?.productId?.title?.ar}</p>
                                    <p><b>{t("Quantity")} : </b>{item?.quantity}</p>
                                    <p><b>{t("Price")} : </b>{item?.productId?.price}</p>
                                </div>
                            </div>
                    )
                })}
            </div>
           </div>
        </>
    )
}

export default OrderItem