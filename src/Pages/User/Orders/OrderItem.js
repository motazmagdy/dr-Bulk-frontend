import React from 'react'
import useAuthContext from '../../../Hooks/AuthContextHook'
import { Link , useNavigate } from 'react-router-dom'
import './OrderItem.css'
import { useTranslation } from 'react-i18next'
const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const OrderItem = ({ order }) => {
    const { t , i18n } = useTranslation()
    const { state } = useAuthContext()
    const navigate  = useNavigate()
    // console.log("instrcutor" , instructor);
    const { _id: id, createdAt , bill , status , paymentMethod , items } = order
    // const name = i18n.dir() === "ltr" ?  order.name.en :  order.name.ar
    // const bio = i18n.dir() === "ltr" ?  order.bio.en :  order.bio.ar
    
    // const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } = useCart()

    return (
        <>
          <div className="card rounded-0 mb-5">
            <div className="post-block product-item">
                <div className="post-content">
                    <div>
                        <p>Order Placed</p>
                        <p>{createdAt.slice(0,10)} at {createdAt.slice(12,16)} </p>
                    </div>
                    <div>
                        <p>Total</p>
                        <p>{bill}</p>
                    </div>
                    <div>
                        <p>Payment Method</p>
                        <p>{paymentMethod}</p>
                    </div>
                    <div>
                        <p>Status</p>
                        <p>{status}</p>
                    </div>
                </div>
                {items?.map((item)=>{
                    return (
                            <div className='order-item'>
                                <p><b>Product Name : </b>{item?.productId}</p>
                                <p><b>Quantity : </b>{item?.quantity}</p>
                            </div>

                    )
                })}
            </div>
           </div>
        </>
    )
}

export default OrderItem