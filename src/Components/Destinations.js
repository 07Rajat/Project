import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Countries from './Countries';
import { useNavigate } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
const Destinations = () => {
  
  const history=useNavigate();
  return (<div>
    {/* {console.log("");
    const[Country,setCountry]=useState({Countries});
    console.log(Country);
    Country.Countries.map((country)=>{ */}
    {Countries.map((country) => {
      const { destid, subdestid, subcatid, destination_name, DestImg, flag } = country;
      return (
          <NavDropdown.Item as={Link} to={`/destination/${subcatid}`}
            /* onClick={() => history.push(flag === "N" ? ("/destination/" + subcatid) : ("/itinerary/" + destination_name + "/" + destid))} */
          >{`${destination_name}`}</NavDropdown.Item>
      )
    })
    }
  </div>
  );
};
export default Destinations;