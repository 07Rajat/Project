import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";



const SearchCards = (props) => {
  let navigate = useNavigate();
  
/*   if(props.cards.length == 0){
  return <Itenerary name={props.cards}/>
 
}else{   */
    console.log(props.name)
    const [cards1, setCards1] = useState([]);
    const getCards1 = async () => {
        const responce = await fetch('http://localhost:8082/destid/'+ props.name);
        setCards1(await responce.json());
        console.log(...cards1);
       
    }

    useEffect(() => {
        getCards1();
    }, []);

  return (
    <>
      
              {[cards1].map((curElem,index) => {
                const {
                  destid,
                  Subdestid,
                  subcatID,
                  destinationName,
                  destImg,
                  flag,
                } = curElem;
                console.log(destImg);
                
                return (
                  <>
                    <div className="col-12  col-md-6  col-lg-4  col-xl-3 my-4  ">
                    {/* <Link style={{ textDecoration: 'none', color:'black' }} to={'/destination/' + DestImg}> */}
                      <Card
                        style={{ width: "12rem" }}
                        key={index}
                        className="box zoom"
                      >
                        
                        <Card.Img
                          className="img-fliud "
                          variant="top"
                          src={`/${destImg}`}
                          width="100%"
                          value={destid}
                          
                          onClick={() =>
                            navigate(flag==="N"? ("/destination/" + subcatID):("/itinerary/"+destinationName +"/" +destid))
                          }
                        />
                        
                        <Card.Body>
                          <Card.Title >{destinationName}  </Card.Title>
                          <Card.Text></Card.Text>
                          {/* <Button variant="primary">Go somewhere</Button> */}
                        </Card.Body>
                      </Card>{/* </Link> */}
                    </div>
                  </>
                );
})}
           
    </>
  );
};
export default SearchCards;
