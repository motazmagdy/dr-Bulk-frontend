import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const EatSmartItem = ({ eatSmartPlan, handleRouting }) => {
    const { t, i18n } = useTranslation()
    const { _id: id, type, duration, price, points } = eatSmartPlan
    const title = i18n.dir() === "ltr" ? eatSmartPlan.title.en : eatSmartPlan.title.ar
    const description = i18n.dir() === "ltr" ? eatSmartPlan.description.en : eatSmartPlan.description.ar
    const previousUrl = useLocation()

    const bookEatSmart = () => {
        const paymentMethod = 'COD'

        axios.post(`${DR_BULK_API}/api/book-eat-smart`, { eatSmartId: id, paymentMethod }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("Token")}`,
            },
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    toast.success(t("You have booked eat smart session successfully"));
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
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
                    <button
                        type="submit"
                        onClick={() => handleRouting(bookEatSmart, previousUrl)}
                        className="btn bulk-dark-btn">{t("Book Now")}
                    </button>
                </div>
            </div>
        </>
    )
}

export default EatSmartItem