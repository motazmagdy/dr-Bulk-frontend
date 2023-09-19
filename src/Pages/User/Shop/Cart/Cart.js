import React, { useEffect, useRef, useState } from 'react'
import { useCart } from '../../../../Context/CartContext'
import { Link } from 'react-router-dom'
import RoutesSpinner from '../../../../Components/Spinners/RoutesSpinner'
import axios from 'axios'
import './Cart.css'

const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const Cart = () => {
    const { cartItems, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } = useCart()
    let [itemsDetails, setItemsDetails] = useState([])
    const loading = useRef(true)

    if (!cartItems.length) {
        loading.current = false
    }
    const itemsIds = cartItems.map(item => item.id)

    useEffect(() => {
        // setItemsDetails([])
        itemsIds.forEach(id => {
            axios.get(`${DR_BULK_API}/api/products/${id}`)
                .then(res => {
                    setItemsDetails(prev => [...prev, res.data.data])
                    loading.current = false
                })
                .catch(err => console.log(err))
        })
    }, [])
    console.log(itemsDetails)

    return (
        <div className="container cart-page">
            {loading.current ?
                <RoutesSpinner />
                :
                (
                    cartItems.length ?
                        (<table className="table">
                            <thead>
                                <tr>
                                    <th>Product Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    cartItems.map(item => {
                                        return itemsDetails.map(itemD => {
                                            if (itemD._id === item.id) {
                                                return (<tr className='itemRow' key={item.id}>
                                                    <td>
                                                        <div className='product-img'>
                                                            <Link to={`/shop/${item.id}`}>
                                                                <img src={itemD.images[0]?.replace('public\\uploads\\', DR_BULK_API + '/uploads/')} alt="" />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className='product-name'>
                                                        <Link to={`/shop/${item.id}`}>
                                                            {itemD.title.en}
                                                        </Link>
                                                    </td>
                                                    <td className='product-price'>{itemD.price} $</td>
                                                    <td className="quantityBtns">
                                                        <button className='btn btn-dark' onClick={e => decreaseItemQuantity(item.id)}><i className="fa fa-minus" aria-hidden="true"></i></button>
                                                        <div className="quantity">{getItemQuantity(item.id)} in Cart</div>
                                                        <button className='btn btn-dark' onClick={e => increaseItemQuantity(item.id)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                                                    </td>
                                                    <td colSpan='2' className='total'>
                                                        {itemD.price * item.quantity} $
                                                    </td>
                                                    <td className='removeBtn'><button className='btn btn-danger' onClick={e => removeItem(item.id)}><i className="fa fa-times" aria-hidden="true"></i></button></td>
                                                </tr>)
                                            }
                                        })

                                    })
                                }

                                <tr className='total-price'>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Total Price </td>
                                    <td>{
                                        cartItems.reduce((itemQuantity, item) => {
                                            const i = itemsDetails.find(itemD => itemD._id === item.id)

                                            return itemQuantity + item.quantity * (i?.price || 0)
                                        }, 0)
                                    } $
                                    </td>
                                    <td className='order-btn-row'>
                                        <button type='submit' className="btn bulk-dark-btn">Order Now</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>)
                        :
                        <div className="emptyCart">Cart is empty. Go to <Link to="/shop">Store</Link>.</div>
                )
            }
        </div>
    )
}

export default Cart