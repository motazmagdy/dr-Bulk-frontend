
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next' ;
import RoutesSpinner from '../../../../../Components/Spinners/RoutesSpinner';
import OrderItem from './OrderItem';
const DR_BULK_API = process.env.REACT_APP_DR_BULK_API ;

export const Orders = ()=>{
    const [userOrders, setUserOrders] = useState([]) ;
    const loading = useRef(true) ;

    const getUserOrders = () => {
        axios.get(`${DR_BULK_API}/api/orders/user-orders`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          })
            .then(res => {
                setUserOrders(res?.data?.data)
                loading.current = false
            })
            .catch(err => console.log(err))
    }
    useEffect(() => { getUserOrders() }, []) ;

    return (
        <>
            <div className="space-medium">
                <div className="container p-0">
                    <div className="row">
                        {
                            loading.current ?
                                <RoutesSpinner />
                                :
                                userOrders.map(order => {
                                    return (
                                        <div key={order._id} className="col-12">
                                            <OrderItem order={order} />
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}