import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <hr></hr>
      <div className="footer bg-light" style={{ padding: "2rem", color: "#000000 " }}>
        <div className="float-left" style={{ position: 'absolute', left: 10 }}>
          <p>
            © All rights reserved to Daily Destination Co.<br />
            <Link to="/contactus" >Contact Us</Link> | <Link to="/TC" >Terms & Conditions</Link> | <Link to="/feedback">Feedback</Link>
            
          </p>
        </div>
        <div className="float-right" style={{ position: 'absolute', right: 10 }}>
          <a href="#">Back to top</a>
        </div>
      </div>
    </>
  );
}
export default Footer;