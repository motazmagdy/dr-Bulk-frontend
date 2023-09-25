import React, { useEffect, useRef, useState } from 'react'
import MembershipItem from '../MembershipItem/MembershipItem'
import RoutesSpinner from '../../../../Components/Spinners/RoutesSpinner'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const VIPMemberships = ({handleRouting}) => {
    const [VIPMemberships, setVIPMemberships] = useState([])
    const loading = useRef(true)
    const { t } = useTranslation()

    const getVIPMemberships = () => {
        axios.get(`${DR_BULK_API}/api/memberships/VIP/private-training`)
            .then(res => {
                console.log(res.data)
                setVIPMemberships(res.data.data)
                loading.current = false
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getVIPMemberships()
    }, [])

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="page-section">
                                <h1 className="page-title ">{t("Private Training")}</h1>
                                <div className="page-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li><Link to='/'>{t("Home")}</Link></li>
                                        <li>{t("Private Training")}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        {/* <div className="col-lg-6 col-md-6 col-sm-6 hidden-xs">
                            <div className="page-section">
                                <p>Private training with Dr bulk</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            {
                loading.current ?
                    <RoutesSpinner />
                    :
                    <div className='container py-5 memberships'>
                        <div className="row">
                            <div className="col-12 Normal">
                                <h3>{t("Private Training")}</h3>
                            </div>
                            {
                                VIPMemberships.map(m => {
                                    return (
                                        <div key={m._id} className="col-xs-6 col-lg-6 col-md-6 col-sm-12">
                                            <div className="card rounded-0 mb-5">
                                                <MembershipItem membership={m} handleRouting={handleRouting}/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default VIPMemberships