import React, { useEffect, useState }  from "react";
import { Card } from "react-bootstrap";
import { useNavigate,Navigate, Link} from "react-router-dom";
export default function DestinationCard(props) {
    let navigate = useNavigate();
    return (
        <div className="container-fluid mt-2">
            <div className="row">
                <div className="col-12 mx-auto">
                    <div className="row my-2">
                        {props.cards.map((curElem, index) => {
                            const { destid, subdestid, subcatID, destinationName, DestImg, flag } = curElem;
                            return (
                                <div className="col-12  col-md-6  col-lg-4  col-xl-3 my-4  col-md-3 col-sm-6 col-xs-6 cardshadow">
                                    <Card style={{ width: "15rem" }} key={index} className="box zoom">
                                        <Card.Img className="img-fliud" variant="top" src={`/${DestImg}`} width="100%" value={destid}
                                            onClick={() =>
                                                navigate((flag === "N") ? ("/destination/"+subcatID):("/itinerary/" + destinationName + "/" + destid))
                                            }>
                                        
                                        </Card.Img>
                                        <Card.Body className="box">
                                            <Card.Title >{destinationName}</Card.Title>
                                        </Card.Body>
                                        
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
