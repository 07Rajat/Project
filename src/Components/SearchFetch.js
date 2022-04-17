import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import SearchCards from './SearchCard';

const SearchFetch = (props) => {

    console.log(props.name)


    const { count, count1 } = useParams();

    /*     console.log(props)
        console.log(props.count1) */
    /*    
       let neww=props.name
       
        if(neww!="*")
       
         {neww=props.match.params.subcatID} 
        */
    console.log(count)
    console.log(count1)
    const [data, setData] = useState([]);
    const getCosts = async () => {
        const responce = await fetch('http://localhost:8082/searchbycost/' + count + "/" + count1);
        setData(await responce.json());
        console.log(...data);
    }
    //const [cost, setCost] = useState([]);
    const getDuration = async () => {
        const responce = await fetch('http://localhost:8082/searchbyDuration/' + count + "/" + count1);
        setData(await responce.json());
        console.log(...data);
    }
    const getDate = async () => {
        const responce = await fetch('http://localhost:8082/searchbyDate/' + count + "/" + count1);
        setData(await responce.json());
        console.log(...data);
    }


    useEffect(() => {
        if (props.name == "cost") { getCosts(); }
        else if (props.name == "duration") { getDuration(); }
        else {
            getDate();
        }
    }, []);


    return (
        <>
            <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-12 mx-auto">
                        <div className="row my-2">

                            {data.map((curElem, index) => {
                                const {
                                    Duration,
                                    destCost_1SP,
                                    destCost_2SP,
                                    destCost_4SP,
                                    destCost_CP,
                                    destCost_CWP,
                                    destEndDate,
                                    destIternary,
                                    destMap,
                                    destStartDate,
                                    destid
                                } = curElem;
                                console.log(destCost_4SP);

                                return (
                                    <>

                                        <SearchCards name={destid} />
                                    </>
                                );
                            })} </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default SearchFetch;
