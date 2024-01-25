
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import RoutesSpinner from '../../../../../Components/Spinners/RoutesSpinner';
import BookedEatSmartItem from './BookedEatSmartItem';
const DR_BULK_API = process.env.REACT_APP_DR_BULK_API ;

export const BookedEatSmart = ()=>{
    const [userEatSmart, setEatSmart] = useState([]) ;
    const loading = useRef(true) ;
    const getUserEatSmart = () => {
        axios.get(`${DR_BULK_API}/api/book-eat-smart/user-booking`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          })
            .then(res => {
                setEatSmart(res?.data?.data)
                loading.current = false
            })
            .catch(err => console.log(err))
    }
    useEffect(() => { getUserEatSmart() }, []) ;

    return (
        <>
            <div className="space-medium">
                <div className="container p-0">
                    <div className="row">
                        {
                            loading.current ?
                                <RoutesSpinner />
                                :
                                userEatSmart.map(eatSmart => {
                                    return (
                                        <div key={eatSmart._id} className="col-12">
                                            <BookedEatSmartItem eatSmart={eatSmart} />
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}