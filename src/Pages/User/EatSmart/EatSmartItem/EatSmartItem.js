import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
// import '../Memberships.css'

const EatSmartItem = ({ eatSmartPlan }) => {
    const { t, i18n } = useTranslation()
    const { _id: id,type , duration, price, points } = eatSmartPlan
    const title = i18n.dir() === "ltr" ?  eatSmartPlan.title.en :  eatSmartPlan.title.ar
    const description = i18n.dir() === "ltr" ?  eatSmartPlan.description.en :  eatSmartPlan.description.ar

    // let typeBg = {backgroundColor:'gray'}
    // if(type=='Normal'){
    //     typeBg={backgroundColor:'gray';}
    // }else 
    // if (type == 'Silver') {
    //     typeBg = { backgroundColor: 'gray' }
    // } else if (type == 'Gold') {
    //     typeBg = { backgroundColor: 'goldenrod' }
    // } else if (type == 'Diamond') {
    //     typeBg = { backgroundColor: 'lightblue' }
    // } else if (type == 'VIP') {
    //     typeBg = { backgroundColor: 'darksalmon' }
    // }

    return (
        <>
            <div className="card-header rounded-0" s
            // tyle={typeBg}
            >
                {t(type)}
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{duration}</h6>
                <h6 className="card-subtitle my-2">
                    <div className="price-points">
                        <span className="price">{price}$ <br /></span>
                        <br/>
                        <span className="price">{points} <i className="fa fa-diamond" aria-hidden="true"></i></span>
                        {/* <span className="points">{points} {points && <i className="fa fa-diamond" aria-hidden="true"></i>}</span> */}
                    </div>
                </h6>
                <p className="card-text">{description}</p>
                {/* <Link to={`book-membership/${id}`} className="btn bulk-dark-btn">Book Now</Link> */}
            </div>
        </>
    )
}

export default EatSmartItem