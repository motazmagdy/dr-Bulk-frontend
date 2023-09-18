import React from 'react'
import { Link } from 'react-router-dom'
import '../Memberships.css'

const MembershipItem = ({ membership }) => {
    const { _id: id, title, description, duration, price, type, points, image } = membership

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
                {type}
            </div>
            <div className="card-body">
                <h5 className="card-title">{title.en}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{duration}</h6>
                <h6 className="card-subtitle my-2">
                    <div className="price-points">
                        <span className="price">{price}$</span>
                        {/* <span className="points">{points} {points && <i className="fa fa-diamond" aria-hidden="true"></i>}</span> */}
                    </div>
                </h6>
                <p className="card-text">{description.en}</p>
                <Link to={`book-membership/${id}`} className="btn bulk-dark-btn">Book Now</Link>
            </div>
        </>
    )
}

export default MembershipItem