import React from 'react';

const Contact = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Our Team</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm">President</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold">Jane Smith</p>
            <p className="text-sm">Vice President</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </div>
    </div>
  );
};

export default Contact;