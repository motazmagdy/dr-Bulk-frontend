import React from 'react'
import { useTranslation } from 'react-i18next'
import '../Memberships.css'

const MembershipItem = ({ membership , handleRouting}) => {
    const { t , i18n } = useTranslation()
    const { _id: id , duration, price, type, points } = membership
    const title = i18n.dir() === "ltr" ? membership.title.en : membership.title.ar
    const description = i18n.dir() === "ltr" ? membership.description.en : membership.description.ar

    let typeBg = {}
    // if(type=='Normal'){
    //     typeBg={backgroundColor:'gray';}
    // }else 
    if (type == 'Silver') {
        typeBg = { backgroundColor: 'gray' }
    } else if (type == 'Gold') {
        typeBg = { backgroundColor: 'goldenrod' }
    } else if (type == 'Diamond') {
        typeBg = { backgroundColor: 'lightblue' }
    } else if (type == 'VIP') {
        typeBg = { backgroundColor: 'darksalmon' }
    }

    return (
        <>
            <div className="card-header rounded-0" style={typeBg}>
                <span>{t(type)}{" "}</span>
                <span className="points">{t("Earn")}{" "} {points} {points && <i className="fa fa-diamond" aria-hidden="true"></i>}</span>
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{duration}</h6>
                <h6 className="card-subtitle my-2">
                    <div className="price-points">
                        <span className="price">{price}$</span>
                        {/* <span className="points">{points} {points && <i className="fa fa-diamond" aria-hidden="true"></i>}</span> */}
                    </div>
                </h6>
                <p className="card-text">{description}</p>
                <button onClick={()=>handleRouting(type === "VIP" ? 'private-training': 'book-membership' ,id)} 
                // to={`book-membership/${id}`} 
                className="btn bulk-dark-btn">{t("Book Now")}</button>
            </div>
        </>
    )
}

export default MembershipItem