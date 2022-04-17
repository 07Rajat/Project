import { render } from "@testing-library/react";
import React from "react";
function ContactUs() {
    return (
        <>
        
        <div className="row mt-4">
            <div className="col-sm-1"></div>
            <div className="col-sm-5">
                <h3>Contact Us</h3>
                <h5>Corporate Office</h5>
                C-56/1, Anusandhan Bhawan, Institutional Area, Sector 62, Noida, Uttar Pradesh 201307<br /><br />
                <h5>Call us</h5>
                +91 99999 99999, +91 88888 88888<br /><br />
                <h5>Email us</h5>
                <a className="nav-link " href="mailto:dailydestination@gmail.com ">thatsdailydestination@gmail.com</a><br /><br />
            </div>

            <div className="col-sm-6">
                <div id="map-container-google-1" className="z-depth-1-half map-container mb-5" style={{ height: "100px" }}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14009.858561757761!2d77.3630556!3d28.6158333!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd244f3b1a4280b14!2sCentre%20for%20Development%20of%20Advanced%20Computing!5e0!3m2!1sen!2sin!4v1649235873295!5m2!1sen!2sin" loading="lazy"></iframe>
                </div>
            </div>
        </div>
        </>
    )
}
export default ContactUs;