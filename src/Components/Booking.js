
import React, { useRef, useState, useEffect } from "react";
import { Route, useParams } from "react-router";
import serverurl from "./serverurl";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Link } from "react-router-dom";
import book from '../assets/book.jpg'

const initialValues = {
    add1: "", city: "", state: "", pincode: "", mobno: "", emailid: (localStorage.getItem('user-email')),
    destid: "", mailid: (localStorage.getItem('user-email')), destname: "", noofadults: "",
    noofchildrens: "", totalpersons: "", date: "", bktotalcost: ""
}

const validationSchema = Yup.object({
    add1: Yup.string().required('Address Required!'),
    city: Yup.string().required('City Required!'),
    state: Yup.string().required('State Required!'),
    pincode: Yup.string().required('Pincode Required!'),
    mobno: Yup.string().required('Mobile No Required!'),
    emailid: Yup.string().email('Invalid email id').required('EmailId Required')
})

const Booking = () => {

    const { destid, destinationName } = useParams();
    const [destinationDetails, setDestinationDetails] = useState();
    const getDetails = async () => {

        const responce = await fetch(serverurl + `itinerary/${destid}`);
        setDestinationDetails(await responce.json());

    }

    function myFunction() {
        window.print();
    }

    //For submit button
    function relocate_home() {
        window.open('/', '_blank');
        window.setTimeout(function () {
            window.close();
        }, 1)
    }
    const [data, setData] = useState([]);
    const getData = async () => {
        const responce = await fetch(serverurl + `itinerary/${destid}`);
        setData(await responce.json());

    }


    useEffect(() => {
        getDetails();
        getData()
    }, []);


    var [adults, setAdults] = useState(0);
    var [children, setChildren] = useState(0);
    var [persons, setPersons] = useState(1);
    var [cost, setCost] = useState();
    var [bookingId, setBookingId] = useState();
    var [destinationId, setDestinationId] = useState();
    var [destination, setDestination] = useState();
    var [date, setdate] = useState(new Date().toISOString().slice(0, 10));

    const formik = useFormik(
        {
            initialValues,
            validationSchema,
            onSubmit: values => {
                //setDestinationId(destinationDetails.destid);
                //setDestination(destinationDetails.destination.destName);
                let bookingTour = JSON.stringify(values);
                console.log(JSON.parse(bookingTour));
                alert(JSON.stringify(values));
                fetch(serverurl + "bookings/add", {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: bookingTour
                })


                let customers = JSON.stringify(inputList);
                console.log(JSON.parse(customers));
                alert(JSON.stringify(inputList));
                fetch(serverurl + "customers/add", {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: customers
                })
                window.open(`/payment/${destid}/${destinationName}/${cost}/${customers}/${persons}/${adults}/${children}/${data.destStartDate}/${data.duration}/${data.destEndDate} `, '_blank');

            }
        })


    var [inputList, setInputList] = useState([{ customerid: "", mailid: (localStorage.getItem('user-email')), name: "", dob: "", gender: "", age: "", govidType: "", govid: "", date: new Date().toISOString().slice(0, 10) }]);

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);

    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {

        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        setPersons(persons - 1);


    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { customerid: "", mailid: (localStorage.getItem('user-email')), name: "", dob: "", gender: "", age: "", govidType: "", govid: "", date: new Date().toISOString().slice(0, 10) }]);
        setPersons(persons + 1);
    };
    let destnameref = useRef();
    let radio1ref = useRef();
    let radio2ref = useRef();
    let radio3ref = useRef();
    let radio4ref = useRef();
    let radio5ref = useRef();
    let finalRadioref = useRef();
    let roomPersons = 0;
    let childRoom = 0;
    function handleRadio1() {
        roomPersons = radio1ref.current.value;
        finalRadioref.current.checked = false;
    }
    function handleRadio2() {
        roomPersons = radio2ref.current.value;

        finalRadioref.current.checked = false;
    }

    function handleRadio3() {
        roomPersons = radio3ref.current.value;

        finalRadioref.current.checked = false;
    }

    function handleRadio4() {
        childRoom = radio4ref.current.value;

        finalRadioref.current.checked = false;
    }

    function handleRadio5() {
        childRoom = radio5ref.current.value;

        finalRadioref.current.checked = false;
    }

    function generateDetails() {
        setDestinationId(destinationDetails.destid);
        //formik.values.destid=destinationId;
        console.log(destinationDetails);
        setDestination(destinationName);
        // formik.values.destname=destination;
        //destnameref.current.value=destination;



        //setAdults(3);
        //setAdults(adults=4);


        for (let i = 0; i < persons; i++) {


            if (inputList[i].age >= 1 && inputList[i].age < 12) {

                setChildren(children = children + 1);
            }
            else {
                setAdults(adults = adults + 1);
            }
        }




        if (roomPersons == 4 && childRoom == 1) {
            setCost(adults * destinationDetails.destCost_4SP);

        }
        else if (roomPersons == 4 && childRoom == 0) {

            setCost(adults * destinationDetails.destCost_4SP);
        }
        else if (roomPersons == 2 && childRoom == 1) {
            setCost(adults * destinationDetails.destCost_2SP);
        }
        else if (roomPersons == 2 && childRoom == 0) {
            setCost(adults * destinationDetails.destCost_2SP);
        }
        else if (roomPersons == 1 && childRoom == 1) {
            setCost(adults * destinationDetails.destCost_1SP);
        }
        else if (roomPersons == 1 && childRoom == 0) {
            setCost(adults * destinationDetails.destCost_1SP);
        }
    }
    return (<>

        <div className="row">
            <div className="col-1 ">
            </div>
            <div className="col-md-10 col-lg-10 p-5 border">
                <h1 className="mb-3">Booking Details</h1>
                <hr className="my-4" />

                <div className="row">
                    <div className="col-sm-6">
                        <h4 className="row g-3 mb-3">Tour Package Details</h4>
                        <form className="">
                            <div className="col-sm-12">
                                <label for="PackageNameTitle" className="form-label">Package Name: </label>
                                <label for="PackageName" className="form-label float-right"> {destinationName}</label>
                            </div>
                            <div className="col-sm-12">
                                <label for="SDTitle" className="form-label"></label>Tour Start Date:   {data.destStartDate}
                            </div>
                            <div className="col-sm-12">
                                <label for="DDTitle" className="form-label">Duration of Days: </label>
                                <label for="DD" className="form-label float-right">  </label>{data.duration} Days
                            </div>
                            <div className="col-sm-12">
                                <label for="EDTitle" className="form-label">Return Date: </label>{data.destEndDate}
                                <label for="ED" className="form-label float-right"> </label>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-6">
                        <div className="thumbnail">
                            <img src={book} alt="book.jpg"/>
                        </div>
                    </div>

                </div>


                <hr className="my-4 " />
                <h4>Passengers Details</h4>

                <form >
                    <div className="row ">

                        {inputList.map((x, i) => {
                            return (<>
                                <div className="table-responsive">
                                    <div className="container">
                                        <table id="myTable" className=" table order-list table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Age</th>
                                                    <th scope="col">Gender</th>
                                                    <th scope="col">DOB</th>
                                                    <th scope="col">Gov.Id Type</th>
                                                    <th scope="col">Gov.Id No.</th>
                                                    <th>Remove Passenger</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>

                                                    <input type="text" className="form-control " name="mailid" value={x.mailid} onChange={e => handleInputChange(e, i)} disabled hidden />

                                                    <td><input type="text" className="form-control " name="name" placeholder="Enter Full Name " value={x.name} onChange={e => handleInputChange(e, i)} required /></td>
                                                    <td><input type="text" className="form-control " name="age" placeholder="Age" value={x.age} onChange={e => handleInputChange(e, i)} required /></td>
                                                    <td><input type="text" className="form-control " name="gender" value={x.gender} onChange={e => handleInputChange(e, i)} required /> </td>
                                                    <td><input type="date" className="form-control " name="dob" placeholder="dob" value={x.dob} onChange={e => handleInputChange(e, i)} required /></td>
                                                    <td>< input type="text" className="form-control " name="govidType" placeholder="GovidType" value={x.govidType} onChange={e => handleInputChange(e, i)} required /></td>
                                                    <td><input type="text" className="form-control " name="govid" placeholder="Govid Number " value={x.govid} onChange={e => handleInputChange(e, i)} required /></td>
                                                    <td className="col-sm-2">
                                                        <a className="deleteRow"></a>
                                                        <div className="btn-box" >
                                                            {inputList.length !== 1 && <button className="btn btn-danger " onClick={() => handleRemoveClick(i)}>X</button>}

                                                        </div>
                                                    </td>

                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                </div>

                                {inputList.length - 1 === i && <button className="btn btn-outline-success" onClick={handleAddClick}><b>Add Passenger</b></button>}
                            </>);
                        })}
                        <hr></hr>

                    </div>
                </form>
                {/*  ****************************************************
                            *****************************************************
                      
                      ******************************************************* */}

                <form onSubmit={formik.handleSubmit}>

                    {formik.touched.add1 && formik.errors.add1 ?
                        <div className='error'>{formik.errors.add1}</div> : null}

                    {formik.touched.city && formik.errors.city ?
                        <div className='error'>{formik.errors.city}</div> : null}
                    {formik.touched.state && formik.errors.state ?
                        <div className='error'>{formik.errors.state}</div> : null}
                    {formik.touched.pincode && formik.errors.pincode ?
                        <div className='error'>{formik.errors.pincode}</div> : null}

                    {formik.touched.mobno && formik.errors.mobno ?
                        <div className='error'>{formik.errors.mobno}</div> : null}

                    <table border='0' cellPadding="10" >

                        <th>Address </th>
                        <th>City</th>
                        <th>State</th>
                        <tr>
                            <td >

                                <input type='text' className='form-control' id='add1' name='add1' size='25'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.add1} />
                            </td>
                            <td>
                                <input type='text' className='form-control' id='city' name='city' size='25'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.city} />
                            </td>

                            <td>
                                <input type='text' className='form-control' id='state' name='state' size='25'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.state} />
                            </td>
                        </tr>

                        <th>Pincode</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <tr>
                            <td>
                                <input type='text' className='form-control' id='pincode' name='pincode' size='25'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.pincode} />
                            </td>

                            <td>
                                <input type='text' className='form-control' id='mobno' name='mobno' size='25'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.mobno} />
                            </td>

                            <td>
                                <input type='text' className='form-control' id='emailid' name='emailid' size='25'

                                    value={(localStorage.getItem('user-email'))} disabled />
                            </td></tr>



                        <th>No of Pesrsons In each Room</th>
                        <th>Child with Parent?</th>

                        <tr>


                            <td>
                                <input type='radio' id='4Persons' name='personsInRoom' value="4" required onClick={handleRadio1} ref={radio1ref} />
                                <label for="4 Persons">4 Persons</label><br></br>

                                <input type='radio' id='2Persons' name='personsInRoom' value="2" onClick={handleRadio2} ref={radio2ref} />
                                <label for="2 Persons">2 Persons</label><br></br>

                                <input type='radio' id='1Person' name='personsInRoom' value="1" onClick={handleRadio3} ref={radio3ref} />
                                <label for="1 Persons">1 Persons</label>
                            </td>

                            <td>
                                <input type='radio' id='childWithParentYes' name='childWithParent' value="1" required onClick={handleRadio4} ref={radio4ref} />
                                <label for="yes">YES</label><br></br>

                                <input type='radio' id='childWithParentNo' name='childWithParent' value="0" onClick={handleRadio5} ref={radio5ref} />
                                <label for="no">NO</label><br></br><br></br>
                            </td>

                            <td>
                                <input type='radio' id='tc' name='tc' value="1" required onClick={generateDetails} ref={finalRadioref} />
                                <label for="tc"><b>I accept all terms and conditions*</b></label>
                                <br></br>Accept T&C bellow details<br></br>   <Link to="/TC">Terms and Conditions</Link><br></br>
                            </td>
                        </tr>

                        <tr>
                            <input type='text' id='mailid' name='mailid' size='25'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                //value={bookingId}
                                disabled hidden
                            />
                            <input type='text' id='destid' name='destid' size='25'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.destid = destinationId} disabled hidden />

                            <input type='text' id='destname' name='destname' size='25'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.destname = destination} disabled hidden
                            />
                        </tr>
                        <tr>
                            <input type='text' id='noofadults' name='noofadults' size='25'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.noofadults = adults}
                                disabled hidden
                            />
                            <input type='text' id='noofchildrens' name='noofchildrens' size='25'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.noofchildrens = children} disabled hidden />

                            <input type='text' id='totalpersons' name='totalpersons' size='25'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.totalpersons = persons} disabled hidden />
                        </tr>
                        <tr>
                            <input type='text' id='bkdate' name='bkdate' size='25'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.date = date} disabled hidden />

                            <input type='text' id='bktotalcost' name='bktotalcost' size='25'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.bktotalcost = cost} disabled hidden />

                        </tr>
                    </table>
                    <hr />

                    <div className="row ">
                        <div className="col-sm-6 ">
                            <form className="row g-3 mt-3 ">

                                <div className="col-sm-12 ">
                                    <label for="PackageNameTitle " className="form-label ">Net Payable Amount: </label> {cost}

                                </div>
                                <div className="col-sm-12 ">
                                    <label for="SDTitle " className="form-label ">No. of Persons: </label>{persons}

                                </div>
                                {/*   <div className="col-sm-12 ">
                            <label for="BLTitle " className="form-label ">Total Base Fare: </label>
                            <label for="BL " className="form-label float-right "> 72000.00</label>
                        </div>
                        <div className="col-sm-12 ">
                            <label for="DDTitle " className="form-label ">GST (18%): </label>
                            <label for="DD " className="form-label float-right "> 84960.00</label>
                        </div>
                        <div class="col-sm-12 ">
                            <label for="EDTitle " className="form-label ">After Discount (10%): </label>
                            <label for="ED " className="form-label float-right "> 76464.00</label>
                        </div>
                        <div className="col-sm-12 ">
                            <label for="EDestinationTitle " className="form-label ">Net Payable Amount: </label>
                            <label for="EDestination " className="form-label float-right font-weight-bold"> 76464.00</label>
                        </div> */}

                            </form>
                        </div>

                        <div className="col-sm-6 ">

                            <h6>Additional emailrmation</h6>
                            <ul>
                                <li>Before going to the next page, go through the
                                    <Link to="/TC">Terms and Conditions</Link> page.</li>
                                <li>Check the net payable amount before payment.</li>
                                <li>Also read the <Link to="/TC">refund/cancellation policy</Link>.</li>
                            </ul>
                        </div>
                    </div>

                    <button type='submit' className="btn btn-outline-success"><b>Book Tour</b></button>

                </form>
            </div>
        </div>

    </>
    );
}

export default Booking;

