import React from 'react'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import './Footer.css'

const Footer = () => {
    const [t, i18n] = useTranslation();

    return (
        <div className="footer" dir="ltr">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
                        <div className="footer-widget">
                            <h3 className="footer-title">Contact Infomation</h3>
                            <div className="">
                                <ul>
                                    <li><i className="icon-placeholder"></i>123 st.</li>
                                    <li><i className="icon-phone-call"></i>+123-123-1234</li>
                                    <li><i className="icon-envelope"></i>info@drbulk.com</li>
                                </ul>
                            </div>
                            <div className="footer-social">
                                <Link to='/'><span><i className="fa fa-facebook"></i></span></Link>
                                <Link to='/'><span><i className="fa fa-twitter"></i></span></Link>
                                <Link to='/'><span><i className="fa fa-whatsapp"></i></span></Link>
                                <Link to='/'><span><i className="fa fa-linkedin"></i></span></Link>
                            </div>
                        </div>
                    </div>
                    <div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <div className="footer-widget">
                            <h3 className="footer-title">Quick Links</h3>
                            <ul className="angle angle-right">
                                <li><Link to="/">{t("Home")}</Link></li>
                                <li><Link to="/plans-pricing">{t("Plans & Pricing")}</Link></li>
                                <li><Link to="/instructors">{t("Instructors")}</Link></li>
                                <li><Link to="/eat-smart">{t("Eat Smart")}</Link></li>
                                <li><Link to="/apparel">{t("Apparel")}</Link></li>
                                <li><Link to="/contactus">{t("Contact us")}</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <div className="footer-widget">
                            <h3 className="footer-title">payment methods</h3>
                            <div className="pay-with">
                                <a href=""><img src="/images/mastercard_icon.png" alt="" /></a>
                                <a href=""><img src="/images/visa_icon.png" alt="" className="ms-0" /></a>
                            </div>
                        </div>
                    </div>
                    {/* <div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <div className="footer-widget">
                            <h3 className="footer-title">contact us</h3>
                            <form>
                                <div className="form-group">
                                    <label className="control-label sr-only" htmlFor="name"></label>
                                    <input id="name" type="text" className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <label className="control-label sr-only" htmlFor="Email"></label>
                                    <input id="email" type="text" className="form-control" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <label className="control-label sr-only" htmlFor="Phone"></label>
                                    <input id="phone" type="text" className="form-control" placeholder="Phone" />
                                </div>
                                <div className="form-group">
                                    <label className="control-label sr-only" htmlFor="textarea"></label>
                                    <textarea className="form-control" id="textarea" name="textarea" rows="3" placeholder="textarea"></textarea>
                                </div>
                                <button className="btn btn-primary btn-sm">submit</button>
                            </form>
                        </div>
                    </div> */}
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="tiny-footer">
                            <p>© 2023 - Dr Bulk Gym. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer