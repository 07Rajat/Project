import React,{useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import swal from 'sweetalert2'
import axios from 'axios'
import serverurl from './serverurl'
export const ChangePassForm = () => {

    let [oldpassword,setOldpassword]=useState('');
    let [newpassword,setNewpassword]=useState('');
    let [newpassword1,setNewpassword1]=useState('');

    let oldinput=(e)=>setOldpassword(e.target.value);
    let newinput=(e)=>setNewpassword(e.target.value);
    let newinput1=(e)=>setNewpassword1(e.target.value);

    const passwordRgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

    let changepass=()=>{
        let email=localStorage.getItem("user-email")
        let body={email,oldpassword,newpassword}
        axios.post(serverurl+"UserDetails/changepassword",body).then(
            (Response)=>{
                if(Response.data)
                    swal.fire("Success","Password Successfully Changed","success");
                else
                    swal.fire("Error","Authentication Error","error");
                setOldpassword('')
                setNewpassword('')
                setNewpassword1('')
            },
            (error)=>{
                swal.fire("Error", "Server Error","error");
            }
        )
    }

    const handlesubmit=()=>{
        console.log(oldpassword+" "+newpassword+"  "+newpassword1)
        if (oldpassword === "" || newpassword === "" || newpassword1 === "")
            swal.fire("Error", "Please fill up details", "error");
        else if(!passwordRgx.test(oldpassword)){
            swal.fire("Invalid Password", "Password should contain minimum 8 characcters, it must include 1 special character, 1 digit and One capital letter", "error");
            setOldpassword('');
        }else if(!passwordRgx.test(newpassword)){
            swal.fire("Invalid Password", "Password should contain minimum 8 characcters, it must include 1 special character, 1 digit and One capital letter", "error");
            setNewpassword('');
        }else if(!passwordRgx.test(newpassword1)){
            swal.fire("Invalid Password", "Password should contain minimum 8 characcters, it must include 1 special character, 1 digit and One capital letter", "error");
            setNewpassword1('');
        }else if(newpassword!==newpassword1){
            swal.fire("Invalid Password", "Confirm password didn't match", "error");
            setNewpassword1('');
        }else
            changepass();
    }


    return (

        <div class="container-fluid">
            
            <div class="row">
                <div class="col-1 "></div>
                <div class="col-md-9 col-lg-9 p-5 ">
                    <h4 class="mb-3">Change Password</h4>
                    <Form>
                        <Form.Label>Old Password*</Form.Label>
                        <Form.Control type="password" placeholder="Enter Old Password" autoComplete="current-password" onChange={oldinput} value={oldpassword}  required />
                        <Form.Label className="mt-3">New Password*</Form.Label>
                        <Form.Control type="password" placeholder="Enter New Password" autoComplete="new-password" onChange={newinput} value={newpassword} required />
                        <Form.Label className="mt-3">Confirm Password*</Form.Label>
                        <Form.Control type="password" placeholder="Enter New Password" autoComplete="new-password" onChange={newinput1} value={newpassword1} required /><br></br>
                        <Button variant="primary" onClick={handlesubmit}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
