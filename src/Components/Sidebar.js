import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (    
      <ListGroup className="sidebarlist" style={{paddingLeft:"20px"}}><br></br>
        <h5>Domestic</h5>
        <Link className="list-group-item list-group-item-action" to="/itinerary/Stay at Shimla/53" action>Shimla</Link>
        <Link className="list-group-item list-group-item-action" to="/destination/104" action>Himachal</Link>
        <Link className="list-group-item list-group-item-action" to="/destination/100" action>Kerala</Link><br></br>
        <h5>International</h5>
        <Link className="list-group-item list-group-item-action" to="/destination/110" action>China</Link>
        <Link className="list-group-item list-group-item-action" to="/destination/106" action>Swizerland</Link>
        <Link className="list-group-item list-group-item-action" to="/destination/107" action>America</Link>
        <Link className="list-group-item list-group-item-action" to="/destination/111" action>Thailand</Link>
        <Link className="list-group-item list-group-item-action" to="/destination/112" action>Dubai</Link>
      </ListGroup>
    );
}
export default Sidebar;