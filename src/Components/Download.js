import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import serverurl from "./serverurl";
function Download() {
    let user = (localStorage.getItem('user-email'));

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    console.log(user)
    const getData = async () => {
        const responce = await fetch(serverurl+`download/${user}`);
        setData(await responce.json());

    }
    const getData1 = async () => {
        const responce = await fetch(serverurl+`UserDetails/${user}`);
        setData1(await responce.json());

    }

    useEffect(() => {
        getData();
        getData1();

    }, []);
    console.log(data)
    console.log(data1)

    function myFunction() {
        window.print();
    }

    //For submit button
    /* function relocate_home() {
        window.open('/');
        window.setTimeout(function() {
           window.close();
        }, 1)
    } */

    //For register button
    function forward_register() {
        window.open('UserRegistration.html', '_blank');
    }

    return (
        <>

            <div className="row">
                <div className="col-1 ">

                </div>
                <div className="col-md-10 col-lg-10 p-5 border">

                    <center>   <h3 >Booking Details</h3></center>
                    <hr className="my-4 " />
                    <table>
                        <thead>
                            {data1.map((curE, index) => {

                                return (<>
                                    <b> <h5 > <tr>
                                        <td >User ID:  </td>
                                        <td >{curE.userid}</td>
                                    </tr>
                                        <tr>
                                            <td scope="col">Name   :</td>
                                            <td >{curE.userFName}</td>
                                            <td >{curE.userLName}</td>
                                        </tr> </h5 ></b>
                                </>)
                            })}
                        </thead>
                    </table>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">BkID</th>
                                    <th scope="col">Booking Date</th>
                                    <th scope="col">Destination Name</th>
                                    <th scope="col">Mob</th>
                                    <th scope="col">No. of Person</th>
                                    <th scope="col">Net Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((curElem, index) => {

                                    return (<>

                                        <tr>


                                            <td>{curElem.bkid}</td>
                                            <td>{curElem.date}</td>
                                            <td>{curElem.destname}</td>
                                            <td>{curElem.mobno}</td>
                                            <td>{curElem.totalpersons}</td>
                                            <td>{curElem.bktotalcost}</td>
                                        </tr>
                                    </>)
                                })}

                            </tbody>
                        </table>
                    </div>
                  

                    <div className="col-12 d-flex justify-content-center mt-2 ">
                        <button className="btn btn-primary hidden-print " onClick={myFunction}><span className="glyphicon glyphicon-print " aria-hidden="true "></span> Print</button>
                        <button className="btn btn-dark mx-3 " onClick={() => navigate("/")}>Back to Home</button>
                    </div>
                </div>
                <div className="col-1 ">

                </div>
            </div>
        </>
    )
}
export default Download;