import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavbarComp from './Components/NavbarComp';
import FetchCards from './Components/FetchCards';
import AboutUs from './Components/AboutUs';
import RegisterUser from './Components/RegisterUser';
import Footer from './Components/Footer'
import Sidebar from './Components/Sidebar';
import Itinerary from './Components/Itinerary'
import ContactUs from './Components/ContactUs';
import Booking from './Components/Booking'
import Payment from './Components/Payment'
import Invoice from './Components/Invoice'
import Feedback from './Components/Feedback'
import Profile from './Components/Profile'
import SearchFetch from './Components/SearchFetch'
import { Row, Container, Col } from 'react-bootstrap';
import { ChangePassForm } from './Components/ChangePassForm';
function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComp />
        <Container fluid="98%">
          <Row>
            <Col xs={4} sm={4} md={2} lg={2} ><Sidebar /></Col>
            <Col>
              <Routes>
                <Route exact path="/" element={<FetchCards name="*" />} />
                <Route exact path="/destination/:subcatID" element={<FetchCards />} />
                <Route exact path="/itinerary/:destinationName/:destid" element={<Itinerary />} />
                <Route exact path='AboutUs' element={<AboutUs />} />
                <Route exact path='Contactus' element={<ContactUs />} />
                <Route exact path='profile' element={<Profile/>}/>
                <Route exact path='/RegisterUser' element={<RegisterUser />} />
                <Route exact path='feedback' element={<Feedback/>}/>
                <Route exact path='changepasswordform' element={<ChangePassForm/>}/>
                <Route exach path="/searchbycost/:count/:count1" element={<SearchFetch name="cost" />}/>
                <Route exact path="/searchbyDuration/:count/:count1" element={<SearchFetch name="duration" />}/>
                <Route exact path="/searchbyDate/:count/:count1" element={<SearchFetch name="date" />}/>
                <Route exact path='/booking/:destid/:destinationName' element={<Booking />} />
                <Route exact path="/payment/:destid/:destinationName/:cost/:customers/:persons/:adults/:children/:destStartDate/:duration/:destEndDate" element={<Payment/>}/>
                <Route exact path="/invoice/:destid/:destinationName/:cost/:customers/:persons/:adults/:children/:destStartDate/:duration/:destEndDate/:bkid" element={<Invoice/>}/>
              </Routes>
            </Col>
          </Row>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
