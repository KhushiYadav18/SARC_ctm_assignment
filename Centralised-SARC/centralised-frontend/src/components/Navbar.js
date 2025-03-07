import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          SARC
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/aboutUs" className="text-gray-300 hover:text-white transition-colors">
            About Us
          </Link>
          <Link to="/initiatives" className="text-gray-300 hover:text-white transition-colors">
            Initiatives
          </Link>
          <Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">
            Gallery
          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
          <Link to="/blogs" className="text-gray-300 hover:text-white transition-colors">
            Blogs
          </Link>
          <Link to="/join-us" className="text-gray-300 hover:text-white transition-colors">
            Join Us
          </Link>
          <Link to="/upcomingEvents" className="text-gray-300 hover:text-white transition-colors">
            Upcoming Events
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;