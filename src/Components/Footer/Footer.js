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
                            <h3 className="footer-title">{t("Contact Information")}</h3>
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
                            <h3 className="footer-title">{t("Quick Links")}</h3>
                            <ul className="angle angle-right">
                                <li><Link to="/">{t("Home")}</Link></li>
                                <li><Link to="/plans-pricing/gym-membership">{t("Gym Membership")}</Link></li>
                                <li><Link to="/plans-pricing/private-training">{t("Private Training")}</Link></li>
                                <li><Link to="/instructors">{t("Instructors")}</Link></li>
                                <li><Link to="/eat-smart">{t("Eat Smart")}</Link></li>
                                <li><Link to="/apparel">{t("Apparel")}</Link></li>
                                <li><Link to="/contactus">{t("Contact us")}</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className=" col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <div className="footer-widget">
                            <h3 className="footer-title">{t("payment methods")}</h3>
                            <div className="pay-with">
                                <a href=""><img src="/images/mastercard_icon.png" alt="" /></a>
                                <a href=""><img src="/images/visa_icon.png" alt="" className="ms-0" /></a>
                            </div>
                        </div>
                    </div>

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