
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom' ;
import './Orders.css' ;
import { useTranslation } from 'react-i18next' ;
import RoutesSpinner from '../../../Components/Spinners/RoutesSpinner';
import OrderItem from './OrderItem';
const DR_BULK_API = process.env.REACT_APP_DR_BULK_API ;

export const Orders = ()=>{
    const [userOrders, setUserOrders] = useState([]) ;
    const { t } = useTranslation() ;
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
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="page-section">
                                <h1 className="page-title ">{t("My Orders")}</h1>
                                <div className="page-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li><Link to='/'>{t("Home")}</Link></li>
                                        <li>{t("My Orders")}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
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
                                userOrders.map(order => {
                                    return (
                                        <div key={order._id} className="col-12">
                                            <OrderItem order={order} />
                                        </div>
                                    )
                                })
                        }

                        {/* {
                            !loading.current &&
                            (
                                <div className='col-12'>
                                    <Pagination  numberOfPages={numberOfPages.current} />
                                </div>
                            )
                        } */}

                    </div>
                </div>
            </div>
        </>
    )
}