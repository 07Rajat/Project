import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router';
import Payment1 from './Payment1';
import serverurl from './serverurl';

export default function Payment(props) {
    const { destid, destinationName, cost, customers, persons, adults, children, destStartDate, duration, destEndDate } = useParams();
    const [bk, setBk] = useState();
    const [bk1, setBk1] = useState([]);
    console.log(customers)

    const getBk = async () => {
        const responce = await fetch(serverurl+'bookings');
        setBk(await responce.json());
    }

    useEffect(() => {
        getBk();

    }, []);


    /*    $(function() {
           $('[data-toggle="tooltip"]').tooltip()
       })
    */
    //For proceed button
    function relocate_home() {
        window.open('/invoice', '_blank');
        window.close();
    }

    //For register button
    function forward_register() {
        window.open('UserRegistration.html', '_blank');
    }
    return (
        <>
            <Payment1 name={bk} destid={destid} destinationName={destinationName} cost={cost}
                customers={customers} persons={persons} adults={adults} children={children}
                destStartDate={destStartDate} destEndDate={destEndDate} duration={duration} />
        </>
    )
}

{/* 
            <script src="js/bootstrap.bundle.min.js "></script>


            <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js " integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n " crossorigin="anonymous "></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js " integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo " crossorigin="anonymous "></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js " integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6 " crossorigin="anonymous "></script> */}