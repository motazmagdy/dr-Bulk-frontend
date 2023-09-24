import React from 'react';
import './ContactUs.css'
import { useTranslation } from "react-i18next";

const ContactUs = () => {
    const [t, i18n] = useTranslation();

    return (
        <div className="container contact-us">
            <div className="row">
                <div className="col-12">
                    <h3 className="footer-title">{t("Contact us")}</h3>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 m-auto">
                    <div className="footer-widget">
                        <form>
                            <div className="form-group">
                                <label className="control-label" htmlFor="name"></label>
                                <input id="name" type="text" className="form-control" placeholder={t("Name")} />
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="Email"></label>
                                <input id="email" type="text" className="form-control" placeholder={t("Email")} />
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="Phone"></label>
                                <input id="phone" type="text" className="form-control" placeholder={t("Phone Number")} />
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="textarea"></label>
                                <textarea className="form-control" id="textarea" name="textarea" rows="3" placeholder={t("Textarea")}></textarea>
                            </div>
                            <button className="btn bulk-dark-btn btn-sm">{t("submit")}</button>
                        </form>
                    </div>
                </div>

                <div className="col-12">
                    <div className="map">
                        <iframe title="Dr Bulk Gym location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.77769408487!2d31.176061705197583!3d30.059462760847804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584f7de239bbcd%3A0xca7474355a6e368b!2sGiza%20Necropolis!5e0!3m2!1sen!2seg!4v1695053419117!5m2!1sen!2seg" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;