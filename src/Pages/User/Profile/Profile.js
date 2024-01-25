import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "./Profile.css";

export const Profile = () => {
    const [tab, setTab] = useState('');
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const currentRoute = location.pathname.split("/")[2]

    useEffect(() => {
        if (currentRoute) {
            setTab(currentRoute)
        } else {
            setTab('orders')
            navigate('orders')
        }
    }, [location])

    const changeTab = (theTab) => {
        navigate(theTab);
        setTab(theTab);
    }

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="page-section">
                                <h1 className="page-title ">{t("My Profile")}</h1>
                                <div className="page-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li><Link to='/'>{t("Home")}</Link></li>
                                        <li>{t("My Profile")}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-medium" id='user-profile'>
                <div className="container">
                    <div className="row">
                        <div className='col-12'>
                            <div className='tabs col-12 d-flex flex-sm-row justify-content-around  flex-column align-items-center'>
                                <div className={`${tab === 'orders' ? 'active' : ''} col-xs-12 col-4`} onClick={() => changeTab('orders')}>{t("Orders")}</div>
                                <div className={`${tab === 'booked-memberships' ? 'active' : ''} col-xs-12 col-4`} onClick={() => changeTab('booked-memberships')}>{t("Memberships")}</div>
                                <div className={`${tab === 'booked-eat-smart' ? 'active' : ''} col-xs-12 col-4`} onClick={() => changeTab('booked-eat-smart')}>{t("Eat Smart")}</div>
                            </div>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}