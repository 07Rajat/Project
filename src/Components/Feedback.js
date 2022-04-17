// import React,{useState} from 'react'
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from 'bootstrap';
// import serverurl from './serverurl';
// imprt swal
// const Feedback = () => {
//     const[feedback,setFeedback]=useState('');
//     let handleFeeback=(e)=>setFeedback(e.target.value)

//     const handlesubmit=()=>{
//        const responce=await fetch(serverurl+'feedback/'+{feedback});
//         const data=responce.json();
//         if(data){

//         }
//     }
// console.log(feedback)
//     return (
//         <div>
//                 <h3 className='mt-4'>Feedback</h3>
//                 <textarea cols={100} rows={10} onChange={handleFeeback} /><br></br>
//                 <input type='button' className='btn btn-primary' value='Submit' onClick={handlesubmit}/>
//         </div>
//     )
// }
// export default Feedback;
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import swal from 'sweetalert2';
import serverurl from './serverurl';

class Feedback extends React.Component{

    constructor(props) {
        super(props);
        
        this.state = {
          Message: ''
        };
      }

    onCreateFeedback=()=>{
        let feedback={
              "name":this.refs.name.value,
              "phone":this.refs.phone.value,
              "email":this.refs.email.value,
              "feedback":this.refs.feedback.value
            };
           let demo= JSON.stringify(feedback);
            console.log(JSON.parse(demo));
            fetch(serverurl+"user/addfeedback",{
          method: 'POST',
          headers:{'Content-type':'application/json'},
            body: demo
        }).then(r=>{r.json()}).then(res=>{
            swal.fire("Successful","New Feedback is Submitted Successfully", "success");
            
            this.refs.name.value=""
            this.refs.phone.value=""
            this.refs.email.value=""
            this.refs.feedback.value=""
        });
        }

    render(){
    return (
        <div>
           

            <div class="container-fluid">
            <div class="row">
            <div class="col-1 "></div>
           
            <div class="col-md-7 col-lg-6 p-5 ">
            <h4 class="mb-3">Feedback Form</h4>
            
            <Form>
                <Form.Label>Full name*</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={localStorage.getItem('user-info')} ref="name" required/>

                <Form.Label className="mt-3">Contact number*</Form.Label>
                <Form.Control type="number" placeholder="Enter mobile number" ref="phone" required/>
                
                <Form.Group className="mt-3" controlId="formBasicEmail">
                <Form.Label >Email address*</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={localStorage.getItem('user-email')} ref="email" required/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Describe Your Feedback*</Form.Label>
                <Form.Control as="textarea" rows={3} ref="feedback" required/>
                </Form.Group>

                <Button variant="primary"  onClick={this.onCreateFeedback}>
                Submit
                </Button>
            </Form>

            </div>
                
                
        </div>
        </div>


    
        </div>
    )}
}

export default Feedback
