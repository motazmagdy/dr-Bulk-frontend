
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import RoutesSpinner from '../../../../../Components/Spinners/RoutesSpinner';
import BookedMembershipsItem from './BookedMembershipsItem';
const DR_BULK_API = process.env.REACT_APP_DR_BULK_API ;

export const BookedMemberships = ()=>{
    const [userMemberships, setUserMemberships] = useState([]) ;
    const loading = useRef(true) ;

    const getUserMemberships = () => {
        axios.get(`${DR_BULK_API}/api/book-membership/user-booking`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          })
            .then(res => {
                setUserMemberships(res?.data?.data)
                loading.current = false
            })
            .catch(err => console.log(err))
    }
    useEffect(() => { getUserMemberships() }, []) ;

    return (
        <>
            <div className="space-medium">
                <div className="container p-0">
                    <div className="row">
                        {
                            loading.current ?
                                <RoutesSpinner />
                                :
                                userMemberships.map(membership => {
                                    return (
                                        <div key={membership._id} className="col-12">
                                            <BookedMembershipsItem membership={membership} />
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