import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router'
import { Modal, Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Destinations from './Destinations';
import swal from 'sweetalert2';
import serverurl from './serverurl';
import logo from '../assets/logo.png'
export default function NavbarComp() {
    var navigate = useNavigate();
    let user = localStorage.getItem('user-info');
    const [lgnShow, setLoginShow] = useState(false);
    const handleClose = () => setLoginShow(false);
    let [emailid, setemailid] = useState();
    let [password, setpassword] = useState();

    let emailidinput = (e) => setemailid(e.target.value);
    let passwordinput = (e) => setpassword(e.target.value);

    var [count, setCount] = useState("")
    var [count1, setCount1] = useState("")
    const [srcShow, setSearchShow] = useState(false);
    const handleSearchClose = (e) => {
        setCount("");
        setCount1("")
        setSearchShow(false);
    }

    let [emailidforgot, setemailidforgot] = useState();
    let emailidforgotinput = (e) => setemailidforgot(e.target.value);

    const ForgotPassword_Validate = async () => {
        console.log(emailidforgot)
        const responce = await fetch(serverurl + `forgot_password/${emailidforgot}`)

        const data23 = await responce.json();

        if (data23 == true) {
            swal.fire("Email sent!", "Check your email and reset the password!", "success");
            setemailidforgot("");
            handleCloseforgot();
        }
        else {
            swal.fire("Error", "Please enter valid username", "error");
            setemailidforgot("");
        }

    }
    const logout = () => {
        localStorage.clear();
        handleClick();
        navigate("/")
    };

    const { name } = useParams();
    useEffect(() => {
        handleClick();
    }, [name]);

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const [showforgot, setShowforgot] = useState(false);

    const handleCloseforgot = () => setShowforgot(false);
    const handleShowforgot = () => { setLoginShow(false); setShowforgot(true); }

    const [username, setUsername] = useState('');
    const getUsername = async () => {
        const res = await fetch(serverurl + `Username/${emailid}`);
        const user = await res.json();
        setUsername(JSON.stringify(user))
    }

    

    const Validate = async () => {

        console.log(emailid)
        console.log(password)
        const responce = await fetch(serverurl + `UserDetails/login/${emailid}/${password}`)
        const data = await responce.json();

        if (data == true) {
            getUsername();
            let item = JSON.parse(username)
            console.log("item" + item)
            swal.fire("Login Successful", "You are now ready to book your Destination!", "success");
            localStorage.setItem("user-info", (item))
            localStorage.setItem("user-email", (emailid))
            handleClose()
            navigate("/")
            setemailid("");
            setpassword("");
        }
        else {
            swal.fire("Error", "Please enter valid username and password", "error");
        }

    }
    const signup = () => {
        handleClose()
        navigate("/RegisterUser")
    }
    return (
<>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand as={Link} to="/"><img src={logo} alt='Home' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">HOME</Nav.Link>
                        <NavDropdown title="COUNTRIES" id="collasible-nav-dropdown">
                            <Destinations />
                        </NavDropdown>
                        <Nav.Link as={Link} to="/AboutUs">ABOUT US</Nav.Link>
                        <Nav.Link as={Link} to="/Contactus">CONTACT US</Nav.Link>
                        {localStorage.getItem('user-info') ? null : (
                            <>
                                <Nav.Link onClick={() => setLoginShow(true)}>LOGIN/REGISTER</Nav.Link>
                                <div className="LoginModal">
                                    <Modal show={lgnShow} onHide={handleClose} >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Login</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <label for="email" className="form-label">Email </label>
                                            <input type="email" className="form-control" placeholder="you@example.com" onChange={emailidinput} value={emailid} />
                                            <label for="password" className="form-label">Password </label>
                                            <input type="password" className="form-control" placeholder="password" onChange={passwordinput} value={password} />
                                            <p id='forgotpass' onClick={handleShowforgot}  ><b>Forgot password?</b></p>
                                            <div className='modal-footer'>
                                                <button className="btn btn-primary" style={{ alignItems: "center" }} onClick={Validate} data-bs-dismiss="modal" aria-label="Close">Login</button>
                                                Don't have an account yet?
                                                <Button variant='primary' Link as={Link} to="/RegisterUser" onClick={handleClose}>Signup</Button>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                    <Modal show={showforgot} onHide={handleCloseforgot}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Login</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <label for="email" className="form-label">Email </label>
                                            <input type="email" className="form-control" placeholder="you@example.com" onChange={emailidforgotinput} value={emailidforgot} />
                                            <Modal.Footer>
                                                <button className="btn btn-primary" style={{ alignItems: "center" }} onClick={ForgotPassword_Validate} data-bs-dismiss="modal" aria-label="Close">Send mail</button>
                                            </Modal.Footer>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </>)}
                        {(user != undefined) ? (
                            <NavDropdown title={user} id="collasible-nav-dropdown">
                                <NavDropdown.Item activeClassName="active" className="naw-link" as={Link} to='/profile'>Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item activeClassName="active" className="naw-link" as={Link} to='/changepasswordform'>Change Password
                                </NavDropdown.Item>
                                <NavDropdown.Item activeClassName="active" className="naw-link" onClick={logout}>Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : null}
                        <Nav.Link className="nav-link-red" onClick={() => setSearchShow(true)}>Search</Nav.Link>
                            <div className="SearchModal">
                                <Link to="/">
                                    <Modal size="lg" show={srcShow} onHide={handleSearchClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Search Destinations</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            Custom Date
                                            <div >
                                                <table cellPadding="5"><tr>
                                                    <td>    From: <input type="date" name="sDate" className='form-control' autocomplete="off" onChange={(e) => { setCount(count = e.target.value); }} /></td>
                                                    <td> To: <input type="date" name="eDate" className='form-control' autocomplete="off" onChange={(e) => { setCount1(count1 = e.target.value); }} /></td>
                                                    <td>   <Link to={`/searchbyDate/${count}/${count1}`} >
                                                        <button className="btn btn-primary" name="date" variant="primary" onClick={handleClose}>Search</button>
                                                    </Link></td>
                                                </tr> </table></div> <br />
                                            Price Range
                                            <div>    <table cellPadding="5" vertical-align=" center"><tr>

                                                <td>    From: <input type="number" name="cost1" className='form-control' autocomplete="off" onChange={(e) => { setCount(count = e.target.value); }} /></td>
                                                <td>      To: <input type="number" name="cost2" className='form-control' autocomplete="off" onChange={(e) => { setCount1(count1 = e.target.value); }} /></td>
                                                <td>     <Link to={`/searchbycost/${count}/${count1}`} >
                                                    <button className="btn btn-primary " name="cost" variant="primary" onClick={handleClose}
                                                    >Search</button></Link></td> </tr> </table>
                                            </div> <br />
                                            Duration of Days
                                            <div >    <table cellPadding="5"><tr>
                                                <td>    Min: <input type="number" name="cost1" className='form-control' autocomplete="off" onChange={(e) => { setCount(count = e.target.value); }} /></td>
                                                <td>    To Max: <input type="number" name="cost2" className='form-control' autocomplete="off" onChange={(e) => { setCount1(count1 = e.target.value); }} /></td>
                                                <td>    <Link to={`/searchbyDuration/${count}/${count1}`}>
                                                    <button className="btn btn-primary" name="duration" variant="primary" onClick={handleClose}
                                                    >Search</button></Link> </td> </tr> </table>
                                            </div>
                                        </Modal.Body>
                                    </Modal></Link>
                            </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar></>
    )
                        
}
