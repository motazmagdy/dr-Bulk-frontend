import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import UserLogin from './Login';
const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const VerifyEmailCode = () => {
    const { code, id } = useParams()
    console.log(code, id)
    console.log("**********")

    const verifyCode = () => {
        axios.get(`${DR_BULK_API}/api/users/verify-email-code/${code}/${id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (code && id) {
            verifyCode()
        }
    }, [code, id])

    return (
        <UserLogin />
    )
}

export default VerifyEmailCode