import axios from 'axios'
import { createContext, useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const MembershipsContext = createContext({})

const MembershipsProvider = ({ children }) => {
    const { t, i18n } = useTranslation()

    const bookMembership = (membershipId) => {
        return () => {
            const paymentMethod = 'COD'
            // const startsAt = Date  // TODO: send startsAt if user has the feature of adding starting date 

            axios.post(`${DR_BULK_API}/api/book-membership`, { membershipId, paymentMethod }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                },
            })
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        toast.success(t("You have booked the membership successfully"));
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <MembershipsContext.Provider value={{ bookMembership }}>
            {children}
        </MembershipsContext.Provider>
    )
}

export default MembershipsProvider

export const useMemberships = () => {
    return useContext(MembershipsContext)
}