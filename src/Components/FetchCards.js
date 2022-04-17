import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DestinationCards from './DestinationCards';
import serverurl from './serverurl'
const FetchCards = (props) => {
    let parms =useParams();
    let neww = props.name
    if (neww != "*") { neww = parms.subcatID }
    const [cards, setCards] = useState([]);
    
    const getCards = async () => {
        const responce = await fetch(serverurl+'destination/'+neww);
        setCards(await responce.json());
        console.log(cards);
    }
    useEffect(() => {
        getCards();
    },[neww]);
    return (
        <DestinationCards cards={cards} />
    )
}
export default FetchCards;
