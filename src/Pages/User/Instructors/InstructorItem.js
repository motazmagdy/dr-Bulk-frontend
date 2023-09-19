import React from 'react'
import useAuthContext from '../../../Hooks/AuthContextHook'
import { Link , useNavigate } from 'react-router-dom'
import './InstructorItem.css'
import { useTranslation } from 'react-i18next'
const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const InstructorItem = ({ instructor }) => {
    const { t , i18n } = useTranslation()
    const { state } = useAuthContext()
    const navigate  = useNavigate()
    // console.log("instrcutor" , instructor);
    const { _id: id, phoneNumber , image } = instructor
    const name = i18n.dir() === "ltr" ?  instructor.name.en :  instructor.name.ar
    const bio = i18n.dir() === "ltr" ?  instructor.bio.en :  instructor.bio.ar
    
    // const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } = useCart()

    return (
        <>
          <div className="card rounded-0 mb-5">
            <div className="post-block product-item">
                <div className="post-img">
                    <Link to={`/instrucotrs/${id}`} className="imghover">
                        <img src={image?.replace('public\\uploads\\', DR_BULK_API + '/uploads/')} alt="product" className="img-responsive" />
                    </Link>
                </div>
                <div className="post-content">
                    {/* <div className="meta">
                        <span className="meta-categories">{name.en}</span>
                         <span className="meta-date">30 July, 2020</span> 
                    </div> */}
                    <h4><Link to={`/instructor/${id}`} className="title">{name}</Link></h4>
                    <div className="price-points">
                        {/* <span className="price">{t("For Contact")} : {phoneNumber} </span> */}
                        {/* <span className="points">{phoneNumber} {phoneNumber && <i className="fa fa-diamond" aria-hidden="true"></i>}</span> */}
                    </div>
                    <p>
                        {bio?.length > 50 ? (bio?.substring(0, 50) + '....') : bio}
                    </p>
                    <Link to={`book-instructor/${id}`} className="btn bulk-dark-btn">{t("Book Now")}</Link>
                    {/* {
                        !getItemQuantity(id) ?
                            <button type='button' className='btn bulk-dark-btn' onClick={e => increaseItemQuantity(id)}><i className="fa-solid fa-cart-shopping me-2"></i>Add to Cart</button>
                            : 
                            (state.userRole === "users" ?
                            <div className="quantityBtns">
                                {getItemQuantity(id) === 1 ?
                                    <button type='button' className='btn btn-danger' onClick={e => removeItem(id)}><i className="fa fa-times" aria-hidden="true"></i></button>
                                    :
                                    <button type='button' className='btn btn-dark' onClick={e => decreaseItemQuantity(id)}><i className="fa fa-minus" aria-hidden="true"></i></button>}

                                <div className="quantity">{getItemQuantity(id)} in Cart</div>
                                <button type='button' className='btn btn-dark' onClick={e => increaseItemQuantity(id)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                            </div> 
                            : 
                            <p className='cartLoginWarn'>{t("You need to ")}<span className='loginWord' onClick={()=>navigate('/login')}>{t("Login")}</span>{t(" to Add to Cart")}</p>
                            )
                    } */}
                </div>
            </div>
           </div>
        </>
    )
}

export default InstructorItem