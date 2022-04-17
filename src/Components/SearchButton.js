import React,{useState} from 'react'
import {Modal} from 'react-bootstrap'
import{Link} from 'react-router-dom'
import searchicon from '../assets/searchicon.png'
const SearchButton = () => {
    var [count, setCount] = useState("")
    var [count1, setCount1] = useState("")
    const [srcShow, setSearchShow] = useState(false);
    const handleClose = (e) => {
        setCount("");
        setCount1("")
        setSearchShow(false);
    }
    return (
<div className='row searchicon'>
        <div className='col-11'>
            <div className='col-1' >
                <img src={searchicon} onClick={() => setSearchShow(true)} alt="search" />
                <div className="SearchModal">
                                <Link to="/">
                                    <Modal size="lg" show={srcShow} onHide={handleClose}>
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
            </div>
        </div></div>
    )
}
export default SearchButton;