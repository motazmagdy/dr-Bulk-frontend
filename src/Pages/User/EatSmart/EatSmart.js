import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import './EatSmart.css'
import { useTranslation } from 'react-i18next'

const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const EatSmart = ({handleRouting}) => {
    const [eatSmart, setEatSmarts] = useState([])
    const loading = useRef(true)
    const { t , i18n } = useTranslation()

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
                            eatSmart.map(plan => {
                                const { _id: id, duration, price, type, points } = plan
                                const title = i18n.dir() === "ltr" ? plan.title.en : plan.title.ar ;
                                const description = i18n.dir() === "ltr" ? plan.description.en : plan.description.ar ;

                                return (
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" key={id}>
                                        <div className="post-block border border-1">
                                            {/* <div className="post-img">
                                                <Link to='/' className="imghover">
                                                    <img src="./images/post-img-small-1.jpg" alt="" className="img-responsive" /></Link>
                                            </div> */}
                                            <div className="post-content">
                                                <span className={`${i18n.dir() === "ltr" ? "points" : "pointsAr"}`}>{t("Earn")} {points} <i className="fa fa-diamond" aria-hidden="true"></i></span>
                                                <h4><Link to='/' className="title">{title}</Link></h4>
                                                <div className="meta">
                                                    <div className="meta-categories"><Link to='/'>{t(type)} {" "} {t("Online Tracking")}</Link></div>
                                                    <div className="meta-date">{duration}</div>
                                                </div>
                                                <h6 className="my-2">
                                                    <div className="price-points">
                                                        <span className="price">{price}$</span>
                                                        {/* <span className="points">Earn {points} {points && <i className="fa fa-diamond" aria-hidden="true"></i>}</span> */}
                                                    </div>
                                                </h6>
                                                <p>{description}</p>
                                                <button onClick={()=>handleRouting('/eat-smart' , id)} className="btn bulk-dark-btn">{t("Book Now")}</button>
                                            </div>
                                        </div>
                                    </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
};


export default EatSmart;
