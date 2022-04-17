import React, { useEffect } from "react";
import { useParams } from "react-router";
import swal from "sweetalert2";
import serverurl from "./serverurl";


function Invoice() {
    let email = (localStorage.getItem('user-email'));
    const { destid, destinationName, cost, customers, persons, adults, children, destStartDate, duration, destEndDate, bkid } = useParams();
    const cust = JSON.parse(customers)
    const SendInvoiceMail = async () => {
        const responce = await fetch(serverurl+`sendInvoice/${bkid}/${email}/${destinationName}/${cost}/${destStartDate}/${destEndDate}/${duration}/${persons}`)
        const data23 = await responce.json();
        if (data23 == true) {
            swal.fire("Email sent!", "Invoice has been sent on to your mailid", "success");
        }
        else {
            swal.fire("Error", "Oops something went wrong", "error");
        }
    }

    useEffect(() => {
        SendInvoiceMail()
    }, []);

    function myFunction() {
        window.print();
    }
    //For submit button
    function relocate_home() {
        window.close();
    }

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

                    <h1 className="mb-3">Invoice</h1>
                    Invoice Number : 123708001
                    <hr className="my-4" />

                    <h4>Tour Package Details</h4>

                    <div className="row">
                        <div className="col-sm-6">
                            <form className="row g-3 mb-3">

                                <div className="col-sm-12">
                                    <label for="PackageNameTitle" className="form-label">Package Name: </label>
                                    <label for="PackageName" className="form-label float-right"></label>{destinationName}
                                </div>
                                <div className="col-sm-12">
                                    <label for="SDTitle" className="form-label">Tour Start Date &amp; Time: </label>
                                    <label for="SD" className="form-label float-right"> {destStartDate}</label>
                                </div>

                                <div className="col-sm-12">
                                    <label for="DDTitle" className="form-label">Duration of Days: </label>
                                    <label for="DD" className="form-label float-right"> {duration} Days</label>
                                </div>
                                <div className="col-sm-12">
                                    <label for="EDTitle" className="form-label">Return Date &amp; Time: </label>
                                    <label for="ED" className="form-label float-right"> {destEndDate}</label>
                                </div>

                            </form>
                        </div>

                        <div className="col-sm-6">
                            <div className="thumbnail">
                                <img src="pack.jpg" alt="Fjords" style={{ width: '100%', height: "100%" }} />
                            </div>
                        </div>

                    </div>

                    <hr className="my-4 " />
                    <h4>Passengers Details</h4>
                    <h6>No. of Passengers : {persons}</h6>
                    <h6>{adults} Adults | {children} Child</h6>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>

                                    <th scope="col">Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">DOB</th>
                                    <th scope="col">Id Proof Type</th>
                                    <th scope="col">Id Proof</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cust.map((curElem, index) => {
                                    return (<>
                                        <tr>
                                            <td>{curElem.name}</td>
                                            <td>{curElem.age}</td>
                                            <td>{curElem.gender}</td>
                                            <td>{curElem.dob}</td>
                                            <td>{curElem.govidType}</td>
                                            <td>{curElem.govid}</td>
                                        </tr>
                                    </>)
                                })}
                            </tbody>
                        </table>
                    </div>
                    <hr className="my-4 " />
                    <h4>Fare and Additional Information</h4>
                    <div className="row ">
                        <div className="col-sm-6 ">
                            <form className="row g-3 mt-3 ">
                                <div className="col-sm-12 ">
                                    <label for="EDestinationTitle " className="form-label ">Net Payable Amount: </label>
                                    <label for="EDestination " className="form-label float-right "> {cost}/-</label>
                                </div>
                                <div className="col-sm-12 ">
                                    <label for="EDestinationTitle " className="form-label ">Payment mode: </label>
                                    <label for="EDestination " className="form-label float-right "> Credit Card</label>
                                </div>
                                <div className="col-sm-12 ">
                                    <label for="EDestinationTitle " className="form-label ">Transaction Reference Id: </label>
                                    <label for="EDestination " className="form-label float-right "> 8707045EF0503337</label>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-6 ">
                            <h6>Additional Information</h6>
                            <ul>
                                <li><a href="/TC" target="_blank">Terms and Conditions</a> page.</li>
                                <li>Also read the <a href="/TC" target="_blank">refund/cancellation policy</a>.</li>
                            </ul>

                        </div>
                    </div>

                    <div className="col-12 d-flex justify-content-center mt-4 ">
                        <div className="form-check">
                            
                            <label className="form-check-label" for="flexCheckChecked">
                               Invoice has been sent to your Mail Id
                            </label>
                        </div>
                    </div>

                    <div className="col-12 d-flex justify-content-center mt-2 ">
                        <button className="btn btn-primary hidden-print mx-3 "  onClick={myFunction} ><span className="glyphicon glyphicon-print " aria-hidden="true "></span> Print</button>
                        <button className="btn btn-dark ml-1 " onClick={relocate_home}>Back to Home</button>
                    </div>
                </div>
                <div className="col-1 ">
                </div>
            </div>
        </>
    )
}
export default Invoice;