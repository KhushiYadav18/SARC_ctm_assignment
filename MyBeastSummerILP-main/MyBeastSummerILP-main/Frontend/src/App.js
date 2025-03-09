import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/home/home';
import Login from './Components/Authentication/login';
import MentorCards from './Components/mentorcards/mentorcards';
import Register from './Components/Authentication/register';
import EventCard from './Components/home/eventCard';
import VerifyUser from './verifyUser';
import UserRestrictedRoute from './UserRestrictedRoute';
import Logout from './logout';
import Navbar from './Components/navBar';
import Blogs from './Components/Blog/Blogs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <><Navbar/> <Home/></>} />
        <Route path="/login" element={<><Navbar/> <Login /></>} />
        <Route path="/register" element={<><Navbar/><Register /></>} />
        <Route path="/verify-user/:key" element={<VerifyUser />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/blogs" element={<><Navbar/><Blogs /></>} />
        
        <Route element={<UserRestrictedRoute />}>
          <Route path="/projectCards" element={<MentorCards />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
