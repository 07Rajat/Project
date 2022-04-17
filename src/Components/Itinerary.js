
import React, { useEffect, useState } from "react";
import { ButtonGroup, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import swal from 'sweetalert2';
import serverurl from './serverurl'


function Itinerary(props) {
  const navigate = useNavigate();
  let parms = useParams();
  const [itinerary, setItinerary] = useState([]);

  const getCards = async () => {
    const responce = await fetch(serverurl + 'itinerary/' + parms.destid);
    setItinerary(await responce.json());
    console.log(parms.destid);
    console.log(itinerary)
  }

  /* setText(text=itinerary.destIternary) */
  useEffect(() => {
    getCards();
  }, []);

  const Booking = () => {
    if (localStorage.getItem('user-info')) {
      navigate(`/booking/${parms.destid}/${parms.destinationName}`);
    }
    else {
      swal.fire("Please login", "BOOKING")
      //history.push(`/Login`);
    }
  }

  var b = itinerary.destIternary


  return (
    <div className="leftalign" style={{marginTop:"15px"}}>
      <Row>
        <Col xs={6}>
          <h2 className="mb-3">Package Details</h2>
          <h5>Package Name:{parms.destinationName}</h5>
          <h5>Tour Duration: {itinerary.duration} Days</h5>
        </Col>
      </Row>
      <div className="row ">
        <div className="col-sm-12">
          {itinerary.destIternary}
        </div>
      </div>

      <hr className="my-4" />
      <a name="cost"></a>
      <h4>Costing (inc. GST)</h4>
      <h5>1 Adult: {itinerary.destCost_4SP}/- (4 Common Sharing Rooms)</h5>
      <h5>1 Adult: {itinerary.destCost_2SP}/- (2 Common Sharing Rooms)</h5>
      <h5>1 Adult: {itinerary.destCost_1SP}/- (No sharing)</h5>
      <h5>1 Child: {itinerary.destCost_CP}/- (Accomodation with Parent)</h5>
      <h5>1 Child: {itinerary.destCost_CWP}/- (Without Accomodation with Parent)</h5>

      <hr className="my-4" />
      <div className="row">
        <div className="col">
          <h4>Dates</h4>
          <h5>Boarding Date : {itinerary.destStartDate}</h5>
          <h5>Return Date : {itinerary.destEndDate}</h5>
        </div>
        <div className="col">
          <h4>Stays &amp; Meals</h4>
          <h5>All hotels are 3* hotels</h5>
          <h5>All {itinerary.duration} days Tea, breakfast, Lunch, Dinner included</h5>
        </div></div>
      <hr className="my-4" />

      <div className="row">
        <div className="col">
          <h4>Add-Ons</h4>
          <h5>There will be memorable gift for every passenger</h5>
          <h5>Snow sport included</h5>
          <h5>Video and photography men will be there</h5>
        </div>
        <div className="col">
          <h4>Map</h4>
          <div id="map-container-google-1" className="z-depth-1-half map-container mb-5" style={{ height: "100px" }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26997.532381773144!2d77.16961019388917!3d32.23947084279168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39048708163fd03f%3A0x8129a80ebe5076cd!2sManali%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1628628950997!5m2!1sen!2sin" />
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="row">
        <div className="col">
          <h4>Dos</h4>
          <ul>
            <li>Be puntual.</li>
            <li>Take enough of winter clothings.</li>
            <li>Inform everytime you want to go out.</li>
            <li>Snow sports to perform under observation only.</li>
          </ul>
        </div>
        <div className="col">
          <h4>Don't</h4>
          <ul>
            <li>Avoid littering the place.</li>
            <li>Avoid wastage of food and resources.</li>
            <li>Avoid argung with anyone.</li>
          </ul>
        </div>
      </div>
      <ButtonGroup type="btn" className="btn btn-primary justify-content-center" onClick={Booking} >Book Now</ButtonGroup><br />
    </div>
  );
}
export default Itinerary;




