import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import serverurl from './serverurl';

import swal from 'sweetalert2';

const RegisterUser = () => {

    let navigate = useNavigate();
    let [emailid, setemailid] = useState();
    let [mobileno, setmobileno] = useState();
    let [password, setpassword] = useState();
    let [cpassword, setcpassword] = useState();
    let [firstname, setfirstname] = useState();
    let [lastname, setlastname] = useState();


    let emailidinput = (e) => setemailid(e.target.value);
    let mobilenoinput = (e) => setmobileno(e.target.value);
    let passwordinput = (e) => setpassword(e.target.value);
    let cpasswordinput = (e) => setcpassword(e.target.value);
    let firstnameinput = (e) => setfirstname(e.target.value);
    let Lastnameinput = (e) => setlastname(e.target.value);

    const firstRgx = /^[a-zA-Z\s]+$/;
    const lastRgx = /^[a-zA-Z\s]+$/;
    const emailRgx = /^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const mobilenoRgx = /^[789][0-9]{9}$/;
    const passwordRgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
   
    let regi = () => {

        let user = {
         
            userFName: firstname,
            userLName: lastname,
            userEmail: emailid,
            userPassword: password,
            userMobile: mobileno,
        };
    
        axios.post(serverurl+"user/add", user).then(
            (response) => {
                swal.fire("User Registered", "You are now ready to get your destination!");
                navigate(`/`)
         

                setemailid("");
                setmobileno("");
                setpassword("");
                setcpassword("");
                setfirstname("")
                setlastname("");

            },
            (error) => {
                swal.fire("Error", "User already exists with that email","error");
                console.log(error);
              
            }

        )
    }
    let validate = () => {

        if (emailid === "" || mobileno === "" || firstname === "" || lastname === "" || password === "" || cpassword === "") {
            swal.fire("Error", "Please fill up details", "error");

        } else if (!emailRgx.test(emailid)) {
            swal.fire("Invalid Email Id", "Please Enter valid email", "error");
            setemailid("");
        } else if (!mobilenoRgx.test(mobileno)) {
            swal.fire("Invalid MObileNO", "Please Enter valid mobileno", "error");
            setmobileno("");
        } else if (!firstRgx.test(firstname)) {
            swal.fire("Error", "Please fill up details", "error");
            setfirstname("");
        }
        else if (!lastRgx.test(lastname)) {
            swal.fire("Error", "Please fill up details", "error");
            setlastname("");
        }
        else if (!passwordRgx.test(password)) {
            swal.fire("Invalid Password ", "Password should contain minimum 8 characcters, it must include 1 special character, 1 digit and One capital letter", "error");
            setpassword("");
            setcpassword("");
        } else if (!password.match(cpassword)) {
            swal.fire("Password doesn't Match", "", "error");
            setcpassword("");
        } else {

            regi();


        }
    };




    return (
        <div>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-1 "></div>

                    <div class="col-md-6 col-lg-8 p-5">
                        <h4 class="mb-3">Create User Account</h4>

                        <Form>
                            <Form.Label>FirstName*</Form.Label>
                            <Form.Control type="text" name="firstName" id="firstName" onChange={firstnameinput} value={firstname} />

                            <Form.Label>LastName*</Form.Label>
                            <Form.Control type="text" name="LastName" id="LastName" onChange={Lastnameinput} value={lastname} />

                            <Form.Label className="mt-3">Contact number*</Form.Label>
                            <Form.Control type="tel" name="MobileNo" id="MobileNo" onChange={mobilenoinput} value={mobileno} />


                            <Form.Label>Enter EmailId*</Form.Label>
                            <Form.Control type="email" name="EmailId" id="EmailId" onChange={emailidinput} value={emailid} />


                            <Form.Label>Enter  Password*</Form.Label>
                            <Form.Control type="password" name="Password" id="Password" onChange={passwordinput} value={password} />


                            <Form.Label>Confirm Password*</Form.Label>
                            <Form.Control type="password" name="CPassword" id="CPassword" onChange={cpasswordinput} value={cpassword} />
                            <br></br>
                            
                            <Button type="button" onClick={validate} value="Register" >SignUp</Button>
                        </Form>

                    </div>

                    <div class="col-3"></div>
                </div>
            </div>



        </div>
    );
}

export default RegisterUser;