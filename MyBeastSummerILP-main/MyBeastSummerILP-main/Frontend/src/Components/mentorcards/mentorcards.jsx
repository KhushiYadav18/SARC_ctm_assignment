import React, { useState } from 'react';
import '../styles/mentorcards.css'; // Import your CSS for styling
import AlumCard from '../AlumCard/AlumCard';
import ProfilePage from '../Authentication/profile';
import WishList from '../AlumCard/WishList';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/sarcB.png';

const App = () => {
    const [activeTab, setActiveTab] = useState('mentor');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    // module.exports = handleTabClick;

    const handleLogoutClick = () => {
        // Implement logic to log out user
    };

    return (
        <div className="app">
            <nav className="card-navbar">
                <div className="sarclogomentor">
                    <img src={logo} alt="Logo" />
                </div>
                <ul>
                    <li
                        className={activeTab === 'profile' ? 'active' : ''}
                        onClick={() => handleTabClick('profile')}
                    >
                        Profile
                    </li>
                    <li
                        className={activeTab === 'wishlist' ? 'active' : ''}
                        onClick={() => handleTabClick('wishlist')}
                    >
                        Wishlist
                    </li>
                    <li
                        className={activeTab === 'mentor' ? 'active' : ''}
                        onClick={() => handleTabClick('mentor')}
                    >
                        Projects
                    </li>
                </ul>
                <div className="navbar-icons">
                    <Link to="/">
                        <FaHome color='black' className="icon" />
                    </Link>
                    <Link to="/logout">
                        <FaSignOutAlt color='black' onClick={handleLogoutClick} className="icon" />
                    </Link>
                </div>
            </nav>
            <div className="content">
                {/* Render different content based on activeTab */}
                {activeTab === 'profile' && <ProfilePage/>}
                {activeTab === 'wishlist' && <WishList handleTabClick = {handleTabClick} />}
                {activeTab === 'mentor' && <AlumCard />}
            </div>
        </div>
    );
};



export default App;
