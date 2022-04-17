import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Download from './Download';
const Profile = () => {
    const [showBookings, setShowBookings] = useState(false);
    const handleShowBookings = () => setShowBookings(true);
    return (
        <div className='profile'>
            <h1 className='mt-5'>Profile</h1>
            <div className='row'>
                <div className='col-1'></div>
                <div className='col-11 row'>
                    <div className='col-3'>User Name :</div><div className='col-9 h5'>{localStorage.getItem('user-info')}</div>
                    <div className='col-3'>Email :</div><div className='col-9 h5'>{localStorage.getItem('user-email')}</div>
                </div>
            </div>
            <div className='row' style={{ margin: "30px" }}>
                <div className='col-5'></div>
                <div className='col-7'><Button onClick={handleShowBookings} className='btn btn-dark' style={{ width: "fit-content" }}>Get Bookings</Button></div>
            </div>
            {(showBookings === true) ? (
                <Download />
            ) : null}
        </div>
    )
}

export default Profile;