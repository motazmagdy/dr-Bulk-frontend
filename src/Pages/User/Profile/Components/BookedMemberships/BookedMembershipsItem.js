import React from 'react'
import '../Orders/OrderItem.css'
import { useTranslation } from 'react-i18next'

const BookedMembershipsItem = ({ membership }) => {
    const { t , i18n } = useTranslation()
    const {  createdAt , paymentMethod , membershipId } = membership

    return (
        <>
          <div className="card rounded-0 mb-5">
            <div className="post-block product-item">
                <div className="post-content">
                    <div>
                        <p>{t("Order Placed")}</p>
                        <p>{createdAt.slice(0,10)} {t("at")} {createdAt.slice(12,16)} </p>
                    </div>
                    <div>
                        <p>{t("Type")}</p>
                        <p>{t(membershipId?.type)} </p>
                    </div>
                    <div>
                        <p>{t("Payment Method")}</p>
                        <p>{t(paymentMethod)}</p>
                    </div>
                    <div>
                        <p>{t("Duration")}</p>
                        <p>{t(membershipId?.duration)} </p>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{t("Title")} : {i18n.dir() === 'ltr' ? 
                                membershipId?.title?.en :
                                membershipId?.title?.ar}</h5>
                    <h6 className="card-title my-2">{t("Points")} : {membershipId?.points}</h6>
                    <h6 className="card-title my-2">
                        <div className="price-points">
                            <span className="price">{t("Price")} : {membershipId?.price}$</span>                        </div>
                    </h6>
                    <h6 className="card-title my-2">{t("Description")} : 
                        <p className="card-text  my-3">{i18n.dir() === 'ltr' ? 
                                membershipId?.description?.en :
                                membershipId?.description?.ar}
                        </p>     
                    </h6>
                </div>
            </div>
           </div>
        </>
    )
}

export default BookedMembershipsItem