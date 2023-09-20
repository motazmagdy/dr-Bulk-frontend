import React, { useEffect, useRef, useState } from 'react'
import EatSmartItem from './EatSmartItem/EatSmartItem';
import RoutesSpinner from '../../../Components/Spinners/RoutesSpinner'
import axios from 'axios'
import { Link } from 'react-router-dom'
const DR_BULK_API = process.env.REACT_APP_DR_BULK_API

const EatSmart = () => {

    const [eatSmartPlans, setEatSmartPlans] = useState([])
    const loading = useRef(true)

    const getEatSmarts = () => {
        axios.get(`${DR_BULK_API}/api/eat-smart`)
            .then(res => {
                console.log(res.data)
                setEatSmartPlans(res.data.data)
                loading.current = false
            })
            .catch(err => console.log(err))
    }
    useEffect(() => { getEatSmarts() }, [])

    const plans = []
    plans.Weekly = []
    plans.Monthly = []
    eatSmartPlans.forEach(plan => {
        if (plan.type == 'Weekly') {
            plans.Weekly.push(plan)
        } else if (plan.type == 'Monthly') {
            plans.Monthly.push(plan)
        } 
    })
    console.log(plans)

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="page-section">
                                <h1 className="page-title ">Eat-Smart</h1>
                                <div className="page-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li><Link to="/">Home</Link></li>
                                        <li>Eat-Smart</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 hidden-xs">
                            <div className="page-section">
                                <p>Please Enjoy!! Healthy Eating and Dietitian blogs. Get nutrition advice, tips and facts from Jessica</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container py-5 memberships'>
                        <div className="row">
                            <div className="col-12 Normal">
                                <h3>Our Plans</h3>
                            </div>
                            {
                                plans.Weekly.map(plan => {
                                    return (
                                        <div key={plan._id} className="col-xs-6 col-lg-6 col-md-6 col-sm-12">
                                            <div className="card rounded-0 mb-5">
                                                <EatSmartItem eatSmartPlan={plan} />
                                            </div>
                                        </div>
                                    )
                                })
                            }

{
                                plans.Monthly.map(plan => {
                                    return (
                                        <div key={plan._id} className="col-xs-6 col-lg-6 col-md-6 col-sm-12">
                                            <div className="card rounded-0 mb-5">
                                                <EatSmartItem eatSmartPlan={plan} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
            {/* <div className="space-medium">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="post-block">
                                <div className="post-img">
                                    <a href="#" className="imghover">
                                        <img src="./images/post-img-small-1.jpg" alt="" className="img-responsive" /></a>
                                </div>
                                <div className="post-content">
                                    <div className="meta">
                                        <span className="meta-categories"><a href="#">diet tips</a></span>
                                        <span className="meta-date">30 July, 2020</span>
                                    </div>
                                    <h4><a href="#" className="title">Green smoothie to go</a></h4>
                                    <p>Nam vitae aliquet metus semper vehicula juonecin dolor....</p>
                                    <a href="#" className="btn-link">read more</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="post-block">
                                <div className="post-img">
                                    <a href="#" className="imghover">
                                        <img src="./images/post-img-small-2.jpg" alt="" className="img-responsive" />
                                    </a>
                                </div>
                                <div className="post-content">
                                    <div className="meta">
                                        <span className="meta-categories"><a href="#">Weight Loss</a></span>
                                        <span className="meta-date">29 July, 2020</span>
                                    </div>
                                    <h4><a href="#" className="title">Inflammation Fighting Foods</a></h4>
                                    <p>Vitae aliquet metus semperveicula juonecin doloreer ornare....</p>
                                    <a href="#" className="btn-link">read more</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="post-block">
                                <div className="post-img">
                                    <a href="#" className="imghover">
                                        <img src="./images/post-img-small-3.jpg" alt="" className="img-responsive" /></a>
                                </div>
                                <div className="post-content">
                                    <div className="meta">
                                        <span className="meta-categories"><a href="#">Health Care</a> </span>
                                        <span className="meta-date">28 July, 2020</span>
                                    </div>
                                    <h4><a href="#" className="title">Habits, health &amp; fitness news catchup</a></h4>
                                    <p>Aliquet metus semper vehiculase juonecin dolor sederate....</p>
                                    <a href="#" className="btn-link">read more</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="post-block">
                                <div className="post-img">
                                    <a href="#" className="imghover">
                                        <img src="./images/post-img-small-4.jpg" alt="" className="img-responsive" /></a>
                                </div>
                                <div className="post-content">
                                    <div className="meta">
                                        <span className="meta-categories"><a href="#">Health Care</a> </span>
                                        <span className="meta-date">27 July, 2020</span>
                                    </div>
                                    <h4><a href="#" className="title">Drinking water dilutes
                                        stomach acid</a></h4>
                                    <p>Juctus metuis acmetus pharetra efficitur velit neincidu...</p>
                                    <a href="#" className="btn-link">read more</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="post-block">
                                <div className="post-img">
                                    <a href="#" className="imghover">
                                        <img src="./images/post-img-small-5.jpg" alt="" className="img-responsive" />
                                    </a>
                                </div>
                                <div className="post-content">
                                    <div className="meta">
                                        <span className="meta-categories"><a href="#">Weight Loss</a></span>
                                        <span className="meta-date">26 July, 2020</span>
                                    </div>
                                    <h4><a href="#" className="title">Top 5 natural therapies
                                        to fight hpylori</a></h4>
                                    <p>Vivamus qususcipit auguenon placerat urnurabitursed...</p>
                                    <a href="#" className="btn-link">read more</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="post-block">
                                <div className="post-img">
                                    <a href="#" className="imghover">
                                        <img src="./images/post-img-small-6.jpg" alt="" className="img-responsive" /></a>
                                </div>
                                <div className="post-content">
                                    <div className="meta">
                                        <span className="meta-categories"><a href="#">Weight Loss</a>  </span>
                                        <span className="meta-date">25 July, 2020</span>
                                    </div>
                                    <h4><a href="#" className="title">Essential oils for fixing
                                        the gut</a></h4>
                                    <p>Morbi ut metus in magna luctus veneuis veli vehicula... </p>
                                    <a href="#" className="btn-link">read more</a>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="st-pagination">
                                <ul className="pagination">
                                    <li><a href="#" aria-label="previous"><span aria-hidden="true">Previous</span></a> </li>
                                    <li className="active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li> <a href="#" aria-label="Next"><span aria-hidden="true">Next</span></a> </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};


export default EatSmart;