import React from 'react';
import './ContactUs.css'

const ContactUs = () => {
    return (
        <div className="container contact-us">
            <div className="col-12">
                <h3 className="footer-title">contact us</h3>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 m-auto">
                <div className="footer-widget">
                    <form>
                        <div className="form-group">
                            <label className="control-label" htmlFor="name"></label>
                            <input id="name" type="text" className="form-control" placeholder="Name" />
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="Email"></label>
                            <input id="email" type="text" className="form-control" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="Phone"></label>
                            <input id="phone" type="text" className="form-control" placeholder="Phone" />
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="textarea"></label>
                            <textarea className="form-control" id="textarea" name="textarea" rows="3" placeholder="textarea"></textarea>
                        </div>
                        <button className="btn bulk-dark-btn btn-sm">submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;