import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Initiatives from './pages/Initiatives';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import JoinUs from './pages/JoinUs';
import UpcomingEvents from './pages/UpcomingEvents';
import Navbar from './components/Navbar';
import Profile from './pages/profile';
import Login from './pages/login';
import Register from './pages/register'; 
import VerifyEmail from './pages/VerifyEmail'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/initiatives" element={<Initiatives />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/upcomingEvents" element={<UpcomingEvents />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
      </Routes>
    </Router>
  );
};

export default App;