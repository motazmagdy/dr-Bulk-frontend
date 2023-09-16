import React, { useEffect, useRef, useState } from 'react'
import MembershipItem from './MembershipItem'
import RoutesSpinner from '../../../Components/Spinners/RoutesSpinner'
import axios from 'axios'
import { Link } from 'react-router-dom'

const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const Memberships = () => {
    const [memberships, setMemberships] = useState([])
    const loading = useRef(true)

    const getMemberships = () => {
        axios.get(`${DR_BULK_API}/api/memberships`)
            .then(res => {
                console.log(res.data)
                setMemberships(res.data.data)
                loading.current = false
            })
            .catch(err => console.log(err))
    }
    useEffect(() => { getMemberships() }, [])

    const arr = []
    arr.Normal = []
    arr.Bronze = []
    arr.Gold = []
    memberships.forEach(m => {
        if (m.type == 'Normal') {
            arr.Normal.push(m)
        } else if (m.type == 'Bronze') {
            arr.Bronze.push(m)
        } if (m.type == 'Gold') {
            arr.Gold.push(m)
        }
    })
    console.log(arr)

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="page-section">
                                <h1 className="page-title ">GYM Memberships</h1>
                                <div className="page-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li><Link to='/'>Home</Link></li>
                                        <li>GYM Memberships</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                loading.current ?
                    <RoutesSpinner />
                    :
                    <div className='container py-5 memberships'>
                        {
                            arr.Normal.length &&
                            <div className="row">
                                <div className="col-12 Normal">
                                    <h3>Normal Memberships</h3>
                                </div>
                                {
                                    arr.Normal.map(n => {
                                        return (
                                            <div key={n._id} className="col-xs-6 col-lg-6 col-md-6 col-sm-12">
                                                <div className="card rounded-0 mb-5">
                                                    <MembershipItem membership={n} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        {
                            arr.Bronze.length &&
                            <div className="row">
                                <div className="col-12 Normal">
                                    <h3>Bronze Memberships</h3>
                                </div>
                                {
                                    arr.Bronze.map(b => {
                                        return (
                                            <div key={b._id} className="col-xs-6 col-lg-6 col-md-6 col-sm-12">
                                                <div className="card rounded-0 mb-5">
                                                    <MembershipItem membership={b} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        {
                            arr.Gold.length &&
                            <div className="row">
                                <div className="col-12 Normal">
                                    <h3>Gold Memberships</h3>
                                </div>
                                {
                                    arr.Gold.map(g => {
                                        return (
                                            <div key={g._id} className="col-xs-6 col-lg-6 col-md-6 col-sm-12">
                                                <div className="card rounded-0 mb-5">
                                                    <MembershipItem membership={g} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
            }
        </>
    )
}

export default Memberships