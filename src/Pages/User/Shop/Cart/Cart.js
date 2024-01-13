import React, { useEffect, useRef, useState } from 'react'
import { useCart } from '../../../../Context/CartContext'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import RoutesSpinner from '../../../../Components/Spinners/RoutesSpinner'
import axios from 'axios'
import './Cart.css'
import { toast } from "react-toastify";
const DR_BULK_API = process.env.REACT_APP_DR_BULK_API


const Cart = ({ handleRouting }) => {
  const { t, i18n } = useTranslation()
  const { cartItems, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem, removeAllCart } = useCart()
  let [itemsDetails, setItemsDetails] = useState([])
  const loading = useRef(true)
  const previousUrl = useLocation()

  if (!cartItems.length) {
    loading.current = false
  }

  useEffect(() => {
    const itemsIds = cartItems.map(item => item.productId)
    setItemsDetails([])
    itemsIds.forEach(productId => {
      axios.get(`${DR_BULK_API}/api/products/${productId}`)
        .then(res => {
          setItemsDetails(prev => [...prev, res.data.data])
          loading.current = false
        })
        .catch(err => console.log(err))
    })
  }, [])

  const bill = cartItems.reduce((itemQuantity, item) => {
    const i = itemsDetails.find(
      (itemD) => itemD._id === item.productId
    );

    return itemQuantity + item.quantity * (i?.price || 0);
  }, 0)

  const createOrder = () => {
    const paymentMethod = 'COD'
    axios.post(`${DR_BULK_API}/api/orders`, { items: cartItems, bill, paymentMethod }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("Token")}`,
      },
    })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          toast.success(t("Order done successfully"));
          removeAllCart()
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="container cart-page" dir='ltr'>
      {loading.current ? (
        <RoutesSpinner />
      ) : cartItems.length ? (
        <div className="table-responsive-lg">
          <table className="table">
            <thead>
              <tr>
                <th className='ps-5'>{t("Product Image")}</th>
                <th>{t("Name")}</th>
                <th>{t("Price")}</th>
                <th>{t("Quantity")}</th>
                <th>{t("Total")}</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return itemsDetails.map((itemD) => {
                  if (itemD._id === item.productId) {
                    return (
                      <tr className="itemRow" key={item.productId}>
                        <td>
                          <div className="product-img">
                            <Link to={`/shop/${item.productId}`}>
                              <img
                                src={itemD.images[0]?.replace(
                                  "public\\uploads\\",
                                  DR_BULK_API + "/uploads/"
                                )}
                                alt=""
                              />
                            </Link>
                          </div>
                        </td>
                        <td className="product-name">
                          <Link to={`/shop/${item.productId}`}>{i18n.language == 'en' ? itemD.title.en : itemD.title.ar}</Link>
                        </td>
                        <td className="product-price">{itemD.price} $</td>
                        <td className="quantityBtns">
                          <button
                            className="btn btn-dark"
                            onClick={(e) => decreaseItemQuantity(item.productId)}
                          >
                            <i className="fa fa-minus" aria-hidden="true"></i>
                          </button>
                          <div className="quantity">
                            {getItemQuantity(item.productId)} {t("in Cart")}
                          </div>
                          <button
                            className="btn btn-dark"
                            onClick={(e) => increaseItemQuantity(item.productId)}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </button>
                        </td>
                        <td colSpan="2" className="total">
                          {itemD.price * item.quantity} $
                        </td>
                        <td className="removeBtn">
                          <button
                            className="btn btn-danger"
                            onClick={(e) => removeItem(item.productId)}
                          >
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  }
                });
              })}

              <tr className="total-price">
                <td></td>
                <td></td>
                <td></td>
                <td>{t("Total Price")}</td>
                <td>
                  {bill}{" "}
                  $
                </td>
                <td colSpan={2} className="order-btn-row">
                  {/* {state.userRole === "users" ? */}
                  <button
                    type="submit"
                    className="btn bulk-dark-btn"
                    onClick={() => { handleRouting(createOrder, previousUrl) }}
                  >
                    {t("Order Now")}
                  </button>
                  {/* : */}
                  {/* <p className='cartLoginWarn'>{t("You need to ")}<span className='loginWord' onClick={() => navigate('/login')}>{t("Login")}</span>{t(" to Order")}</p> */}
                  {/* }  */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="emptyCart">
          {t("Cart is empty. Go to")} <Link to="/apparel">{t("Store")}</Link>
        </div>
      )}
    </div>
  );
}

export default Cart