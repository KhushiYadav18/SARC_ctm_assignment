import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './styles/NavBar.css';
import { Link } from 'react-router-dom';
import logo from '../assets/images/sarcB.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        console.log("clicked");
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar apnaNavbar navbar-expand-lg bg-body-tertiary bg-body-primary" style={{ backgroundColor: '#E4E4E4' }}>
            <div className="container-fluid">
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li style={{display:"flex", justifyContent:"center", marginTop:"0.5%"}} className="nav-item thisOne">
                            <img className='logo' width={"50%"} src={logo} alt="Logo"  />
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blogs">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${localStorage.getItem('accessToken') ? 'bg-choose-projects' : 'bg-login-register'}`} to="/projectCards">
                                {localStorage.getItem('accessToken') ? 'Choose your Projects' : 'Projects'}
                            </Link>
                        </li>
                        {!localStorage.getItem('accessToken') ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
