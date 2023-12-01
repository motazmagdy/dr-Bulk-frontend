import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import './EatSmart.css'
import { useTranslation } from 'react-i18next'
import EatSmartItem from './EatSmartItem/EatSmartItem';

const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const EatSmart = ({ handleRouting }) => {
    const [eatSmart, setEatSmarts] = useState([])
    const loading = useRef(true)
    const { t, i18n } = useTranslation()

    const getEatSmarts = () => {
        axios.get(`${DR_BULK_API}/api/eat-smart`)
            .then(res => {
                console.log(res.data)
                setEatSmarts(res.data.data)
                loading.current = false
            })
            .catch(err => console.log(err))
    }
    useEffect(() => { getEatSmarts() }, [])

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="page-section">
                                <h1 className="page-title ">{t("Eat Smart")}</h1>
                                <div className="page-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li><Link to='/'>{t("Home")}</Link></li>
                                        <li>{t("Eat Smart")}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 hidden-xs">
                            <div className="page-section">
                                <p>Healthy Eating and Dietitian Schedules. Get nutrition advice, tips and facts with Dr Bulk.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-medium eat-smart">
                <div className="container">
                    <div className="row">
                        {
                            eatSmart.map(e => {
                                return (
                                    <div key={e._id} className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <EatSmartItem eatSmartPlan={e} handleRouting={handleRouting} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
};


export default EatSmart;
